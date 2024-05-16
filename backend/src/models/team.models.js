import mongoose, { Schema } from "mongoose";
import { User } from "./user.models.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const teamSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    occupation: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      type: {
        url: String,
      },
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

teamSchema.plugin(mongooseAggregatePaginate);

export const Team = mongoose.model("Team", teamSchema);
