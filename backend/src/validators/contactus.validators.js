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

const replyToQuestionRequestBodyValidator = () => {
  return [
    body("reply")
      .trim()
      .notEmpty()
      .withMessage("Reply a question")
      .isLength({ max: 650 })
      .withMessage("The reply should not exceed 650 characters."),
  ];
};

export { askQuestionRequestBodyValidator, replyToQuestionRequestBodyValidator };
