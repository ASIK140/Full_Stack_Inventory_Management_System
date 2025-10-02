import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

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
  if (!(password === confirmPass)) {
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
  const loggedInUser = await User.findById(user._id).select("-password ");
  const token = generateToken(loggedInUser._id);

  if (!token) {
    throw new ApiError(500, "Internal server Error");
  }
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .cookie("token", token, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, token },
        "User login Successfully"
      )
    );
});

// @desc Logout User
// GET /api/v1/user/logout
export const logOutUser = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .clearCookie("token", options)
    .json(new ApiResponse(200, {}, "Logout Successful"));
});

// @desc Get All user
// GET /api/v1/user
export const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.json(new ApiResponse(200, users, "Get all user successful"));
});

// @desc Get Single User
// GET /api/v1/user/:id
export const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  res.json(new ApiResponse(200, user, "Fetch user profile successful"));
});

// @desc Delete User
// DELETE /api/v1/user/:id
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  res.json(new ApiResponse(200, user, "User deleted successful"));
});

// @desc Update User
// PUT /api/v1/user/:id
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, userName, password, role } = req.body;
  const existUser = await User.findOne({ userName: userName });
  if (existUser) {
    throw new ApiError(401, "User already exist");
  }
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  user.name = name || user.name;
  user.userName = userName || user.userName;
  user.password = password || user.password;
  user.role = role || user.role;
  const updatedUser = await user.save();
  res.json(new ApiResponse(200, {}, "User updated successful"));
});
