import axiosInstance from "@/helpers/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Dummy API delay function (frontend only)
// const fakeApi = (data) =>
//   new Promise((resolve) => {
//     setTimeout(() => resolve(data), 500);
//   });

// ✅ Initial State
const initialState = {
  isLoading: false,
  productList: [
    { id: 1, name: "iPhone 15", price: 79999, category: "Mobile" },
    { id: 2, name: "Samsung S24", price: 74999, category: "Mobile" },
  ],
};

//
// ✅ Add Product (Dummy API)
//
export const addNewProduct = createAsyncThunk("/products/addnewproduct",async (formData) => {
  const res = await axiosInstance.post("/api/admin/products", formData);
    return res;
  }
);


//
// ✅ Update Product (Dummy API)
//
export const updateProduct = createAsyncThunk(
  "/products/updateproduct",
  async ({ id, updatedData }) => {
    const updatedProduct = {
      id,
      ...updatedData,
    };

    const result = await fakeApi(updatedProduct);
    return result;
  }
);

//
// ✅ Delete Product (Dummy API)
//
export const deleteProduct = createAsyncThunk(
  "/products/deleteproduct",
  async (id) => {
    await fakeApi(true);
    return id;
  }
);


//
// ✅ Slice
//
const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ✅ ADD
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList.push(action.payload);
      })
      .addCase(addNewProduct.rejected, (state) => {
        state.isLoading = false;
      })

      // ✅ UPDATE
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedProduct = action.payload;

        state.productList = state.productList.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
      })
      .addCase(updateProduct.rejected, (state) => {
        state.isLoading = false;
      })

      // ✅ DELETE
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const deleteId = action.payload;

        state.productList = state.productList.filter(
          (product) => product.id !== deleteId
        );
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default AdminProductsSlice.reducer;
