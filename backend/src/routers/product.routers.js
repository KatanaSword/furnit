import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import {
  createProducts,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  updateProductImage,
  updateProducts,
} from "../controllers/product.controllers.js";

const router = Router();

router
  .route("/")
  .get(getAllProducts)
  .post(verifyJWT, upload.single("image"), createProducts);

router
  .route("/update-image/:productId")
  .patch(verifyJWT, upload.single("image"), updateProductImage);

router
  .route("/:productId")
  .get(getProductById)
  .patch(verifyJWT, updateProducts)
  .delete(verifyJWT, deleteProduct);

router.route("/category/:categoryId").get(getProductsByCategory);

export default router;
