import express from "express";
import {
  addProduct,
  listProducts,
  singleProduct,
  removeProduct,
  updateProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.get("/list-all-products", listProducts);
productRouter.get("/:productId", singleProduct);
productRouter.delete("/:id", adminAuth, removeProduct);
productRouter.put(
  "/update/:id",
  adminAuth,
  upload.fields([
    { name: "newImage1", maxCount: 1 },
    { name: "newImage2", maxCount: 1 },
    { name: "newImage3", maxCount: 1 },
    { name: "newImage4", maxCount: 1 },
  ]),
  updateProduct
);

export default productRouter;
