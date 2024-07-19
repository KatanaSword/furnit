import { body } from "express-validator";

const categoryCreateRequestBodyValidator = () => {
  return [
    body("name").trim().notEmpty().withMessage("Category name is required"),
  ];
};

const categoryUpdateRequestBodyValidator = () => {
  return [
    body("name")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Category name is required"),
  ];
};

export {
  categoryCreateRequestBodyValidator,
  categoryUpdateRequestBodyValidator,
};
