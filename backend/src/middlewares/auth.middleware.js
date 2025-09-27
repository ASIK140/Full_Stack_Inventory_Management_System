import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import User from "../models/user.model.js";

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    throw new ApiError(401, "Please login");
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode.id).select("-password");
    if (!req.user) {
      throw new ApiError(404, "User not found");
    }
    next();
  } catch (error) {
    throw new ApiError(401, "Please login");
  }
});

export const adminOnly = (req, res, next) => {
  if (req.user?.role === "admin") {
    next();
  } else {
    throw new ApiError(403, "Admin access only");
  }
};
