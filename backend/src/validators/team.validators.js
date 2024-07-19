import { body } from "express-validator";

const memberCreateRequiredBodyValidator = () => {
  return [
    body("name").trim().notEmpty().withMessage("Member name is required"),
    body("occupation").trim().notEmpty().withMessage("Occupation is required"),
  ];
};

const memberUpdateRequiredBodyValidator = () => {
  return [
    body("name")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Member name is required"),
    body("occupation")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Occupation is required"),
  ];
};

export { memberCreateRequiredBodyValidator, memberUpdateRequiredBodyValidator };
