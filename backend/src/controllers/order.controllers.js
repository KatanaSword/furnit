import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.models.js";
import { Order } from "../models/order.models.js";
import { Cart } from "../models/cart.models.js";
import { getCart } from "../controllers/cart.controllers.js";
import Razorpay from "razorpay";
import { orderConfirmatioMailgenContent } from "../utils/mail.js";

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

const generateRazorpayOrder = asyncHandler(async (req, res) => {});
const getOrderById = asyncHandler(async (req, res) => {});
const getOrderListAdmin = asyncHandler(async (req, res) => {});
const updateOrderStatus = asyncHandler(async (req, res) => {});
const verifyRazorpayPayment = asyncHandler(async (req, res) => {});

export {
  generateRazorpayOrder,
  getOrderById,
  getOrderListAdmin,
  updateOrderStatus,
  verifyRazorpayPayment,
};
