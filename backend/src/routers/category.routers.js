import { Router } from "express";
import {
  verifyJWT,
  verifyPermission,
} from "../middlewares/auth.middlewares.js";
import {
  createCategories,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategories,
} from "../controllers/category.controllers.js";
import { mongoIdPathVariableValidator } from "../validators/common/mongodb.validators.js";
import { categoryCreateRequestBodyValidator } from "../validators/category.validators.js";
import { validate } from "../validators/validate.js";
import { categoryUpdateRequestBodyValidator } from "../validators/category.validators.js";
import { UserRoles } from "../constants.js";

const router = Router();

router
  .route("/")
  .get(getAllCategories)
  .post(
    verifyJWT,
    verifyPermission([UserRoles.ADMIN]),
    categoryCreateRequestBodyValidator(),
    validate,
    createCategories
  );
router
  .route("/:categoryId")
  .get(mongoIdPathVariableValidator("categoryId"), validate, getCategoryById)
  .delete(
    verifyJWT,
    verifyPermission([UserRoles.ADMIN]),
    mongoIdPathVariableValidator("categoryId"),
    validate,
    deleteCategory
  )
  .patch(
    verifyJWT,
    verifyPermission([UserRoles.ADMIN]),
    categoryUpdateRequestBodyValidator(),
    mongoIdPathVariableValidator("categoryId"),
    validate,
    updateCategories
  );

export default router;
