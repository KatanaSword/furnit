import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Address } from "../models/address.models.js";
import { getMongoosePaginationOptions } from "../utils/helpers.js";

const createAddresses = asyncHandler(async (req, res) => {
  const {
    name,
    phoneNumber,
    addressLine1,
    addressLine2,
    pincode,
    city,
    state,
    country,
  } = req.body;
  if (
    [name, addressLine1, pincode, city, state, country].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out all required fields to create address."
    );
  }

  if (!phoneNumber) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out all required fields to create address."
    );
  }

  const createAddress = await Address.create({
    name,
    phoneNumber,
    addressLine1,
    addressLine2,
    pincode,
    city,
    state: state.toUpperCase(),
    country: country.toUpperCase(),
    owner: req.user._id,
  });
  if (!createAddress) {
    throw new ApiError(
      500,
      "Failed to create address due to an unexpected server error. Please try again later."
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { address: createAddress },
        "Address created Successfully"
      )
    );
});

const getAllAddresses = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const addressAggregation = Address.aggregate([
    { $match: { owner: req.user._id } },
  ]);
  if (addressAggregation.length < 1) {
    throw new ApiError(404, "Address not found");
  }

  const addresses = await Address.aggregatePaginate(
    addressAggregation,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: { totalDocs: "totalAddresses", docs: "addresses" },
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, addresses, "Address fetch successfully"));
});

const getAddressById = asyncHandler(async (req, res) => {
  const { addressId } = req.params;
  const address = await Address.findOne({
    _id: addressId,
    owner: req.user._id,
  });
  if (!address) {
    throw new ApiError(404, "Address not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, address, "Addess retrieve successfully"));
});

const updateAddress = asyncHandler(async (req, res) => {
  const {
    name,
    phoneNumber,
    addressLine1,
    addressLine2,
    pincode,
    city,
    state,
    country,
  } = req.body;
  const { addressId } = req.params;

  const updateAddresses = await Address.findOneAndUpdate(
    { _id: addressId, owner: req.user._id },
    {
      $set: {
        name,
        phoneNumber,
        addressLine1,
        addressLine2,
        pincode,
        city,
        state,
        country,
      },
    },
    { new: true }
  );
  if (!updateAddresses) {
    throw new ApiError(404, "Address not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateAddresses, "Address update successfully"));
});

const deleteAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;
  const deleteAddress = await Address.findOneAndDelete({
    _id: addressId,
    owner: req.user._id,
  });
  if (!deleteAddress) {
    throw new ApiError(404, "Address not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { deleteAddress }, "Address delete successfully")
    );
});

export {
  createAddresses,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
};
