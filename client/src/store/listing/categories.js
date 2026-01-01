import axiosInstance from "@/helpers/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    isLoading: false,
    error: null,
}

export const fetchCategories = createAsyncThunk(
    'listing/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/shop/filterListing');
            return response.data.categories;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const categoriesFilterSlice = createSlice({
    name: 'categories',
    initialState,           
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;            
            })            
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }            
});

export default categoriesFilterSlice.reducer;
