import { Router } from "express";
import {
  verifyJWT,
  verifyPermission,
} from "../middlewares/auth.middlewares.js";
import {
  applyCoupon,
  createCoupons,
  deleteCoupon,
  getAllCoupons,
  getCouponById,
  getValidCouponForCustomer,
  removeCouponFromCart,
  updateCoupon,
  updateCouponActiveStatus,
} from "../controllers/coupon.controllers.js";
import { UserRoles } from "../constants.js";
import {
  couponCreateRequestBodyValidator,
  couponUpdateRequestBodyValidator,
  couponApplyValidator,
  updateCouponActiveStatusValidator,
} from "../validators/coupon.validators.js";
import { validate } from "../validators/validate.js";
import { mongoIdPathVariableValidator } from "../validators/common/mongodb.validators.js";

const router = Router();
router.use(verifyJWT);

router.route("/c/apply").post(couponApplyValidator(), validate, applyCoupon);
router.route("/c/remove").post(removeCouponFromCart);
router.route("/customer/available").get(getValidCouponForCustomer);

router.use(verifyPermission([UserRoles.ADMIN]));

router
  .route("/")
  .get(getAllCoupons)
  .post(couponCreateRequestBodyValidator(), validate, createCoupons);
router
  .route("/:couponId")
  .get(mongoIdPathVariableValidator("couponId"), validate, getCouponById)
  .patch(
    mongoIdPathVariableValidator("couponId"),
    couponUpdateRequestBodyValidator(),
    validate,
    updateCoupon
  )
  .delete(mongoIdPathVariableValidator("couponId"), validate, deleteCoupon);
router
  .route("/status/:couponId")
  .patch(
    mongoIdPathVariableValidator("couponId"),
    updateCouponActiveStatusValidator(),
    validate,
    updateCouponActiveStatus
  );

export default router;
