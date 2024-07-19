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
      .isNumeric()
      .isLength({ max: 6, min: 6 })
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
    body("name").optional().trim().notEmpty().withMessage("Name is required"),
    body("addressLine1")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Address is required"),
    body("addressLine2").optional(),
    body("pincode")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Pincode is required")
      .isNumeric()
      .isLength({ max: 6, min: 6 })
      .withMessage("The PIN code consists of 6 digits"),
    body("city").optional().trim().notEmpty().withMessage("City is required"),
    body("state").optional().notEmpty().withMessage("State is required"),
    body("country").optional().notEmpty().withMessage("Country is required"),
    body("phoneNumber")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Phone number is required")
      .isLength({ max: 10 })
      .withMessage("The phone number consists of 10 digits"),
  ];
};

export { addressCreateRequestBodyValidator, addressUpdateRequestBodyValidator };
