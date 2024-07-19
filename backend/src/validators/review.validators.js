import { body } from "express-validator";

const reviewAddRequiredBodyValidator = () => {
  return [
    body("review")
      .trim()
      .notEmpty()
      .withMessage("Write a review")
      .isLength({ max: 650 })
      .withMessage("The review should not exceed 650 characters."),
    body("rating").trim().notEmpty().withMessage("Give rating"),
  ];
};

export { reviewAddRequiredBodyValidator };
