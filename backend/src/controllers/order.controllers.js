import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.models.js";
import { Order } from "../models/order.models.js";
import { Cart } from "../models/cart.models.js";
import { getCart } from "../controllers/cart.controllers.js";
import Razorpay from "razorpay";
import { orderConfirmatioMailgenContent } from "../utils/mail.js";
import { Address } from "../models/address.models.js";
import { nanoid } from "nanoid";
import { ApiResponse } from "../utils/ApiResponse.js";
import { OrderStatus, PaymentProvider } from "../constants.js";
import crypto from "crypto";
import mongoose from "mongoose";

let razorpayInstance;
try {
  razorpayInstance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });
} catch (error) {
  console.error("RAZORPAY ERROR:", error);
}

const orderFulfillmentHelper = async (orderPaymentId, req) => {
  const order = await Order.findOneAndUpdate(
    {
      paymentId: orderPaymentId,
    },
    {
      $set: {
        isPaymentDone: true,
      },
    },
    { new: true }
  );
  if (!order) {
    throw new ApiError(404, "Order does not exist");
  }

  const cart = await Cart.findOne({ owner: req.user?._id });
  if (!cart) {
    throw new ApiError(404, "User does not exist");
  }

  const userCart = await getCart(req.user?._id);

  let bulkStockUpdates = userCart.items.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product?._id },
        update: { $inc: { stock: -item.quantity } },
      },
    };
  });

  await Product.bulkWrite(bulkStockUpdates, { skipValidation: true });

  sendEmail({
    email: req.user?.email,
    subject: "Order confirmed",
    mailgenContent: orderConfirmatioMailgenContent(
      req.user?.username,
      userCart?.items,
      order.discountedOrderPrice ?? 0
    ),
  });

  cart.items = [];
  cart.coupon = null;

  await cart.save({ validateBeforeSave: false });
  return order;
};

const generateRazorpayOrder = asyncHandler(async (req, res) => {
  const { addressId } = req.body;

  if (!razorpayInstance) {
    console.log("RAZORPAY ERROR: `key_id` is mandatory");
    throw new ApiError(500, "Internet server error");
  }

  const address = await Address.findOne({
    _id: addressId,
    owner: req.user._id,
  });
  if (!address) {
    throw new ApiError(404, "Address does not exists");
  }

  const cart = await Cart.findOne({
    owner: req.user._id,
  });
  if (!cart || !cart.items?.length) {
    throw new ApiError(400, "User cart is empty");
  }

  const orderItems = cart.items;
  const userCart = await getCart(req.user?._id);

  const totalPrice = userCart.cartTotal;
  const totalDiscountedPrice = userCart.discountedTotal;

  const orderOptions = {
    amount: parseInt(totalDiscountedPrice) * 100,
    currency: "INR",
    receipt: nanoid(10),
  };

  razorpayInstance.orders.create(
    orderOptions,
    async function (err, razorpayOrder) {
      if (!razorpayOrder || (err && err.error)) {
        return res
          .status(err.statusCode)
          .json(
            new ApiResponse(
              err.statusCode,
              null,
              err.error.reason ||
                "Something went wrong while initialising the razorpay order."
            )
          );
      }
      const {
        addressLine1,
        addressLine2,
        name,
        phoneNumber,
        city,
        pincode,
        state,
        country,
      } = address;

      const unpaidOrder = await Order.create({
        address: {
          addressLine1,
          addressLine2,
          name,
          phoneNumber,
          city,
          pincode,
          state,
          country,
        },
        customer: req.user._id,
        items: orderItems,
        orderPrice: totalPrice ?? 0,
        discountedOrderPrice: totalDiscountedPrice ?? 0,
        paymentProvider: PaymentProvider.RAZORPAY,
        paymentId: razorpayOrder.id,
        coupon: userCart.coupon?._id,
      });

      if (unpaidOrder) {
        return res
          .status(200)
          .json(
            new ApiResponse(200, razorpayOrder, "Razorpay order generated")
          );
      } else {
        return res
          .status(500)
          .json(
            new ApiResponse(
              500,
              null,
              "Something went wrong while initialising the razorpay order."
            )
          );
      }
    }
  );
});

const verifyRazorpayPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  let body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    const order = await orderFulfillmentHelper(razorpay_payment_id, req);
    return res
      .status(201)
      .json(new ApiResponse(201, order, "Order placed successfully"));
  } else {
    throw new ApiError(400, "Invalid razorpay signature");
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(orderId) },
    },
    {
      $lookup: {
        from: "users",
        localField: "customer",
        foreignField: "_id",
        as: "customer",
        pipeline: [
          {
            $project: {
              _id: 1,
              username: 1,
              email: 1,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "coupons",
        localField: "coupon",
        foreignField: "_id",
        as: "coupon",
        pipeline: [
          {
            $project: {
              name: 1,
              couponCode: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        customer: { $first: "$customer" },
        coupon: { $ifNull: [{ $first: "$coupon" }, null] },
      },
    },
    { $unwind: "$items" },
    {
      $lookup: {
        from: "products",
        localField: "items.productId",
        foreignField: "_id",
        as: "items.product",
      },
    },
    {
      $addFields: {
        "items.product": { $first: "items.product" },
      },
    },
    {
      $group: {
        _id: "$_id",
        order: { $first: "$$ROOT" },
        orderItems: {
          $push: {
            _id: "$items._id",
            quantity: "$items.quantity",
            product: "$items.product",
          },
        },
      },
    },
    {
      $addFields: {
        "order.items": "$orderItems",
      },
    },
    {
      $project: {
        orderItems: 0,
      },
    },
  ]);
  if (!order[0]) {
    throw new ApiError(404, "Order does not exists");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order[0], "Order fetched successfully"));
});

const getOrderListAdmin = asyncHandler(async (req, res) => {});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  let order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError(404, "Order does not exists");
  }

  if (order.status === OrderStatus.DELIVERED) {
    throw new ApiError(400, "Order is already delivered");
  }

  order = await Order.findByIdAndUpdate(
    orderId,
    {
      $set: {
        status,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, { status }, "Order status changed successfully")
    );
});

export {
  generateRazorpayOrder,
  getOrderById,
  getOrderListAdmin,
  updateOrderStatus,
  verifyRazorpayPayment,
};
