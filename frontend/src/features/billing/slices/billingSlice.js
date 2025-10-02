import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/billingApi";

export const createBill = createAsyncThunk(
  "billing/createBill",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.generateBill(payload);
      return data; // expecting { billId, items, total, ... }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Billing failed");
    }
  }
);

const billingSlice = createSlice({
  name: "billing",
  initialState: { items: [], bill: null, loading: false, error: null },
  reducers: {
    addItem: (s, a) => {
      const existing = s.items.find((i) => i.productId === a.payload.productId);
      if (existing) {
        existing.qty += a.payload.qty;
      } else {
        s.items.push(a.payload);
      }
    },
    removeItem: (s, a) => {
      s.items = s.items.filter((i) => i.productId !== a.payload);
    },
    clearItems: (s) => {
      s.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBill.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(createBill.fulfilled, (s, a) => {
        s.loading = false;
        s.bill = a.payload;
        s.items = []; // clear cart after bill generated
      })
      .addCase(createBill.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export const { addItem, removeItem, clearItems } = billingSlice.actions;
export default billingSlice.reducer;
