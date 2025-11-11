import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductsSlice from "./admin/products-slice";
import AdminCategorySlice from "./admin/category-slice"; // ✅

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice,
    adminCategory: AdminCategorySlice, // ✅
  },
});

export default store;
