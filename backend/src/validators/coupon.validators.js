import { body } from "express-validator";
import { AvailableCouponType, options } from "../constants.js";

const couponCreateRequestBodyValidator = () => {
  return [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("couponCode")
      .trim()
      .notEmpty()
      .withMessage("Coupon code is required")
      .isLength({ min: 4 })
      .withMessage("Coupon code must be at lease 4 characters long"),
    body("type")
      .optional()
      .isIn(AvailableCouponType)
      .withMessage("Invalid coupon type"),
    body("discountValue")
      .trim()
      .notEmpty()
      .withMessage("Discount value is required")
      .isInt({ min: 1 })
      .withMessage("Discount value must be greater than 0"),
    body("minimumCartValue")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Invalid minimum cart value")
      .isInt({ min: 0 })
      .withMessage("Minimum cart value cannot be negative"),
    body("startDate")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Start date is required")
      .isISO8601()
      .withMessage("Invalid start date. Date must be in ISO8601 format"),
    body("expiryDate")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Expiry date is required")
      .isISO8601()
      .withMessage("Invalid expiry date. Date must be in ISO8601 format")
      .isAfter(new Date().toISOString())
      .withMessage("Expiry date must be a future date"),
  ];
};

const couponUpdateRequestBodyValidator = () => {
  return [
    body("name").options().trim().notEmpty().withMessage("Name is required"),
    body("couponCode")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Coupon code is required")
      .isLength({ min: 4 })
      .withMessage("Coupon code must be at lease 4 characters long"),
    body("type")
      .optional()
      .isIn(AvailableCouponType)
      .withMessage("Invalid coupon type"),
    body("discountValue")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Discount value is required")
      .isInt({ min: 1 })
      .withMessage("Discount value must be greater than 0"),
    body("minimumCartValue")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Invalid minimum cart value")
      .isInt({ min: 0 })
      .withMessage("Minimum cart value cannot be negative"),
    body("startDate")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Start date is required")
      .isISO8601()
      .withMessage("Invalid start date. Date must be in ISO8601 format"),
    body("expiryDate")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Expiry date is required")
      .isISO8601()
      .withMessage("Invalid expiry date. Date must be in ISO8601 format")
      .isAfter(new Date().toISOString())
      .withMessage("Expiry date must be a future date"),
  ];
};

const couponApplyValidator = () => {
  return [
    body("couponCode")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Coupon code is required"),
  ];
};

export {
  couponCreateRequestBodyValidator,
  couponUpdateRequestBodyValidator,
  couponApplyValidator,
};
