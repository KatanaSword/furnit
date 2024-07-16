import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.models.js";
import { Review } from "../models/review.models.js";

const createReview = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { review, rating } = req.body;
  if (!review?.trim() || !rating) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out all required fields to create review"
    );
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product does not exists");
  }

  const createReview = await Review.create({
    review,
    rating,
    productId: product?._id,
    owner: req.user?._id,
  });
  if (!createReview) {
    throw new ApiError(
      500,
      "Failed to create review due to an unexpected server error. Please try again later"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { review: createReview },
        "Review create successfully"
      )
    );
});

export { createReview };
