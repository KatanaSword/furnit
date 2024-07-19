import { body, param } from "express-validator";
import { AvailableUserRoles } from "../constants.js";

const userRegisterValidator = () => {
  return [
    body("fullName").trim().notEmpty().withMessage("Fullname is required"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username must be at lease 3 characters long"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage(
        "password must be at least 8 characters long, with at least one number and one special symbol"
      ),
    body("phoneNumber")
      .trim()
      .notEmpty()
      .withMessage("Phone number is required")
      .isMobilePhone("en-IN")
      .withMessage("Phone number is invalid"),
    body("role")
      .optional()
      .isIn(AvailableUserRoles)
      .withMessage("Invalid user role"),
  ];
};

const userLoginValidator = () => {
  return [
    body("email").optional().isEmail().withMessage("Email is invalid"),
    body("username").optional(),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

const userForgotPasswordValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
  ];
};

const userResetPasswordValidator = () => {
  return [
    body("newPassword")
      .notEmpty()
      .withMessage("Password is required")
      .isStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage(
        "password must be at least 8 characters long, with at least one number and one special symbol"
      ),
  ];
};

const userChangePasswordValidator = () => {
  return [
    body("currentPassword")
      .notEmpty()
      .withMessage("Current Password is required"),
    body("newPassword")
      .notEmpty()
      .withMessage("New Password is required")
      .isStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage(
        "password must be at least 8 characters long, with at least one number and one special symbol"
      ),
  ];
};

const userAssignRoleValidator = () => {
  return [
    body("role")
      .optional()
      .isIn(AvailableUserRoles)
      .withMessage("Invalid user role"),
  ];
};

const userUpdateAccountValidator = () => {
  return [
    body("fullName")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Fullname is required"),
    body("username")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username must be at lease 3 characters long"),
    body("email")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("phoneNumber")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Phone number is required")
      .isLength({ max: 10, min: 10 })
      .withMessage("Phone number is invalid. It must be 10 digits long.")
      .isMobilePhone("en-IN")
      .withMessage("Phone number is invalid"),
    body("pronouns").optional().trim(),
    body("birthday").optional().trim(),
  ];
};

export {
  userRegisterValidator,
  userLoginValidator,
  userForgotPasswordValidator,
  userResetPasswordValidator,
  userChangePasswordValidator,
  userAssignRoleValidator,
  userUpdateAccountValidator,
};
