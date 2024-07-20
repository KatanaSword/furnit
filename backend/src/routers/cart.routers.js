import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  addItemAndUpdateItemQuality,
  clearCart,
  getUserCart,
  removeItemFromCart,
} from "../controllers/cart.controllers.js";
import { addItemOrUpdateItemQuantityValidator } from "../validators/cart.validators.js";
import { mongoIdPathVariableValidator } from "../validators/common/mongodb.validators.js";
import { validate } from "../validators/validate.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getUserCart);
router.route("/clear").delete(clearCart);
router
  .route("/item/:productId")
  .post(
    addItemOrUpdateItemQuantityValidator,
    mongoIdPathVariableValidator("productId"),
    validate,
    addItemAndUpdateItemQuality
  )
  .delete(
    mongoIdPathVariableValidator("productId"),
    validate,
    removeItemFromCart
  );

export default router;
