import productModel from "../models/ProductModel.js";
import { v2 as cloudinary } from "cloudinary";

// ---------------- create and add product ----------------- //
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const imageUrls = [];

    for (const image of images) {
      const result = await cloudinary.uploader.upload(image.path, {
        folder: "products", // Cloudinary folder to store images
      });
      imageUrls.push(result.secure_url);
    }

    const productData = {
      name,
      description,
      category,
      subCategory,
      price: Number(price),
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imageUrls,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added" });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ------------- list all products function  -------------- //
const listProducts = async (req, res) => {
  try {
    const products = await productModel.aggregate([{ $sample: { size: 100 } }]); // Adjust size as needed
    res.json({
      success: true,
      message: "Fetched all products randomly",
      products,
    });
  } catch (error) {
    console.log("Error fetching products:", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};


// --------- single product product function  ------------ //
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productModel.findById(productId);
    res.json({ success: true, message: "product details fetched.", product });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ------------- remove/delete products function  -------------- //
const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Product removed." });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the product
    const product = await productModel.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      existingImages,
    } = req.body;

    if (!name || !description || !price || !category || !subCategory) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    price = Number(price);
    if (isNaN(price)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid price value" });
    }

    // ✅ Prevent JSON.parse error by checking if values exist
    sizes = sizes ? JSON.parse(sizes) : [];
    existingImages = existingImages ? JSON.parse(existingImages) : [];

    // Handle new image uploads
    const image1 = req.files?.newImage1?.[0];
    const image2 = req.files?.newImage2?.[0];
    const image3 = req.files?.newImage3?.[0];
    const image4 = req.files?.newImage4?.[0];

    const newImages = [image1, image2, image3, image4].filter(Boolean);
    const newImageUrls = [];

    for (const image of newImages) {
      const result = await cloudinary.uploader.upload(image.path, {
        folder: "products",
      });
      newImageUrls.push(result.secure_url);
    }

    // Combine existing images and newly uploaded ones
    const updatedImages = [...existingImages, ...newImageUrls];

    // Update product details
    product.name = name;
    product.description = description;
    product.price = Number(price);
    product.category = category;
    product.subCategory = subCategory;
    product.bestseller = bestseller === "true" ? true : false;
    product.sizes = sizes;
    product.image = updatedImages;

    await product.save();

    res.json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  addProduct,
  listProducts,
  singleProduct,
  removeProduct,
  updateProduct,
};
