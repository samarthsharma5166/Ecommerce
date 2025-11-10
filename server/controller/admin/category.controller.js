import asyncHandler from 'express-async-handler';
import prisma from '../../db/db.js';

export const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
        res.status(400);
        throw new Error('Category name is required');
    }

    const existingCategory = await prisma.category.findUnique({ where: { name } });
    if (existingCategory) {
        res.status(409); // Conflict
        throw new Error('Category with this name already exists');
    }

    const category = await prisma.category.create({
        data: {
            name,
        },
    });

    res.status(201).json(category);
});


export const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await prisma.category.findMany({
        include: {
            subCategories: true,
        },
    });
    res.status(200).json(categories);
});


export const getCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
        where: { id },
        include: {
            subCategories: true,
        },
    });

    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    res.status(200).json(category);
});


export const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const category = await prisma.category.findUnique({ where: { id } });

    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    const updatedCategory = await prisma.category.update({
        where: { id },
        data: { name },
    });

    res.status(200).json(updatedCategory);
});

export const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
        where: { id },
        include: { subCategories: true },
    });

    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    if (category.subCategories.length > 0) {
        res.status(409); // Conflict
        throw new Error('Cannot delete category. It has associated sub-categories.');
    }

    await prisma.category.delete({ where: { id } });
    res.status(204).send();
});
