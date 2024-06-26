import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { Wishlist } from "../models/wishlist.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getWishlist = async (userId) => {
  const wishlistAggregation = await Wishlist.aggregate([
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
        product: { $first: "$product" },
      },
    },
  ]);
  return wishlistAggregation[0] ?? { _id: null, items: [] };
};

const addItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  let wishlist = await Wishlist.findOne({ owner: req.user?._id });
  if (!wishlist) {
    wishlist = await Wishlist.create({ owner: req.user?._id });
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product does not exist");
  }

  const addedProduct = wishlist.items?.find(
    (item) => item.productId.toString() === productId
  );
  if (!addedProduct) {
    wishlist.items.push({
      productId,
    });
  }

  await wishlist.save({ validateBeforeSave: true });

  const newWishlist = await getWishlist(req.user?._id);

  return res
    .status(200)
    .json(new ApiResponse(200, newWishlist, "Item added successfully"));
});

const getUserWishlist = asyncHandler(async (req, res) => {
  const wishlist = await getWishlist(req.user?._id);

  return res
    .status(200)
    .json(new ApiResponse(200, wishlist, "Wishlist fetch successfully"));
});

const removeItemFromWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product does not exist");
  }

  const removeProduct = await Wishlist.findOneAndUpdate(
    { owner: req.user?._id },
    {
      $pull: {
        items: {
          productId: productId,
        },
      },
    },
    { new: true }
  );
  if (!removeProduct) {
    throw new ApiError(
      500,
      "Failed to remove product from wishlist due to an unexpected server error. Please try again later."
    );
  }

  const wishlist = await getWishlist(req.user?._id);

  return res
    .status(200)
    .json(new ApiResponse(200, wishlist, "Item remove successfully"));
});

const clearWishlist = asyncHandler(async (req, res) => {
  try {
    await Wishlist.findOneAndUpdate(
      {
        owner: req.user?._id,
      },
      {
        $set: {
          items: [],
        },
      },
      { new: true }
    );

    const wishlist = await getWishlist(req.user?._id);

    return res
      .status(200)
      .json(new ApiResponse(200, wishlist, "Items clear successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to clear wishlist due to an unexpected server error. Please try again later."
    );
  }
});

export {
  getWishlist,
  addItem,
  getUserWishlist,
  removeItemFromWishlist,
  clearWishlist,
};
