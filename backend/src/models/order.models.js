import mongoose, { Schema } from "mongoose";
import {
  AvailableOrderStatus,
  AvailablePaymentProvider,
  OrderStatus,
  PaymentProvider,
} from "../constants.js";
import { User } from "./user.models.js";
import { Coupon } from "./coupon.models.js";
import { Product } from "./product.models.js";
import { Address } from "./address.models.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const orderSchema = new Schema(
  {
    orderPrice: {
      type: Number,
      required: true,
    },
    discountedOrderPrice: {
      type: Number,
      required: true,
    },
    coupon: {
      type: Schema.Types.ObjectId,
      ref: "Coupon",
      default: null,
    },
    customer: {
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
          quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity can not be less then 1."],
            default: 1,
          },
        },
      ],
      default: [],
    },
    status: {
      type: String,
      enum: AvailableOrderStatus,
      default: OrderStatus.PENDING,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    paymentProvider: {
      type: String,
      enum: AvailablePaymentProvider,
      default: PaymentProvider.UNKNOWN,
    },
    isPaymentDone: {
      type: Boolean,
      default: false,
    },
    paymentId: {
      type: String,
    },
  },
  { timestamps: true }
);

orderSchema.plugin(mongooseAggregatePaginate);

export const Order = mongoose.model("Order", orderSchema);
