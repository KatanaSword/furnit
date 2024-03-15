export const DB_NAME = "Furnit";

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

// TODO: add payment provider service
export const PaymentProvider = {
  UNKNOWN: "UNKNOWN",
};

export const AvailablePaymentProvider = Object.values(PaymentProvider);

export const CouponTypes = {
  FLAT: "FLAT",
  PERCENTAGE: "PERCENTAGE",
};

export const AvailableCouponType = Object.values(CouponTypes);
