import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
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

const router = Router();
router.use(verifyJWT);

router.route("/c/apply").post(applyCoupon);
router.route("/c/remove").post(removeCouponFromCart);
router.route("/customer/available").get(getValidCouponForCustomer);
router.route("/").get(getAllCoupons).post(createCoupons);
router
  .route("/:couponId")
  .get(getCouponById)
  .patch(updateCoupon)
  .delete(deleteCoupon);
router.route("/status/:couponId").patch(updateCouponActiveStatus);

export default router;
