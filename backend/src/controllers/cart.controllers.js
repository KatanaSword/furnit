import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Cart } from "../models/cart.models.js";
import { Product } from "../models/product.models.js";

const getCart = async (userId) => {
  const cartAggregater = await Cart.aggregate([
    { $match: { owner: userId } },
    { $unwind: "$items" },
    {
      $lookup: {
        from: "products",
        localField: "items.productId",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $project: {
        product: {
          $first: "$product",
        },
        quantity: "$items.quantity",
        coupon: 1,
      },
    },
    {
      $group: {
        _id: "$_id",
        items: {
          $push: "$$ROOT",
        },
        coupon: { $first: "$coupon" },
        cartTotal: {
          $sum: {
            $multiply: ["$product.price", "$quantity"],
          },
        },
      },
    },
    {
      $lookup: {
        from: "coupons",
        localField: "coupon",
        foreignField: "_id",
        as: "coupon",
      },
    },
    {
      $addFields: {
        coupon: { $first: "$coupon" },
      },
    },
    {
      $addFields: {
        discountedTotal: {
          $ifNull: [
            {
              $subtract: ["$cartTotal", "$coupon.discountValue"],
            },
            "$cartTotal",
          ],
        },
      },
    },
  ]);

  return (
    cartAggregater[0] ?? {
      _id: null,
      items: [],
      cartTotal: 0,
      discountedTotal: 0,
    }
  );
};

const addItemAndUpdateItemQuality = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { quantity = 1 } = req.body;

  let cart = await Cart.findOne({ owner: req.user?._id });
  if (!cart) {
    cart = await Cart.create({ owner: req.user._id });
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product does not exist");
  }

  if (quantity > product.stock) {
    throw new ApiError(
      400,
      product.stock > 0
        ? "Only " +
          product.stock +
          " products are remaining. But you are adding " +
          quantity
        : "Product is out of stock"
    );
  }

  const addedProduct = cart.items?.find(
    (item) => item.productId.toString() === productId
  );
  if (addedProduct) {
    addedProduct.quantity = quantity;
    if (cart.coupon) {
      cart.coupon = null;
    }
  } else {
    cart.items.push({
      productId,
      quantity,
    });
  }

  await cart.save({ validateBeforeSave: true });

  const newCart = await getCart(req.user?._id);

  return res
    .status(200)
    .json(new ApiResponse(200, newCart, "Item added successfully"));
});

const getUserCart = asyncHandler(async (req, res) => {
  const cart = await getCart(req.user?._id);

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart fetch successfully"));
});

const removeItemFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product does not exist");
  }

  const updatedCart = await Cart.findOneAndUpdate(
    { owner: req.user?._id },
    { $pull: { items: { productId: productId } } },
    { new: true }
  );

  const cart = await getCart(req.user?._id);

  if (cart.coupon && cart.cartTotal < cart.coupon.minimumCartValue) {
    updatedCart.coupon = null;
    await updatedCart.save({ validateBeforeSave: false });
    cart = await getCart(req.user?._id);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Remove product successfully"));
});

const clearCart = asyncHandler(async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { owner: req.user?._id },
      {
        $set: {
          items: [],
        },
      },
      { new: true }
    );

    const cart = await getCart(req.user?._id);

    return res
      .status(200)
      .json(new ApiResponse(200, cart, "Items clear successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to clear wishlist due to an unexpected server error. Please try again later."
    );
  }
});

export {
  getCart,
  addItemAndUpdateItemQuality,
  getUserCart,
  removeItemFromCart,
  clearCart,
};
