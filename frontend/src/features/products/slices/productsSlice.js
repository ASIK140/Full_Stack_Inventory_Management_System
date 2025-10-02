import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productsApi";

export const loadProducts = createAsyncThunk("products/load", async () => {
  const { data } = await fetchProducts();
  return data?.data;
});
export const addProduct = createAsyncThunk("products/add", async (payload) => {
  const { data } = await createProduct(payload);
  return data?.data;
});

export const editProduct = createAsyncThunk(
  "products/edit",
  async ({ id, payload }) => {
    const { data } = await updateProduct(id, payload);
    return data?.data;
  }
);

export const removeProduct = createAsyncThunk("products/remove", async (id) => {
  await deleteProduct(id);
  return id;
});

const productsSlice = createSlice({
  name: "products",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addProduct.fulfilled, (s, a) => {
        const product = a.payload;
        const cat = s.categories?.find((c) => c._id === product.category);
        if (cat) product.category = cat;
        s.items.push(product);
      })

      .addCase(editProduct.fulfilled, (s, a) => {
        const idx = s.items.findIndex((p) => p._id === a.payload._id);
        if (idx !== -1) s.items[idx] = a.payload;
      })
      .addCase(removeProduct.fulfilled, (s, a) => {
        s.items = s.items.filter((p) => p._id !== a.payload);
      });
  },
});

export default productsSlice.reducer;
