import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  createAddresses,
  deleteAddress,
  getAddressById,
  getAllAddresses,
  updateAddress,
} from "../controllers/address.controllers.js";
import {
  addressCreateRequestBodyValidator,
  addressUpdateRequestBodyValidator,
} from "../validators/address.validators.js";
import { validate } from "../validators/validate.js";
import { mongoIdPathVariableValidator } from "../validators/common/mongodb.validators.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/")
  .post(addressCreateRequestBodyValidator(), validate, createAddresses)
  .get(getAllAddresses);
router
  .route("/:addressId")
  .patch(
    addressUpdateRequestBodyValidator(),
    mongoIdPathVariableValidator("addressId"),
    validate,
    updateAddress
  )
  .get(mongoIdPathVariableValidator("addressId"), validate, getAddressById)
  .delete(mongoIdPathVariableValidator("addressId"), validate, deleteAddress);

export default router;
