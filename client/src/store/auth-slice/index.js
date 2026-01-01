import axiosInstance from "@/helpers/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔹 Initial Redux state
const initialState = {
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false, // 🚀 Always false initially
  user: JSON.parse(localStorage.getItem("user")) || null,
  address: [],
  isLoading: false,
  message: "",
  error: "",
};


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

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await axiosInstance.post("/auth/logout");
  } catch (error) {
    console.error("Logout failed:", error);
  }

  localStorage.removeItem("user");
  localStorage.removeItem("isAuthenticated");
  return true;
});

export const fetchAddress = createAsyncThunk(
  "auth/fetchAddress",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/user/address");
      return res.data;
    } catch (err) {
      return rejectWithValue({ success: false, message: err.message });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUserFromStorage: state => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        state.isAuthenticated = true;
        state.user = user;
      }
    },
    addAddress: (state, action) => {
      state.address.push(action.payload);
    }
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
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("isAuthenticated", JSON.stringify(action.payload.success));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(logout.fulfilled, state => {
        state.isAuthenticated = false;
        state.user = null;
        localStorage.clear();
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.address = action.payload.address;
      })
  }
});

export const { loadUserFromStorage, addAddress } = authSlice.actions;
export default authSlice.reducer;