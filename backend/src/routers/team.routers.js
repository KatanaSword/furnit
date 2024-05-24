import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import {
  createMembers,
  deleteMember,
  getAllMembers,
  getMemberById,
  updateMemberImage,
  updateMembers,
} from "../controllers/team.controllers.js";

const router = Router();

router
  .route("/")
  .get(getAllMembers)
  .post(verifyJWT, upload.single("image"), createMembers);

router
  .route("/update-image/:memberId")
  .patch(verifyJWT, upload.single("image"), updateMemberImage);

router
  .route("/:memberId")
  .get(getMemberById)
  .patch(verifyJWT, updateMembers)
  .delete(verifyJWT, deleteMember);

export default router;
