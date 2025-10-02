import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios";

export const login = createAsyncThunk(
  "auth/login",
  async ({ userName, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/user/login", {
        userName,
        password,
      });
      console.log(data);

      localStorage.setItem("token", data?.data?.token);
      localStorage.setItem("user", JSON.stringify(data?.data?.user));
      return data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload?.token;
        state.user = action.payload?.user;
      })
      .addCase(login.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
