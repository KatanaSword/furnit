import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.models.js";
import { Review } from "../models/review.models.js";
import mongoose from "mongoose";
import { getMongoosePaginationOptions } from "../utils/helpers.js";

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

const getProductReviews = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { productId } = req.params;

  const reviewAggregation = Review.aggregate([
    {
      $match: {
        productId: new mongoose.Types.ObjectId(productId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "user",
        pipeline: [
          {
            $project: {
              name: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
  ]);

  const reviews = await Review.aggregatePaginate(
    reviewAggregation,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalReviews",
        docs: "reviews",
      },
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, reviews, "Product review fetched successfully"));
});

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

const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;

  const deleteReview = await Review.findOneAndDelete({
    _id: new mongoose.Types.ObjectId(reviewId),
    owner: req.user?._id,
  });
  if (!deleteReview) {
    throw new ApiError(
      404,
      "Review does not exist or you are not authorized for this action."
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deleteReview, "Review delete successfully"));
});

export { addReview, getProductReviews, updateReview, deleteReview };
