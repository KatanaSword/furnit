import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Contactus } from "../models/contactus.models.js";
import { getMongoosePaginationOptions } from "../utils/helpers.js";
import { guestQuestionReplyMailgenContent, sendEmail } from "../utils/mail.js";

const askQuestion = asyncHandler(async (req, res) => {
  const { fullName, email, question } = req.body;
  if ([fullName, email, question].some((field) => field?.trim() === "")) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out all required fields to ask question"
    );
  }

  const askQuestion = await Contactus.create({
    fullName,
    email,
    question,
  });
  if (!askQuestion) {
    throw new ApiError(
      500,
      "ask question failed due to an unexpected server error. Please try again later"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { question: askQuestion },
        "Question ask successfully"
      )
    );
});

const replyToQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const { reply } = req.body;
  if (!reply) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out required field to reply a question"
    );
  }

  const question = await Contactus.findById(questionId);
  if (!question) {
    throw new ApiError(404, "Question does not exist");
  }

  const replyToQuestion = await Contactus.findByIdAndUpdate(
    questionId,
    {
      $set: { reply },
    },
    { new: true }
  );
  if (!replyToQuestion) {
    throw new ApiError(
      500,
      "Failed to reply a question due to an unexpected server error. Please try again later."
    );
  }

  sendEmail({
    email: question?.email,
    subject: "Response to Your Question",
    mailgenContent: guestQuestionReplyMailgenContent(
      question.fullName,
      question.question,
      question.reply
    ),
  });

  return res
    .status(200)
    .json(new ApiResponse(200, replyToQuestion, "Reply send successfully"));
});

const getAllQuestions = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const questionAggregate = Contactus.aggregate([{ $match: {} }]);
  if (!questionAggregate.length < 1) {
    throw new ApiError(404, "Questions does not exist");
  }

  const questions = await Contactus.aggregatePaginate(
    questionAggregate,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalContactus",
        docs: "contactus",
      },
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, questions, "Question fetch successfully"));
});

const getQuestionById = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const question = await Contactus.findById(questionId);
  if (!question) {
    throw new ApiError(404, "question does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, question, "Question retrieve successfully"));
});

const deleteQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const deleteQuestion = await Contactus.findByIdAndDelete(questionId);
  if (!deleteQuestion) {
    throw new ApiError(404, "question does not exist");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { deleteQuestion }, "Question delete successfully")
    );
});

const displayFrequentlyAskedQuestions = async (req, res) => {};

export {
  askQuestion,
  replyToQuestion,
  getAllQuestions,
  getQuestionById,
  deleteQuestion,
  displayFrequentlyAskedQuestions,
};
