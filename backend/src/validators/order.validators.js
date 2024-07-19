import { body } from "express-validator";
import { AvailableOrderStatus } from "../constants.js";

const verifyRazorpayPaymentValidators = () => {
  return [
    body("razorpay_order_id")
      .trim()
      .notEmpty()
      .withMessage("Razorpay order id is missing"),
    body("razorpay_payment_id")
      .trim()
      .notEmpty()
      .withMessage("Razorpay payment id is missing"),
    body("razorpay_signature")
      .trim()
      .notEmpty()
      .withMessage("Razorpay signature is missing"),
  ];
};

const updateOrderStatusValidators = () => {
  return [
    body("status")
      .trim()
      .notEmpty()
      .isIn(AvailableOrderStatus)
      .withMessage("Invalid order status"),
  ];
};

export { verifyRazorpayPaymentValidators, updateOrderStatusValidators };
