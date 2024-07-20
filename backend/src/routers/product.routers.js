import { Router } from "express";
import {
  verifyJWT,
  verifyPermission,
} from "../middlewares/auth.middlewares.js";
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
import { UserRoles } from "../constants.js";
import { validate } from "../validators/validate.js";
import {
  mongoIdPathVariableValidator,
  productUpdateRequiredBodyValidator,
} from "../validators/common/mongodb.validators.js";
import {
  productCreateRequiredBodyValidator,
  productUpdateRequiredBodyValidator,
} from "../validators/product.validators.js";

const router = Router();

router
  .route("/")
  .get(getAllProducts)
  .post(
    verifyJWT,
    verifyPermission([UserRoles.ADMIN]),
    upload.single("image"),
    productCreateRequiredBodyValidator(),
    validate,
    createProducts
  );

router
  .route("/update-image/:productId")
  .patch(
    verifyJWT,
    verifyPermission([UserRoles.ADMIN]),
    upload.single("image"),
    mongoIdPathVariableValidator("productId"),
    validate,
    updateProductImage
  );

router
  .route("/:productId")
  .get(mongoIdPathVariableValidator("productId"), validate, getProductById)
  .patch(
    verifyJWT,
    verifyPermission([UserRoles.ADMIN]),
    mongoIdPathVariableValidator("productId"),
    productUpdateRequiredBodyValidator(),
    validate,
    updateProducts
  )
  .delete(
    verifyJWT,
    verifyPermission([UserRoles.ADMIN]),
    mongoIdPathVariableValidator("productId"),
    validate,
    deleteProduct
  );

router
  .route("/category/:categoryId")
  .get(
    mongoIdPathVariableValidator("categoryId"),
    validate,
    getProductsByCategory
  );

export default router;
