import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.models.js";
import { Review } from "../models/review.models.js";
import mongoose from "mongoose";

const addReview = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { review, rating } = req.body;
  if (!review?.trim() || !rating) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out all required fields to add review"
    );
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product does not exists");
  }

  const addReview = await Review.create({
    review,
    rating,
    productId: product?._id,
    owner: req.user?._id,
  });
  if (!addReview) {
    throw new ApiError(
      500,
      "Failed to add review due to an unexpected server error. Please try again later"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, { review: addReview }, "Review add successfully")
    );
});

const getProductReviews = asyncHandler(async (req, res) => {});

const updateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { review, rating } = req.body;
  console.log(reviewId, review, rating);
  const updateReview = await Review.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(reviewId),
      owner: req.user?._id,
    },
    {
      $set: {
        review,
        rating,
      },
    },
    { new: true }
  );
  if (!updateReview) {
    throw new ApiError(
      404,
      "Review does not exist or you are not authorized for this action."
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateReview, "Review update successfully"));
});

const deleteReview = asyncHandler(async (req, res) => {});

export { addReview, getProductReviews, updateReview, deleteReview };
