import express from "express";
import {
  addToCart,
  updateCart,
  getUserCart,
  mergeCartOnLogin,
} from "../controllers/cartController.js";
import authUser from "../middleware/authUser.js";

const cartRouter = express.Router();

cartRouter.post("/add", authUser, addToCart);
cartRouter.put("/update", authUser, updateCart);
cartRouter.get("/user-cart", authUser, getUserCart);

//! ---------------- for non logged in or guest users --------------------- //
cartRouter.post("/guest/merge", authUser, mergeCartOnLogin);

export default cartRouter;
