import axiosInstance from "@/helpers/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  subCategories: [],
  error: null,
};

export const getAllSubCategories = createAsyncThunk(
  "subCategories/getSubCategories",
  async () => {
    const res = await axiosInstance.get("/admin/subcategories");
    return res.data.subCategories;
  }
);

export const addNewSubCategory = createAsyncThunk(
  "subCategories/addSubCategory",
  async (subCategoryData) => {
    const res = await axiosInstance.post("/admin/subcategories", subCategoryData);
    return res.data.subCategory;
  }
);

export const updateSubCategory = createAsyncThunk(
  "subCategories/updateSubCategory",
  async ({ id, updatedData }) => {
    const res = await axiosInstance.put(
      `/admin/subcategories/${id}`,
      updatedData
    );
    return res.data.subCategory;
  }
);

export const deleteSubCategory = createAsyncThunk(
  "subCategories/deleteSubCategory",
  async (id) => {
    await axiosInstance.delete(`/admin/subcategories/${id}`);
    return id;
  }
);

const subCategorySlice = createSlice({
  name: "subCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSubCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSubCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subCategories = action.payload;
      })
      .addCase(getAllSubCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addNewSubCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewSubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subCategories.push(action.payload);
      })
      .addCase(addNewSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateSubCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedSubCategory = action.payload;
        state.subCategories = state.subCategories.map((subCategory) =>
          subCategory.id === updatedSubCategory.id
            ? updatedSubCategory
            : subCategory
        );
      })
      .addCase(updateSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteSubCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subCategories = state.subCategories.filter(
          (subCategory) => subCategory.id !== action.payload
        );
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default subCategorySlice.reducer;
