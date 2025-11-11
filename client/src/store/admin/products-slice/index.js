import axiosInstance from "@/helpers/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  isLoading: false,
  productList: [
    { id: 1, name: "iPhone 15", price: 79999, category: "Mobile" },
    { id: 2, name: "Samsung S24", price: 74999, category: "Mobile" },
  ],
};

// Add Product
export const addNewProduct = createAsyncThunk(
  "adminProducts/addNewProduct",
  async (formData) => {
    try {
      const res = await axiosInstance.post("/api/admin/products", formData);
      // Return only the data (new product)
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Update Product
export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({ id, updatedData }) => {
    try {
      const res = await axiosInstance.put(`/api/admin/products/${id}`, updatedData);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id) => {
    try {
      await axiosInstance.delete(`/api/admin/products/${id}`);
      return id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Slice
const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList.push(action.payload); // action.payload is the new product object
      })
      .addCase(addNewProduct.rejected, (state) => {
        state.isLoading = false;
      })

      // Update
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedProduct = action.payload;
        state.productList = state.productList.map((p) =>
          p.id === updatedProduct.id ? updatedProduct : p
        );
      })
      .addCase(updateProduct.rejected, (state) => {
        state.isLoading = false;
      })

      // Delete
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = state.productList.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default AdminProductsSlice.reducer;
