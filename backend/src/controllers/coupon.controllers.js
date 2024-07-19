import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Coupon } from "../models/coupon.models.js";
import { getMongoosePaginationOptions } from "../utils/helpers.js";
import { CouponTypes } from "../constants.js";
import mongoose from "mongoose";
import { getCart } from "./cart.controllers.js";
import { Cart } from "../models/cart.models.js";

const getAllCoupons = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const couponAggregate = Coupon.aggregate([{ $match: {} }]);
  if (couponAggregate.length < 1) {
    throw new ApiError(404, "Coupon does not exist");
  }

  const coupons = await Coupon.aggregatePaginate(
    couponAggregate,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: { totalDocs: "totalCoupons", docs: "coupons" },
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, coupons, "Coupon fetch successfully"));
});

const createCoupons = asyncHandler(async (req, res) => {
  const {
    name,
    couponCode,
    type,
    discountValue,
    minimumCartValue,
    startDate,
    expiryDate,
  } = req.body;
  if ([name, couponCode, type].some((field) => field?.trim() === "")) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out all required fields to create coupon"
    );
  }

  if (!discountValue) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out all required fields to create coupon"
    );
  }

  const couponExist = await Coupon.findOne({
    name: name.trim().toLowerCase(),
    couponCode: couponCode.trim().toUpperCase(),
  });
  if (couponExist) {
    throw new ApiError(
      409,
      "The coupon already exists. Please use a different name and coupon code to create coupon"
    );
  }

  if (minimumCartValue && +minimumCartValue < +discountValue) {
    throw new ApiError(
      400,
      "Minimum cart value must be greater than or equal to the discount value"
    );
  }

  const createCoupons = await Coupon.create({
    name,
    couponCode,
    type: CouponTypes.FLAT,
    discountValue,
    minimumCartValue,
    startDate,
    expiryDate,
    owner: req.user._id,
  });
  if (!createCoupons) {
    throw new ApiError(
      500,
      "Failed to create coupon due to an unexpected server error. Please try again later"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { coupon: createCoupons },
        "Coupon created successfully"
      )
    );
});

const getCouponById = asyncHandler(async (req, res) => {
  const { couponId } = req.params;

  const coupon = await Coupon.findById(couponId);
  if (!coupon) {
    throw new ApiError(404, "Coupon does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, coupon, "Coupon retrieve successfully"));
});

const deleteCoupon = asyncHandler(async (req, res) => {
  const { couponId } = req.params;

  const deleteCoupon = await Coupon.findByIdAndDelete(couponId);
  if (!deleteCoupon) {
    throw new ApiError(404, "Coupon does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { deleteCoupon }, "Coupon delete successfully"));
});

const updateCoupon = asyncHandler(async (req, res) => {
  const { couponId } = req.params;
  const {
    name,
    couponCode,
    type,
    discountValue,
    minimumCartValue,
    expiryDate,
  } = req.body;

  const couponToBeUpdate = await Coupon.findById(couponId);
  if (!couponToBeUpdate) {
    throw new ApiError(404, "Coupon does not exist");
  }

  const couponExist = await Coupon.aggregate([
    {
      $match: {
        name: name?.trim().toLowerCase(),
        couponCode: couponCode?.trim().toUpperCase(),
        _id: {
          $ne: new mongoose.Types.ObjectId(couponToBeUpdate._id),
        },
      },
    },
  ]);
  if (couponExist[0]) {
    throw new ApiError(
      409,
      "The coupon name and couponCode exists. Please use a different name and coupon code to create coupon"
    );
  }

  const _minimumCartValue =
    minimumCartValue || couponToBeUpdate.minimumCartValue;
  const _discountValue = discountValue || couponToBeUpdate.discountValue;
  if (_minimumCartValue && +_minimumCartValue < +_discountValue) {
    throw new ApiError(
      400,
      "Minimum cart value must be greater than or equal to the discount value"
    );
  }

  const updateCoupon = await Coupon.findByIdAndUpdate(
    couponId,
    {
      $set: {
        name,
        couponCode,
        type: CouponTypes.FLAT,
        discountValue: _discountValue,
        minimumCartValue: _minimumCartValue,
        expiryDate,
      },
    },
    { new: true }
  );
  if (!updateCoupon) {
    throw new ApiError(
      500,
      "Failed to update coupon due to an unexpected server error. Please try again later"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateCoupon, "Coupon updated successfully"));
});

const applyCoupon = asyncHandler(async (req, res) => {
  const { couponCode } = req.body;
  if (!couponCode) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out required field to apply coupon"
    );
  }

  let couponAggregate = await Coupon.aggregate([
    {
      $match: {
        couponCode: couponCode.trim().toUpperCase(),
        startDate: {
          $lt: new Date(),
        },
        expiryDate: {
          $gt: new Date(),
        },
        isActive: {
          $eq: true,
        },
      },
    },
  ]);

  const coupon = couponAggregate[0];

  if (!coupon) {
    throw new ApiError(404, "Invalid coupon code");
  }

  const userCart = await getCart(req.user._id);
  if (userCart.cartTotal < coupon.minimumCartValue) {
    throw new ApiError(
      400,
      "Add items worth INR " +
        (coupon.minimumCartValue - userCart.cartTotal) +
        "/- or more to apply this coupon"
    );
  }

  await Cart.findOneAndUpdate(
    {
      owner: req.user._id,
    },
    {
      $set: {
        coupon: coupon._id,
      },
    },
    { new: true }
  );

  const newCart = await getCart(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, newCart, "Coupon applied successfully"));
});

const getValidCouponForCustomer = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const userCart = await getCart(req.user._id);
  const cartTotal = userCart.cartTotal;

  const couponAggregate = await Coupon.aggregate([
    {
      $match: {
        startDate: {
          $lt: new Date(),
        },
        expiryDate: {
          $gt: new Date(),
        },
        isActive: {
          $eq: true,
        },
        minimumCartValue: {
          $gte: cartTotal,
        },
      },
    },
  ]);

  if (couponAggregate.length < 1) {
    throw new ApiError(404, "Coupon does not exist");
  }

  const coupon = await Coupon.aggregatePaginate(
    couponAggregate,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalCoupons",
        docs: "coupons",
      },
    })
  );

  return res
    .status(200)
    .json(200, coupon, "Customer coupons fetched successfully");
});

const updateCouponActiveStatus = asyncHandler(async (req, res) => {
  const { couponId } = req.params;
  const { isActive } = req.body;

  const updateCoupon = await Coupon.findByIdAndUpdate(
    couponId,
    {
      $set: {
        isActive,
      },
    },
    { new: true }
  );
  if (!updateCoupon) {
    throw new ApiError(404, "Coupon does not exist");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updateCoupon,
        `Coupon is ${updateCoupon?.isActive ? "active" : "inactive"}`
      )
    );
});

const removeCouponFromCart = asyncHandler(async (req, res) => {
  const removeCoupon = await Cart.findOneAndUpdate(
    {
      owner: req.user?._id,
    },
    {
      $set: {
        coupon: null,
      },
    },
    { new: true }
  );
  if (!removeCoupon) {
    throw new ApiError(404, "Coupon does not exist");
  }

  const newCart = await getCart(req.user?._id);

  return res
    .status(200)
    .json(new ApiResponse(200, newCart, "Coupon remove successfully"));
});

export {
  getAllCoupons,
  createCoupons,
  getCouponById,
  deleteCoupon,
  updateCoupon,
  applyCoupon,
  getValidCouponForCustomer,
  updateCouponActiveStatus,
  removeCouponFromCart,
};
