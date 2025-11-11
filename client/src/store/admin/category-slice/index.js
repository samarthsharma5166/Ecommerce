import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  categoryList: [
    { id: 1, name: "Shirts" },
    { id: 2, name: "Pants" },
  ],
  loading: false,
};

// Thunks
export const getAllCategories = createAsyncThunk("category/getAll", async () => {
  return initialState.categoryList;
});

export const addNewCategory = createAsyncThunk("category/add", async (newCat) => {
  return { id: Date.now(), ...newCat };
});

export const updateCategory = createAsyncThunk("category/update", async ({ id, updatedData }) => {
  return { id, ...updatedData };
});

export const deleteCategory = createAsyncThunk("category/delete", async (id) => id);

// Slice
const categorySlice = createSlice({
  name: "adminCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categoryList = action.payload;
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.categoryList.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categoryList = state.categoryList.map((cat) =>
          cat.id === action.payload.id ? action.payload : cat
        );
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categoryList = state.categoryList.filter((cat) => cat.id !== action.payload);
      });
  },
});

export default categorySlice.reducer;
