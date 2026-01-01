import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import  AdminProductsSlice from "./admin/products-slice";
import categoryReducer from "./admin/category-slice";
import subCategoryReducer from "./admin/subcategory-slice";
import listingReducer from "./listing/categories";
import prouductListingReducer from "./listing/prouductSlice.js";


const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts:  AdminProductsSlice,
    categories: categoryReducer,
    subCategories: subCategoryReducer,
    listing: listingReducer,
    products: prouductListingReducer,
  },
});

export default store;
