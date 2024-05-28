import mongoose, { Schema } from "mongoose";
import { User } from "./user.models.js";
import { AvailableCouponType, CouponTypes } from "../constants.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const couponSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    couponCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    type: {
      type: String,
      enum: AvailableCouponType,
      default: CouponTypes.FLAT,
    },
    discountValue: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
      default: null,
    },
    minimumCartValue: {
      type: Number,
      default: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

couponSchema.plugin(mongooseAggregatePaginate);

export const Coupon = mongoose.model("Coupon", couponSchema);
