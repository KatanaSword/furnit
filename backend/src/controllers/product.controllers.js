import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.models.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { Category } from "../models/category.models.js";
import mongoose from "mongoose";
import { getMongoosePaginationOptions } from "../utils/helpers.js";

const getAllProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const productsAggregate = Product.aggregate([{ $match: {} }]);
  if (productsAggregate.length < 1) {
    throw new ApiError(404, "Products not found.");
  }

  const products = await Product.aggregatePaginate(
    productsAggregate,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalProducts",
        docs: "Products",
      },
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetch successfully."));
});

const createProducts = asyncHandler(async (req, res) => {
  const { name, description, category, price, stock } = req.body;
  if (
    [name, description, category, price, stock].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out all required fields to create product."
    );
  }

  const categoryToBeAdded = await Category.findOne({ name: category });
  if (!categoryToBeAdded) {
    throw new ApiError(404, "Category does not exist");
  }

  const productExist = await Product.findOne({
    $or: [{ name }],
  });
  if (productExist) {
    throw new ApiError(
      409,
      "The product already exists. Please use a different name to create product."
    );
  }

  const imageLocalPath = req.file?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Product image is missing");
  }

  const image = await uploadOnCloudinary(imageLocalPath, "furnit/products");
  if (!image) {
    throw new ApiError(
      500,
      "Failed to upload product image. Please ensure the file format is supported."
    );
  }

  const products = await Product.create({
    name,
    description,
    price,
    stock,
    image: {
      url: image.url,
      publicId: image.public_id,
    },
    owner: req.user._id,
    category: categoryToBeAdded._id,
  });
  if (!products) {
    throw new ApiError(
      500,
      "Create product failed due to an unexpected server error. Please try again later."
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, products, "Product created successfully"));
});

const getProductsByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const category = await Category.findById(categoryId);
  if (!category) {
    throw new ApiError(404, "category does not exist");
  }

  const productAggregate = Product.aggregate([
    { $match: { category: new mongoose.Types.ObjectId(categoryId) } },
  ]);

  const products = await Product.aggregatePaginate(
    productAggregate,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: { totalDocs: "totalProducts", docs: "products" },
    })
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { ...products, category },
        "Category products fetched successfully"
      )
    );
});

const getProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product retrieve successfully"));
});

const updateProducts = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { name, description, category, price, stock } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product does not exist");
  }

  const categoryToBeAdded = await Category.findOne({ name: category });

  const updateProducts = await Product.findByIdAndUpdate(
    product,
    {
      $set: {
        name,
        description,
        price,
        stock,
        category: categoryToBeAdded?._id,
      },
    },
    { new: true }
  );
  if (!updateProducts) {
    throw new ApiError(
      500,
      "Failed to update product due to an unexpected server error. Please try again later"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateProducts, "Product update successfully"));
});

const updateProductImage = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product does not exist");
  }

  const imageLocalPath = req.file?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Product image is missing");
  }

  const image = await uploadOnCloudinary(imageLocalPath, "furnit/products");
  if (!image) {
    throw new ApiError(
      500,
      "Failed to upload product image. Please ensure the file format is supported."
    );
  }

  const updateImage = await Product.findByIdAndUpdate(
    product,
    {
      $set: {
        image: {
          url: image.url,
          publicId: image.public_id,
        },
      },
    },
    { new: true }
  );
  if (!updateImage) {
    throw new ApiError(
      500,
      "Failed to update image due to an unexpected server error. Please try again later"
    );
  }

  const publicId = product.image.publicId;
  await deleteFromCloudinary(publicId);

  return res
    .status(200)
    .json(
      new ApiResponse(200, updateImage, "Product image update successfully")
    );
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product does not exist");
  }

  const deleteProduct = await Product.findByIdAndDelete({ _id: productId });
  if (!deleteProduct) {
    throw new ApiError(
      500,
      "Failed to delete product due to an unexpected server error. Please try again later"
    );
  }

  const publicId = product.image.publicId;
  await deleteFromCloudinary(publicId);

  return res
    .status(200)
    .json(new ApiResponse(200, deleteProduct, "Product delete Successfully"));
});

export {
  createProducts,
  getAllProducts,
  getProductsByCategory,
  getProductById,
  updateProducts,
  updateProductImage,
  deleteProduct,
};
