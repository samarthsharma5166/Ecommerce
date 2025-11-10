
import {prisma} from "../../db/db.js";

// Create a new subcategory
export const createSubCategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const subCategory = await prisma.subCategory.create({
      data: {
        name,
        category: { connect: { id: categoryId } },
      },
    });
    res.status(201).json(subCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all subcategories
export const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await prisma.subCategory.findMany();
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single subcategory by ID
export const getSubCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = await prisma.subCategory.findUnique({
      where: { id: parseInt(id) },
    });
    if (!subCategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a subcategory
export const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId } = req.body;
    const subCategory = await prisma.subCategory.update({
      where: { id: parseInt(id) },
      data: {
        name,
        category: { connect: { id: categoryId } },
      },
    });
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a subcategory
export const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.subCategory.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
