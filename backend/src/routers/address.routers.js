import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  createAddresses,
  deleteAddress,
  getAddressById,
  getAllAddresses,
  updateAddress,
} from "../controllers/address.controllers.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(createAddresses).get(getAllAddresses);
router
  .route("/:addressId")
  .patch(updateAddress)
  .get(getAddressById)
  .delete(deleteAddress);

export default router;
