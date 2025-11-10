import { Router } from 'express';
import { createProduct, deleteProduct, editProduct, getProducts } from '../../controller/admin/product.controller.js';
import upload from '../../middleware/multer.middleware.js';
import { getCategoryById,deleteCategory,createCategory,getAllCategories,updateCategory } from '../../controller/admin/category.controller.js';
import { createSubCategory, deleteSubCategory, getAllSubCategories, getSubCategoryById, updateSubCategory } from '../../controller/admin/subCategory.controller.js';

const router = Router();

router.route('/products')
.post(upload.array('images', 5), createProduct)
.get(getProducts);

router.route('/products/:id')
.put(upload.array('images', 5), editProduct)
.delete(deleteProduct);


router.route('/categories')
.get(getAllCategories)
.post(createCategory);

router.route('/categories/:id')
.get(getCategoryById)
.put(updateCategory)
.delete(deleteCategory);


router.route('/subcategories')
.get(getAllSubCategories)
.post(createSubCategory);

router.route('/subcategories/:id')
.get(getSubCategoryById)
.put(updateSubCategory)
.delete(deleteSubCategory);

export default router;
