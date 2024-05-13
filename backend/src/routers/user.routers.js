import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import {
  verifyJWT,
  verifyPermission,
} from "../middlewares/auth.middlewares.js";
import {
  assignRole,
  changePassword,
  forgotPassword,
  getCurrentUser,
  getMyOrder,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resetPassword,
  updateAccountDetail,
  updateAvatar,
} from "../controllers/user.controllers.js";
import { UserRoles } from "../constants.js";

const router = Router();

// unsecured routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:resetToken").post(resetPassword);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/change-password").post(verifyJWT, changePassword);
router
  .route("/assign-role/:userId")
  .post(verifyJWT, /* verifyPermission([UserRoles.ADMIN]), */ assignRole);
router
  .route("/update-avatar")
  .patch(verifyJWT, upload.single("avatar"), updateAvatar);
router.route("/update-account").patch(verifyJWT, updateAccountDetail);
router.route("/my-orders").get(verifyJWT, getMyOrder);

export default router;
