import mongoose, { Schema } from "mongoose";
import { User } from "./user.models.js";
import { Product } from "./product.models.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const wishlistSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    item: {
      type: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: {
            type: Number,
            required: Number,
            min: [1, "Quantity can not less then 1."],
            default: 1,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

wishlistSchema.plugin(mongooseAggregatePaginate);

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);
