import Product from "../models/product.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc Get all products
// @route GET /api/v1/products
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate("category", "name");
  res.json(new ApiResponse(200, products, "Successful"));
});

// @desc Create product
// @route POST /api/v1/products
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, category } = req.body;

  if (!name || !price) {
    throw new ApiError(400, "Name and Price are required");
  }
  const product = new Product({ name, description, price, stock, category });
  const saveProduct = await product.save();

  res.json(new ApiResponse(201, saveProduct, "Product created successful"));
});

// @desc Get single product
// @route GET /api/v1/products/:id
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("category", "name");
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  res.json(new ApiResponse(200, product, "Successful"));
});

// @desc Update product
// @route PUT /api/v1/products/:id
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, category } = req.body;
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.stock = stock || product.stock;
  product.category = category || product.category;

  const updateProduct = await product.save();
  if (!updateProduct) {
    throw new ApiError(500, "Product update failed");
  }
  res.json(new ApiResponse(200, updateProduct, "Product updated successfully"));
});

// @desc Delete product
// @route DELETE /api/v1/products/:id
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  res.json(new ApiResponse(200, product, "Product deleted Successfully"));
});
