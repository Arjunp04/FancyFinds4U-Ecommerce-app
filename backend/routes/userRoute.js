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
  adminDashboardStats,
  verifyTokenValidity,
} from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import adminAuth from "../middleware/adminAuth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/verify-token", verifyTokenValidity);
userRouter.post("/forgot-password", forgotPasswordUser);
userRouter.post("/reset-password", resetPasswordUser);

userRouter.get("/profile", authUser, getUserProfile);
userRouter.put("/update-email", authUser, updateEmail);
userRouter.delete("/account", authUser, deleteUserAccount);

// ---------------admin routes -----------------//
userRouter.post("/admin", adminLogin);
userRouter.get("/admin/stats", adminAuth, adminDashboardStats);

export default userRouter;
