import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoryApi";

export const loadCategories = createAsyncThunk("categories/load", async () => {
  const { data } = await fetchCategories();
  return data?.data;
});
export const addCategory = createAsyncThunk(
  "categories/add",
  async (payload) => {
    const { data } = await createCategory(payload);
    return data?.data;
  }
);

export const editCategory = createAsyncThunk(
  "categories/edit",
  async ({ id, payload }) => {
    const { data } = await updateCategory(id, payload);
    return data?.data;
  }
);

export const removeCategory = createAsyncThunk(
  "categories/remove",
  async (id) => {
    await deleteCategory(id);
    return id;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addCategory.fulfilled, (s, a) => {
        s.items.push(a.payload);
      })
      .addCase(editCategory.fulfilled, (s, a) => {
        const idx = s.items.findIndex((p) => p._id === a.payload._id);
        if (idx !== -1) s.items[idx] = a.payload;
      })
      .addCase(removeCategory.fulfilled, (s, a) => {
        s.items = s.items.filter((p) => p._id !== a.payload);
      });
  },
});

export default categorySlice.reducer;
