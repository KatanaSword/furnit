export const DB_NAME = "Furnit";

export const options = {
  httpOnly: true,
  secure: true,
};

export const UserRoles = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export const AvailableUserRoles = Object.values(UserRoles);

export const OrderStatus = {
  PENDING: "PENDING",
  CANCELLED: "CANCELLED",
  DELIVERED: "DELIVERED",
};

export const AvailableOrderStatus = Object.values(OrderStatus);

export const PaymentProvider = {
  UNKNOWN: "UNKNOWN",
  RAZORPAY: "RAZORPAY",
};

export const AvailablePaymentProvider = Object.values(PaymentProvider);

export const CouponTypes = {
  FLAT: "FLAT",
};

export const AvailableCouponType = Object.values(CouponTypes);

export const USER_TEMPORARY_TOKEN_EXPIRY = 10 * 60 * 1000;
