import asyncHandler from "express-async-handler";
import {prisma} from "../../db/db.js";
import fs from "fs";
import path from "path";

export const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, subCategoryId } = req.body;

  if (!title || !description || !price || !subCategoryId) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const images = req.files.map((file) => file.path);

  const product = await prisma.product.create({
    data: {
      title,
      description,
      price: parseFloat(price),
      images,
      subCategoryId,
    },
  });

  res.status(201).json({
    message: "Product created successfully",
    product,
  });
});

export const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const products = await prisma.product.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalProducts = await prisma.product.count();
  const totalPages = Math.ceil(totalProducts / limit);

  res.status(200).json({
    products,
    page,
    totalPages,
    totalProducts,
  });
});

export const editProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, price, subCategoryId } = req.body;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (req.files && req.files.length > 0) {
    product.images.forEach((imagePath) => {
      fs.unlink(path.resolve(imagePath), (err) => {
        if (err) {
          console.error(`Failed to delete image: ${imagePath}`, err);
        }
      });
    });
  }

  const images =
    req.files && req.files.length > 0
      ? req.files.map((file) => file.path)
      : product.images;

  const updatedProduct = await prisma.product.update({
    where: {
      id,
    },
    data: {
      title: title || product.title,
      description: description || product.description,
      price: price ? parseFloat(price) : product.price,
      images,
      subCategoryId: subCategoryId || product.subCategoryId,
    },
  });

  res.status(200).json({
    message: "Product updated successfully",
    updatedProduct,
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
        where: {
            id,
        },
    });

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    product.images.forEach((imagePath) => {
        fs.unlink(path.resolve(imagePath), (err) => {
            if (err) {
                console.error(`Failed to delete image: ${imagePath}`, err);
            }
        });
    });

    await prisma.product.delete({
        where: {
            id,
        },
    });

    res.status(200).json({
        message: "Product deleted successfully",
    });
});