import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slices/AuthSlice";
import productsReducer from "../features/products/slices/productsSlice";
import categoryReducer from "../features/categories/slice/categorySlice";
import billingReducer from "../features/billing/slices/billingSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    category: categoryReducer,
    billing: billingReducer,
  },
});

export const selectAuth = (state) => state.auth;
