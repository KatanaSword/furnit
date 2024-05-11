import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import {
  AvailableUserRoles,
  UserRoles,
  USER_TEMPORARY_TOKEN_EXPIRY,
} from "../constants.js";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRoles.USER,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatar: {
      type: {
        url: String,
      },
      default: {
        url: "https://via.placeholder.com/200x200.png",
      },
    },
    refreshToken: {
      type: String,
    },
    forgetPasswordToken: {
      type: String,
    },
    forgetPasswordExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Hash Password Before Save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Correct Password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      phoneNumber: this.phoneNumber,
    },
    process.env.ACCESS_TOKEN_SECURE,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECURE, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

// Generate Temporary Token
userSchema.methods.generateTemporaryToken = function () {
  const unHashedToken = crypto.randomBytes(20).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  const tokenExpiry = Date.now() + USER_TEMPORARY_TOKEN_EXPIRY;

  return { unHashedToken, hashedToken, tokenExpiry };
};

export const User = mongoose.model("User", userSchema);
