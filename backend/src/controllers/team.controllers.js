import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Team } from "../models/team.models.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { getMongoosePaginationOptions } from "../utils/helpers.js";

const getAllMembers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const memberAggregate = await Team.aggregate([{ $match: {} }]);
  if (memberAggregate.length < 1) {
    throw new ApiError(404, "Member not found");
  }

  const members = await Team.aggregatePaginate(
    memberAggregate,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalteams",
        docs: "teams",
      },
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, members, "Team member fetch successfully"));
});

const createMembers = asyncHandler(async (req, res) => {
  const { name, occupation } = req.body;
  if ([name, occupation].some((field) => field?.trim() === "")) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out all required fields to create member"
    );
  }

  const imageLocalPath = req.file?.path;
  if (!imageLocalPath) {
    throw new ApiError(
      400,
      "Invalid file upload. Please select a valid image file."
    );
  }

  const image = await uploadOnCloudinary(imageLocalPath, "furnit/members");
  if (!image) {
    throw new ApiError(
      500,
      "Failed to upload image. Please ensure the file format is supported."
    );
  }

  const createMember = await Team.create({
    name,
    occupation,
    image: {
      url: image.url,
      publicId: image.public_id,
    },
    owner: req.user._id,
  });
  if (!createMember) {
    throw new ApiError(
      500,
      "Failed to create member due to an unexpected server error. Please try again later."
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { member: createMember },
        "Member created successfully. Welcome aboard!"
      )
    );
});

const getMemberById = asyncHandler(async (req, res) => {
  const { memberId } = req.params;
  const member = await Team.findById(memberId);
  if (!member) {
    throw new ApiError(404, "Team member does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, member, "Team member retrieve successfully"));
});

const updateMembers = asyncHandler(async (req, res) => {
  const { name, occupation } = req.body;
  const { memberId } = req.params;
  const imageLocalPath = req.file?.path;
  if (!imageLocalPath) {
    throw new ApiError(
      400,
      "Invalid file upload. Please select a valid image file."
    );
  }

  const image = await uploadOnCloudinary(imageLocalPath, "furnit/members");
  if (!image) {
    throw new ApiError(
      500,
      "Failed to upload image. Please ensure the file format is supported."
    );
  }

  const member = await Team.findById(memberId);
  if (!member) {
    throw new ApiError(404, "Team member not found");
  }

  const updateMembers = await Team.findByIdAndUpdate(
    memberId,
    {
      $set: {
        name,
        occupation,
        image: {
          url: image.url,
          publicId: image.public_id,
        },
      },
    },
    { new: true }
  );
  if (!updateMembers) {
    throw new ApiError(
      500,
      "Failed to update member due to an unexpected server error. Please try again later"
    );
  }

  const publicId = member.image.publicId;
  await deleteFromCloudinary(publicId);

  return res
    .status(200)
    .json(new ApiResponse(200, updateMembers, "Member update successful"));
});

const deleteMember = asyncHandler(async (req, res) => {
  const { memberId } = req.params;
  const member = await Team.findById(memberId);
  if (!member) {
    throw new ApiError(404, "Team member dose not exist");
  }

  const deleteMember = await Team.findByIdAndDelete(memberId);
  if (!deleteMember) {
    throw new ApiError(404, "Team member dose not exist");
  }

  const publicId = member.image.publicId;
  await deleteFromCloudinary(publicId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Team member delete successfully"));
});

export {
  getAllMembers,
  createMembers,
  getMemberById,
  updateMembers,
  deleteMember,
};
