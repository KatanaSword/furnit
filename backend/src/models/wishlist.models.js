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
    items: {
      type: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
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
