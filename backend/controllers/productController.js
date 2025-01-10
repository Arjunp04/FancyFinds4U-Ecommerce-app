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

    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ------------- list all products function  -------------- //
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, message: "Fetched all products", products });
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    console.log(removed);
    res.json({ success: true, message: "Product removed." });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error,
    });
  }
};

export { addProduct, listProducts, singleProduct, removeProduct };
