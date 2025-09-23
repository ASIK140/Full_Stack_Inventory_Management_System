import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import bcrypt from "bcrypt";

const isMatch = async (userPass, dbPass) => {
  return await bcrypt.compare(userPass, dbPass);
};

// @des Create User
// POST /api/v1/user
export const createUser = asyncHandler(async (req, res) => {
  const { name, userName, role, password, confirmPass } = req.body;
  if (!name || !userName || !role || !password || !confirmPass) {
    throw new ApiError(400, "All fields are require");
  }
  if (password === confirmPass) {
    throw new ApiError(400, "Confirm Password does not match");
  }
  const existUser = await User.findOne({ userName });
  if (existUser) {
    throw new ApiError(400, "Username already exist");
  }

  const user = await User.create({
    name,
    userName,
    password,
    role,
  });
  const createdUser = await User.findById(user._id).select("-password -token");
  res.json(new ApiResponse(201, createdUser, "User Create Successful"));
});

// @desc Login User
// POST /api/v1/user/login
export const logInUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new ApiError(400, "Please Enter All Fields");
  }
  const user = await User.findOne({ userName });

  if (!(user && (await isMatch(password, user.password)))) {
    throw new ApiError(404, "Invalid email or password");
  }
  const loggedInUser = await User.findById(user._id).select("-password -token");
  res.json(new ApiResponse(200, loggedInUser, "User login Successfully"));
});
