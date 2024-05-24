import { Category } from "../models/category.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getMongoosePaginationOptions } from "../utils/helpers.js";

const getAllCategories = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const categoryAggregate = Category.aggregate([{ $match: {} }]);
  if (categoryAggregate.length < 1) {
    throw new ApiError(404, "Category not found");
  }
  const categories = await Category.aggregatePaginate(
    categoryAggregate,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: { totalDocs: "totalCategories", docs: "categories" },
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Category fetch successfully"));
});

const createCategories = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out required field to create category."
    );
  }

  const categoryExist = await Category.findOne({ $or: [{ name }] });
  if (categoryExist) {
    throw new ApiError(
      409,
      "The category already exists. Please use a different name to create category."
    );
  }

  const createCategory = await Category.create({
    name,
    owner: req.user._id,
  });
  if (!createCategory) {
    throw new ApiError(
      500,
      "Failed to create category due to an unexpected server error. Please try again later."
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { category: createCategory },
        "Category create successfully."
      )
    );
});

const getCategoryById = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new ApiError(404, "Category does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category retrieve successfully"));
});

const updateCategories = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { categoryId } = req.params;
  if (!name) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out required fields to update category."
    );
  }

  const updateCategories = await Category.findByIdAndUpdate(
    categoryId,
    {
      $set: { name },
    },
    { new: true }
  );

  if (!updateCategories) {
    throw new ApiError(404, "Category does not exist");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updateCategories, "Category update successfully")
    );
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const deleteCategory = await Category.findByIdAndDelete(categoryId);
  if (!deleteCategory) {
    throw new ApiError(404, "Category does not exist");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { deleteCategory }, "Category delete successfully")
    );
});

export {
  createCategories,
  getAllCategories,
  getCategoryById,
  updateCategories,
  deleteCategory,
};
