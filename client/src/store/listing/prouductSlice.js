import axiosInstance from "@/helpers/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    products: [],
    error: null,
    totalPages: 1,
    currentPage: 1,
    totalProducts: 0,
    currentEdited: null,
    categoriesFilter:[],
    sortFilter: "",
    productDetail:null
}

// prouductSlice.js

export const getFilterProducts = createAsyncThunk(
  "products/getProducts",
  async ({ page = 1, limit = 10, category, sortedBy }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({
        page,
        limit,
      });

      if (category) {
        params.append('category', category);
      }
      if (sortedBy) {
        params.append('sortedBy', sortedBy);
      }

      // The final URL will be clean, e.g., /shop/filteredProducts?page=1&limit=10&category=["id1"]
      const response = await axiosInstance.get(
        `/shop/filteredProducts?${params.toString()}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const getProductDetail = createAsyncThunk("products/getProductDetail", async(data)=>{
  try{
    const {id} = data;
    console.log(id)
    const res = await axiosInstance.get(`/shop/get/${id}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

const productFilterSlice = createSlice({
    name: 'categories',
    initialState,           
    reducers: {
      setCategoriesFilter(state, action) {
        const id = action.payload.id;
        const exists = state.categoriesFilter.find(cat => cat.id === id);

        if (exists) {
          // remove it
          state.categoriesFilter = state.categoriesFilter.filter(cat => cat.id !== id);
        } else {
          // add it
          state.categoriesFilter.push({ id });
        }
      },
      setSortFilter(state, action) {
        state.sortFilter = action.payload;
      }
    },
    

    extraReducers: (builder) => {
        builder
             builder
                 .addCase(getFilterProducts.pending, (state) => {
                    state.isLoading = true;
                  })
                 .addCase(getFilterProducts.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.products = action.payload.products;
                    state.totalPages = action.payload.totalPages;
                    state.currentPage = action.payload.page;
                    state.totalProducts = action.payload.totalProducts;
                  })
                 .addCase(getFilterProducts.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                  })
               .addCase(getProductDetail.pending, (state) => {
                    state.isLoading = true;
                  })
               .addCase(getProductDetail.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.productDetail = action.payload.product;
                  })
               .addCase(getProductDetail.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                  });
    }   
  
});



export default productFilterSlice.reducer;
export const { setCategoriesFilter, setSortFilter } = productFilterSlice.actions;
