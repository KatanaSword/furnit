import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  addItem,
  clearWishlist,
  getUserWishlist,
  removeItemFromWishlist,
} from "../controllers/wishlist.controllers.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getUserWishlist);
router.route("/clear").delete(clearWishlist);
router.route("/item/:productId").post(addItem).delete(removeItemFromWishlist);

export default router;
