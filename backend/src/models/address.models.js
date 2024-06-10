import mongoose, { Schema } from "mongoose";
import { User } from "./user.models.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const addressSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    phoneNumber: {
      type: Number,
      trim: true,
      required: true,
    },
    addressLine1: {
      type: String,
      trim: true,
      required: true,
    },
    addressLine2: {
      type: String,
      trim: true,
    },
    pincode: {
      type: String,
      trim: true,
      required: true,
    },
    city: {
      type: String,
      trim: true,
      required: true,
    },
    state: {
      type: String,
      trim: true,
      uppercase: true,
      required: true,
    },
    country: {
      type: String,
      trim: true,
      uppercase: true,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

addressSchema.plugin(mongooseAggregatePaginate);

export const Address = mongoose.model("Address", addressSchema);
