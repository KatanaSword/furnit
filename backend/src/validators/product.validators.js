import { body } from "express-validator";
import { mongoIdRequestBodyValidator } from "../validators/common/mongodb.validators.js";

const productCreateRequiredBodyValidator = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Product name is required")
      .isLength({ min: 4 })
      .withMessage("Product name must be at lease 4 characters long"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
    body("category").trim().notEmpty().withMessage("Category is required"),
    body("price")
      .trim()
      .notEmpty()
      .withMessage("Product price is required")
      .isNumeric()
      .withMessage("Price must be a number"),
    body("stock")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Stock is required")
      .isNumeric()
      .withMessage("Stock must be a number"),
    ...mongoIdRequestBodyValidator("category"),
  ];
};

const productUpdateRequiredBodyValidator = () => {
  return [
    body("name")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Product name is required")
      .isLength({ min: 4 })
      .withMessage("Product name must be at lease 4 characters long"),
    body("description")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
    body("category").trim().notEmpty().withMessage("Category is required"),
    body("price")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Product price is required")
      .isNumeric()
      .withMessage("Price must be a number"),
    body("stock")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Stock is required")
      .isNumeric()
      .withMessage("Stock must be a number"),
    ...mongoIdRequestBodyValidator("category"),
  ];
};

export {
  productCreateRequiredBodyValidator,
  productUpdateRequiredBodyValidator,
};
