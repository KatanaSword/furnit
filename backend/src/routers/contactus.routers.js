import { Router } from "express";
import {
  verifyJWT,
  verifyPermission,
} from "../middlewares/auth.middlewares.js";
import {
  askQuestion,
  deleteQuestion,
  displayFrequentlyAskedQuestions,
  getAllQuestions,
  getQuestionById,
  replyToQuestion,
} from "../controllers/contactus.controllers.js";
import {
  askQuestionRequestBodyValidator,
  replyToQuestionRequestBodyValidator,
} from "../validators/contactus.validators.js";
import { mongoIdPathVariableValidator } from "../validators/common/mongodb.validators.js";
import { validate } from "../validators/validate.js";
import { UserRoles } from "../constants.js";

const router = Router();

router
  .route("/")
  .get(displayFrequentlyAskedQuestions)
  .post(askQuestionRequestBodyValidator(), validate, askQuestion);
router.route("/questions").get(verifyJWT, getAllQuestions);
router
  .route("/questions/:questionId")
  .get(
    verifyJWT,
    verifyPermission([UserRoles.ADMIN]),
    mongoIdPathVariableValidator("questionId"),
    validate,
    getQuestionById
  )
  .patch(
    verifyJWT,
    verifyPermission([UserRoles.ADMIN]),
    replyToQuestionRequestBodyValidator(),
    mongoIdPathVariableValidator("questionId"),
    validate,
    replyToQuestion
  )
  .delete(
    verifyJWT,
    verifyPermission([UserRoles.ADMIN]),
    mongoIdPathVariableValidator("questionId"),
    validate,
    deleteQuestion
  );

export default router;
