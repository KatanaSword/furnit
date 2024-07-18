import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  addReview,
  deleteReview,
  getProductReviews,
  updateReview,
} from "../controllers/review.controllers.js";
import { mongoIdPathVariableValidator } from "../validators/common/mongodb.validators.js";

const router = Router();

router
  .route("/product/:productId")
  .get(mongoIdPathVariableValidator("productId"), getProductReviews)
  .post(verifyJWT, mongoIdPathVariableValidator("productId"), addReview);
router
  .route("/:reviewId")
  .patch(verifyJWT, mongoIdPathVariableValidator("reviewId"), updateReview)
  .delete(verifyJWT, mongoIdPathVariableValidator("reviewId"), deleteReview);

export default router;
