import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import {
  createMembers,
  deleteMember,
  getAllMembers,
  getMemberById,
  updateMembers,
} from "../controllers/team.controllers.js";

const router = Router();

router
  .route("/")
  .get(getAllMembers)
  .post(verifyJWT, upload.single("image"), createMembers);

router
  .route("/:memberId")
  .get(verifyJWT, getMemberById)
  .patch(verifyJWT, upload.single("image"), updateMembers)
  .delete(verifyJWT, deleteMember);

export default router;
