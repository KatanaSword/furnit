import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import { UserRoles, options } from "../constants.js";
import { sendEmail, forgotPasswordMailgenContent } from "../utils/mail.js";
import crypto from "crypto";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating the access token."
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password, phoneNumber, role } = req.body;
  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out all required fields to sign up."
    );
  }

  if (!phoneNumber) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out all required fields to sign up."
    );
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }, { phoneNumber }],
  });

  if (existedUser) {
    throw new ApiError(
      409,
      "The user account already exists. Please use a different username, email, and phoneNumber to sign up"
    );
  }

  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    email,
    password,
    phoneNumber,
    role: role || UserRoles.USER,
  });

  const userCreated = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!userCreated) {
    throw new ApiError(
      500,
      "Registration failed due to an unexpected server error. Please try again later."
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: userCreated },
        "Account created successfully. Welcome aboard!"
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  if (!email && !username) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out all required fields to log in."
    );
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (!user) {
    throw new ApiError(
      401,
      "Incorrect email or username. Please verify your details and try again."
    );
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(
      400,
      "Invalid password. Please enter the correct password and try again."
    );
  }

  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-refreshToken -password"
  );
  if (!loggedInUser) {
    throw new ApiError(
      500,
      "Log in failed due to an unexpected server error. Please try again later"
    );
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "Login successful. Welcome back!"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: { refreshToken: 1 },
      },
      { new: true }
    ).select("-password -refreshToken");

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "Logout successful. Have a great day!"));
  } catch (error) {
    throw new ApiError(
      500,
      "Logout failed due to an unexpected server error. Please try again later."
    );
  }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Missing or invalid refresh token");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECURE
  );

  const user = await User.findById(decodedToken._id);

  if (!user) {
    throw new ApiError(
      401,
      "Invalid or expired refresh token. Please log in again to obtain a new refresh token."
    );
  }

  if (incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(
      401,
      "Refresh token mismatch. Please reauthenticate to obtain a new access token"
    );
  }

  const { accessToken, refreshToken: newRefreshToken } =
    await generateAccessAndRefreshToken(user._id);

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken: newRefreshToken },
        "New refresh token generated successfully"
      )
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
  try {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          req.user,
          "Current user details retrieved successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to retrieve current user due to a server error. Please try again later"
    );
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out required fields to forgot password"
    );
  }

  const user = await User.findOne({ $or: [{ email }] });
  if (!user) {
    throw new ApiError(404, "User does not exists", []);
  }

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  console.log(unHashedToken, hashedToken, tokenExpiry);

  user.forgetPasswordToken = hashedToken;
  user.forgetPasswordExpiry = tokenExpiry;
  await user.save({ validateBeforeSave: false });

  sendEmail({
    email: user?.email,
    subject: "Password reset request",
    mailgenContent: forgotPasswordMailgenContent(
      user.username,
      `${process.env.FORGOT_PASSWORD_REDIRECT_URL}/${unHashedToken}`
    ),
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Password reset email sent on your email Id. Please check your inbox for further instructions"
      )
    );
});

const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;
  if (!newPassword) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out required fields to reset password"
    );
  }

  let hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    forgetPasswordToken: hashedToken,
    forgetPasswordExpiry: { $gt: Date.now() },
  });
  if (!user) {
    throw new ApiError(489, "Token is invalid or expired");
  }

  user.forgetPasswordToken = undefined;
  user.forgetPasswordExpiry = undefined;

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Password reset successful. You can now log in with your new password"
      )
    );
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!(currentPassword || newPassword)) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out all required fields to change password"
    );
  }

  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(
      500,
      "Failed to retrieve user information. Please try again later."
    );
  }

  const isPasswordValid = await user.isPasswordCorrect(currentPassword);
  if (!isPasswordValid) {
    throw new ApiError(
      400,
      "Invalid current password. Please enter the correct password and try again"
    );
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse("200", {}, "password change successfully"));
});

const assignRole = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  if (!role) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out required field to assign role"
    );
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(
        500,
        "Failed to find user due to an unexpected server error. Please try again later."
      );
    }

    user.role = role;
    user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Role change successful"));
  } catch (error) {
    throw new ApiError(
      500,
      "Assign role failed due to an unexpected server error. Please try again later."
    );
  }
});

const updateAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar.url) {
    throw new ApiError(
      400,
      "Failed to upload avatar. Please ensure the file format is supported."
    );
  }

  const updateAvatar = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: {
          url: avatar.url,
        },
      },
    },
    { new: true }
  ).select("-password -refreshToken");
  if (!updateAvatar) {
    throw new ApiError(
      500,
      "Updating avatar failed due to an unexpected server error. Please try again later."
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateAvatar, "Update avatar successful."));
});

const updateAccountDetail = asyncHandler(async (req, res) => {
  const { fullName, username, phoneNumber, email } = req.body;

  try {
    const updateAccount = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          fullName,
          username,
          phoneNumber,
          email,
        },
      },
      {
        new: true,
      }
    ).select("-password -refreshToken");

    res
      .status(200)
      .json(new ApiResponse(200, updateAccount, "Update account successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      "Account update failed due to an unexpected server error. Please try again later."
    );
  }
});

const getMyOrder = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const orderAggregate = await User.aggregate([
      {
        $match: { customer: req.user._id },
      },
      {
        $lookup: {
          from: "users",
          localField: "customer",
          foreignField: "_id",
          as: "customer",
          pipeline: [
            {
              $project: {
                _id: 1,
                username: 1,
                email: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "coupons",
          localField: "coupon",
          foreignField: "_id",
          as: "coupon",
          pipeline: [
            {
              $project: {
                name: 1,
                couponCode: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          customer: { $first: "$customer" },
          coupon: { $isNull: [{ $first: "$coupon" }, null] },
          totalOrderItem: { $size: "$item" },
        },
      },
    ]);

    if (orderAggregate.length < 1) {
      throw new ApiError(404, "Order not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          page,
          limit,
          orderAggregate[0].orders,
          "Order fetch successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      "failed due to an unexpected server error. Please try again later."
    );
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  changePassword,
  assignRole,
  updateAvatar,
  updateAccountDetail,
  getMyOrder,
};
