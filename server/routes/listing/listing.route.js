import express from 'express';
import { getCategoriesWithSubcategories, getFilteredProducts, getProductDetails } from '../../controller/listing/listing.controller.js';

const router = express.Router();

router.get("/filterListing", getCategoriesWithSubcategories);
router.get("/filteredProducts", getFilteredProducts);
router.get("/get/:id", getProductDetails)

export default router;