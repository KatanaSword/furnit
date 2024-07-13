import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "18kb" }));
app.use(express.urlencoded({ extended: true, limit: "18kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from "./routers/user.routers.js";
import categoryRouter from "./routers/category.routers.js";
import productRouter from "./routers/product.routers.js";
import addressRouter from "./routers/address.routers.js";
import teamRouter from "./routers/team.routers.js";
import couponRouter from "./routers/coupon.routers.js";
import wishlistRouter from "./routers/wishlist.routers.js";
import contactusRouter from "./routers/contactus.routers.js";
import cartRouter from "./routers/cart.routers.js";
import orderRouter from "./routers/order.routers.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/addresses", addressRouter);
app.use("/api/v1/teams", teamRouter);
app.use("/api/v1/coupons", couponRouter);
app.use("/api/v1/wishlists", wishlistRouter);
app.use("/api/v1/contactus", contactusRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);

export { app };
