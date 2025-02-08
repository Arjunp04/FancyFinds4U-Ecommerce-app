import express from "express";
import {
  loginUser,
  registerUser,
  forgotPasswordUser,
  adminLogin,
  resetPasswordUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPasswordUser);
userRouter.post("/reset-password", resetPasswordUser);
userRouter.post("/admin", adminLogin);

export default userRouter;
