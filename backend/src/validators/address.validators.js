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
  ];
};

export { addressCreateRequestBodyValidator };
