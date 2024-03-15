import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const contactSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    comment: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

contactSchema.plugin(mongooseAggregatePaginate);

export const Contact = mongoose.model("Contact", contactSchema);
