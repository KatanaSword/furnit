import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const contactusSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    reply: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

contactusSchema.plugin(mongooseAggregatePaginate);

export const Contactus = mongoose.model("Contactus", contactusSchema);
