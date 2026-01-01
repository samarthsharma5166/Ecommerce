import { prisma } from "../../db/db.js";
import jwt from 'jsonwebtoken'

// controller that return category with all its subcategories

export const getCategoriesWithSubcategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                subCategories: true,
            },
        });

        res.status(200).json({
            success: true,
            message: 'Categories with subcategories fetched successfully',
            categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}

export const getFilteredProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const { category, sortedBy } = req.query;
        console.log(category, sortedBy)
        const where = {};
        const orderBy = {};

        if (category) {
            try {
                const categoryIds = JSON.parse(category);
                if (Array.isArray(categoryIds) && categoryIds.length > 0) {
                    where.subCategoryId = { in: categoryIds };
                }
            } catch (error) {
                console.error("Failed to parse category filter:", error);
            }
        }

        if (sortedBy) {
            switch (sortedBy) {
                case "price-lowtohigh":
                    orderBy.price = "asc";
                    break;
                case "price-hightolow":
                    orderBy.price = "desc";
                    break;
                case "title-atoz":
                    orderBy.title = "asc";
                    break;
                case "title-ztoa":
                    orderBy.title = "desc";
                    break;
                default:
                    orderBy.createdAt = "desc";
            }
        } else {
            orderBy.createdAt = "desc";
        }

        const products = await prisma.product.findMany({
            skip,
            take: limit,
            where,
            include: { subCategory: true },
            orderBy,
        });

        const totalProducts = await prisma.product.count({
            where,
        });

        const totalPages = Math.ceil(totalProducts / limit);

        return res.status(200).json({
            success: true,
            message: "Filtered products fetched successfully",
            products,
            page,
            totalPages,
            totalProducts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const getProductDetails = async (req, res) => {
    try {
        const {id} = req.params;

        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                variants: true,
                info: true,
                subCategory: true,
                reviews: {
                    include: {
                        user: true
                    }
                }
            }
        });


        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        return res.status(200).json({
            success: true,  
            message: "Product fetched successfully",
            product
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        })
    }
}