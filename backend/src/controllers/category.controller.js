import Category from "../models/category.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc Create category
// POST /api/v1/category
export const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    throw new ApiError(400, "Name is required");
  }
  const category = new Category({ name, description });
  const saveCategory = await category.save();
  res.json(new ApiResponse(201, saveCategory, "Category created successful"));
});

// @desc Get all categories
// GET /api/v1/category
export const getAllCategory = asyncHandler(async (req, res) => {
  const category = await Category.find();
  if (!category) {
    throw new ApiError(404, "Category not found");
  }
  res.json(new ApiResponse(200, category, "Get all categories successful"));
});

//@desc Get single Category
// GET /api/v1/category/:id
export const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  res.json(new ApiResponse(200, category, "Get category successful"));
});

// @desc Update category
// PUT /api/v1/category/:id
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const category = await Category.findById(id);
  if (!category) {
    throw new ApiError(404, "Category not found");
  }
  category.name = name || category.name;
  category.description = description || category.description;
  const updatedCategory = await category.save();

  res.json(
    new ApiResponse(200, updatedCategory, "Category created successful")
  );
});

//@desc Delete Category
// DELETE /api/v1/category/:id
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  res.json(new ApiResponse(200, category, "Category deleted successful"));
});
