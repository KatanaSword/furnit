import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");
    if (!token) {
      throw new apiError(401, "Missing or invalid authentication token");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECURE);

    const user = await User.findById(decodedToken?._id).select(
      "-password, -refreshToken"
    );
    if (!user) {
      throw new apiError(401, "Missing or invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new apiError(
      401,
      message?.error || "Missing or invalid access token"
    );
  }
});

const verifyPermission = (roles = []) => {
  asyncHandler(async (req, _, next) => {
    if (!req.user?._id) {
      throw new apiError(401, "Unauthorized request");
    }
    if (roles.includes(req.user?.role)) {
      next();
    } else {
      throw new apiError(403, "You are not allowed to perform this action");
    }
  });
};

export { verifyJWT, verifyPermission };
