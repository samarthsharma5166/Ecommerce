import axiosInstance from "@/helpers/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// 🔹 Register User (LocalStorage)
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/register", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue({ success: false, message: err.message });
    }
  }
);

// 🔹 Login User (LocalStorage)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue({ success: false, message: err.message });
    }
  }
);

// 🔹 Initial Redux state
const initialState = {
  isAuthenticated: false, // 🚀 Always false initially
  user: null,
  isLoading: false,
  message: "",
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: state => {
      localStorage.removeItem("user");
      state.isAuthenticated = false;
      state.user = null;
    },
    loadUserFromStorage: state => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        state.isAuthenticated = true;
        state.user = user;
      }
    },
  },
  extraReducers: builder => {
    builder
      // Register
      .addCase(registerUser.pending, state => { state.isLoading = true; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.error = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })

      // Login
      .addCase(loginUser.pending, state => { state.isLoading = true; })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.user;
        state.message = action.payload.message;
        state.error = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  }
});

export const { logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
