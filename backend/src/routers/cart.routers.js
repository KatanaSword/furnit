import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  addItemAndUpdateItemQuality,
  clearCart,
  getUserCart,
  removeItemFromCart,
} from "../controllers/cart.controllers.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getUserCart);
router.route("/clear").delete(clearCart);
router
  .route("/item/:productId")
  .post(addItemAndUpdateItemQuality)
  .delete(removeItemFromCart);

export default router;
