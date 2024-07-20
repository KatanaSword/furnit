import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  addItem,
  clearWishlist,
  getUserWishlist,
  removeItemFromWishlist,
} from "../controllers/wishlist.controllers.js";
import { mongoIdPathVariableValidator } from "../validators/common/mongodb.validators.js";
import { validate } from "../validators/validate.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getUserWishlist);
router.route("/clear").delete(clearWishlist);
router
  .route("/item/:productId")
  .post(mongoIdPathVariableValidator("productId"), validate, addItem)
  .delete(
    mongoIdPathVariableValidator("productId"),
    validate,
    removeItemFromWishlist
  );

export default router;
