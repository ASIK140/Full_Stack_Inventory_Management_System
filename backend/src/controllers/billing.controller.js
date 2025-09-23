import Bill from "../models/billing.model.js";
import Product from "../models/product.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc Create bill
// POST /api/v1/bill
export const createBill = asyncHandler(async (req, res) => {
  const { customerName, items } = req.body;

  if (!customerName || !items) {
    throw new ApiError(400, "All fields are require");
  }
  let totalAmount = 0;
  for (const item of items) {
    const product = await Product.findById(item.productId);

    if (!product) {
      throw new ApiError(404, `Product not found: ${item.productId}`);
    }
    if (product.stock < item.quantity) {
      throw new ApiError(400, `Insufficient stock for ${product.name}`);
    }

    product.stock -= item.quantity;
    await product.save();
    item.priceAtBilling = product.price;
    totalAmount += item.quantity * product.price;
  }
  const bill = new Bill({ customerName, items, totalAmount });
  const newBill = await bill.save();
  res.json(new ApiResponse(201, newBill, "Bill created successful"));
});

// @desc Get All Bills
// @GET /api/v1/bill
export const getAllBill = asyncHandler(async (req, res) => {
  const bills = await Bill.find();
  if (!bills) {
    throw new ApiError(404, "Bill Not Found");
  }
  res.json(new ApiResponse(200, bills, "Get all bills successful"));
});

// @desc Get All Bills
// @GET /api/v1/bill
export const getBillById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const bill = await Bill.findById(id);
  if (!bill) {
    throw new ApiError(404, "Bill Not Found");
  }
  res.json(new ApiResponse(200, bill, "Get  Bill successful"));
});
