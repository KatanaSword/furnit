import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.on("Error", (error) => {
      console.log("Error", error);
    });
    app.listen(process.env.PORT || 3500, () => {
      console.log(`⚙️  Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed !!!", error);
  });
