import { body } from "express-validator";

const askQuestionRequestBodyValidator = () => {
  [
    body("fullName").trim().notEmpty().withMessage("Name is required"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is Invalid"),
    body("question")
      .trim()
      .notEmpty()
      .withMessage("Ask a question")
      .isLength({ max: 170 })
      .withMessage("The question should not exceed 170 characters."),
  ];
};

export { askQuestionRequestBodyValidator };
