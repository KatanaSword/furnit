import { Router } from "express";
import {
  verifyJWT,
  verifyPermission,
} from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import {
  createMembers,
  deleteMember,
  getAllMembers,
  getMemberById,
  updateMemberImage,
  updateMembers,
} from "../controllers/team.controllers.js";
import {
  memberCreateRequiredBodyValidator,
  memberUpdateRequiredBodyValidator,
} from "../validators/team.validators.js";
import { validate } from "../validators/validate.js";
import { mongoIdPathVariableValidator } from "../validators/common/mongodb.validators.js";
import { UserRoles } from "../constants.js";

const router = Router();

router
  .route("/")
  .get(getAllMembers)
  .post(
    verifyJWT,
    verifyPermission([UserRoles.ADMIN]),
    upload.single("image"),
    memberCreateRequiredBodyValidator(),
    validate,
    createMembers
  );

router
  .route("/update-image/:memberId")
  .patch(
    verifyJWT,
    verifyPermission([UserRoles.ADMIN]),
    upload.single("image"),
    mongoIdPathVariableValidator("memberId"),
    validate,
    updateMemberImage
  );

router
  .route("/:memberId")
  .get(
    verifyJWT,
    verifyPermission([UserRoles.ADMIN]),
    mongoIdPathVariableValidator("memberId"),
    validate,
    getMemberById
  )
  .patch(
    verifyJWT,
    verifyPermission([UserRoles.ADMIN]),
    mongoIdPathVariableValidator("memberId"),
    memberUpdateRequiredBodyValidator(),
    validate,
    updateMembers
  )
  .delete(
    verifyJWT,
    verifyPermission([UserRoles.ADMIN]),
    mongoIdPathVariableValidator("memberId"),
    validate,
    deleteMember
  );

export default router;
