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

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/addresses", addressRouter);
app.use("/api/v1/teams", teamRouter);

export { app };
