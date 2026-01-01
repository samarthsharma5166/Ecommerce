import asyncHandler from "express-async-handler";
import { prisma } from "../../db/db.js";
import fs from "fs";
import path from "path";

export const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, subCategoryId, variants, infos } = req.body;

  if (!title || !description || !price || !subCategoryId) {
    res.status(400);
    throw new Error("Missing fields");
  }

  const images = req.files?.map((file) => file.originalname) || [];

  const parsedVariants = variants ? JSON.parse(variants) : [];
  const parsedInfos = infos ? JSON.parse(infos) : [];

  const product = await prisma.product.create({
    data: {
      title,
      description,
      price: parseFloat(price),
      images,
      subCategoryId,
      variants: {
        create: parsedVariants, // [{ color:"Red", size:"M", stock:10 }]
      },
      info: {
        create: parsedInfos, // [{ key:"Fabric", value:"Cotton" }]
      },
    },
    include: { variants: true, info: true },
  });

  res.status(201).json({ message: "Product created", product });
});


export const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const products = await prisma.product.findMany({
    skip,
    take: limit,
    include: {
      subCategory:true
    },
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

  if(product.images.length >= 5 ) {
    return res.status(400).json({
      message: "Maximum of 5 images allowed per product",
    });
  }
  const newImages = req.files.map((file) => file.originalname);
  const images = [...product.images, ...newImages];

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

export const deleteProductImage = asyncHandler(async (req, res) => {
  const { productId, imageName } = req.body;

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (!product.images.includes(imageName)) {
    res.status(400);
    throw new Error("Image not found in product");
  }

  const updatedImages = product.images.filter((img) => img !== imageName);
  
  const __dirname = path.resolve();
  const imagePath = path.join(__dirname, "uploads", imageName);


  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error(`Failed to delete image: ${imageName}`, err);
    }
  });

  const updatedProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      images: updatedImages,
    },
  });

  res.status(200).json({
    success: true,
    message: "Image deleted successfully from product",
    updatedProduct,
  });
});