import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  addReview,
  deleteReview,
  getProductReviews,
  updateReview,
} from "../controllers/review.controllers.js";
import { mongoIdPathVariableValidator } from "../validators/common/mongodb.validators.js";
import {
  reviewAddRequiredBodyValidator,
  reviewUpdateRequiredBodyValidator,
} from "../validators/review.validators.js";
import { validate } from "../validators/validate.js";

const router = Router();

router
  .route("/product/:productId")
  .get(mongoIdPathVariableValidator("productId"), validate, getProductReviews)
  .post(
    verifyJWT,
    mongoIdPathVariableValidator("productId"),
    reviewAddRequiredBodyValidator(),
    validate,
    addReview
  );
router
  .route("/:reviewId")
  .patch(
    verifyJWT,
    mongoIdPathVariableValidator("reviewId"),
    reviewUpdateRequiredBodyValidator(),
    validate,
    updateReview
  )
  .delete(
    verifyJWT,
    mongoIdPathVariableValidator("reviewId"),
    validate,
    deleteReview
  );

export default router;
