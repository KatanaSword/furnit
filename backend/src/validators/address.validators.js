import { body, param } from "express-validator";

const addressCreateRequestBodyValidator = () => {
  return [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("addressLine1").trim().notEmpty().withMessage("Address is required"),
    body("addressLine2").optional(),
    body("pincode")
      .trim()
      .notEmpty()
      .withMessage("Pincode is required")
      .isLength({ max: 6 })
      .withMessage("The PIN code consists of 6 digits"),
    body("city").trim().notEmpty().withMessage("City is required"),
    body("state").notEmpty().withMessage("State is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("phoneNumber")
      .trim()
      .notEmpty()
      .withMessage("Phone number is required")
      .isLength({ max: 10 })
      .withMessage("The phone number consists of 10 digits"),
  ];
};

const addressUpdateRequestBodyValidator = () => {
  return [
    body("name").optional(),
    body("addressLine1").optional(),
    body("addressLine2").optional(),
    body("pincode").optional(),
    body("city").optional(),
    body("state").optional(),
    body("country").optional(),
    body("phoneNumber").optional(),
  ];
};

export { addressCreateRequestBodyValidator, addressUpdateRequestBodyValidator };
