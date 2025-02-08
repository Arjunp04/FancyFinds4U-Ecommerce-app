import express from "express";
import {
  loginUser,
  registerUser,
  forgotPasswordUser,
  adminLogin,
  resetPasswordUser,
  getUserProfile,
  updateEmail,
  deleteUserAccount,
} from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPasswordUser);
userRouter.post("/reset-password", resetPasswordUser);

userRouter.get("/profile", authUser, getUserProfile);
userRouter.put("/update-email", authUser, updateEmail);
userRouter.delete("/account", authUser, deleteUserAccount);
userRouter.post("/admin", adminLogin);

export default userRouter;
