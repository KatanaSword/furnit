import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  askQuestion,
  deleteQuestion,
  displayFrequentlyAskedQuestions,
  getAllQuestions,
  getQuestionById,
  replyToQuestion,
} from "../controllers/contactus.controllers.js";

const router = Router();

router.route("/").get(displayFrequentlyAskedQuestions).post(askQuestion);
router.route("/questions").get(verifyJWT, getAllQuestions);
router
  .route("/:questionId")
  .get(verifyJWT, getQuestionById)
  .patch(verifyJWT, replyToQuestion)
  .delete(verifyJWT, deleteQuestion);

export default router;
