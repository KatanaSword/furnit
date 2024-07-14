import { Router } from "express";
import {
  verifyJWT,
  verifyPermission,
} from "../middlewares/auth.middlewares.js";
import {
  generateRazorpayOrder,
  getOrderById,
  getOrderListAdmin,
  updateOrderStatus,
  verifyRazorpayPayment,
} from "../controllers/order.controllers.js";
import { mongoIdRequestBodyValidator } from "../validators/common/mongodb.validators.js";
import { UserRoles } from "../constants.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/provider/razorpay")
  .post(mongoIdRequestBodyValidator("addressId"), generateRazorpayOrder);
router.route("/provider/razorpay/verify-payment").post(verifyRazorpayPayment);
router
  .route("/status/:orderId")
  .patch(/* verifyPermission([UserRoles.ADMIN]) */ updateOrderStatus);
router.route("/:orderId").get(getOrderById);
router
  .route("/list/admin")
  .get(/* verifyPermission([UserRoles.ADMIN]) */ getOrderListAdmin);

export default router;
