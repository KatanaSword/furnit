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
import {
  mongoIdPathVariableValidator,
  mongoIdRequestBodyValidator,
} from "../validators/common/mongodb.validators.js";
import { UserRoles } from "../constants.js";
import { validate } from "../validators/validate.js";
import { verifyRazorpayPaymentValidators } from "../validators/order.validators.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/provider/razorpay")
  .post(
    mongoIdRequestBodyValidator("addressId"),
    validate,
    generateRazorpayOrder
  );
router
  .route("/provider/razorpay/verify-payment")
  .post(verifyRazorpayPaymentValidators(), validate, verifyRazorpayPayment);
router
  .route("/status/:orderId")
  .patch(
    /* verifyPermission([UserRoles.ADMIN]) */ mongoIdPathVariableValidator(
      "orderId"
    ),
    updateOrderStatusValidators(),
    validate,
    updateOrderStatus
  );
router
  .route("/:orderId")
  .get(mongoIdPathVariableValidator("orderId"), validate, getOrderById);
router
  .route("/list/admin")
  .get(/* verifyPermission([UserRoles.ADMIN]) */ getOrderListAdmin);

export default router;
