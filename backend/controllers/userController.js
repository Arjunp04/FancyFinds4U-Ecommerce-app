import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/ProductModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "12h" });
};

// ----------------- user login -------------------//
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User does not exists",
      });
    }

    const pswdMatch = await bcrypt.compare(password, user.password);
    if (pswdMatch) {
      const token = createToken(user._id);
      res.json({
        success: true,
        token,
        message: "Login successful",
      });
    } else {
      res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ----------------- user register ---------------//
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //---------- checking whether user exists or not with this email -----------//
    const existsUser = await userModel.findOne({ email });
    if (existsUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // ---------- validating user's email and password ------------ //
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ----------------------- forgot password -------------------------//

const forgotPasswordUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate Reset Token
    const resetToken = createToken(user._id);
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour validity

    await user.save();

    // Ideally, send an email here (not implemented)
    res.json({
      success: true,
      message: "Reset link sent to your email.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//-------------------- reset password ----------------------//
const resetPasswordUser = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword)
      return res.status(400).json({ message: "All fields are required" });

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (
      !user ||
      user.resetToken !== token ||
      Date.now() > user.resetTokenExpiry
    ) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear reset token after successful password reset
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.json({ success: true, message: "Password reset successful!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//---------------------- admin login ------------------------------//

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Create a base64-encoded token payload
      const payload = Buffer.from(email + password).toString("base64");

      // Sign the payload with the secret key
      const adminToken = jwt.sign(
        { data: payload }, // Wrap the payload in an object
        process.env.JWT_SECRET,
        {
          expiresIn: "12h", // Token expires in 1 hour
        }
      );

      res.status(200).json({
        success: true,
        message: "Admin logged in successfully",
        adminToken,
      });
    } else {
      res.status(403).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({
      success: true,
      message: "User Profile fetched successfully",
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateEmail = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.email = req.body.email;
    await user.save();
    res.json({ success: true, message: "Email updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUserAccount = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Delete the user
    const userDeleted = await userModel
      .findByIdAndDelete(userId)
      .session(session);

    if (!userDeleted) {
      await session.abortTransaction();
      return res.status(404).json({ message: "User not found" });
    }

    await session.commitTransaction();
    res.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: "Server error", error: error.message });
  } finally {
    session.endSession();
  }
};

//  ---------------------admin dashbaord stats ---------------//

const adminDashboardStats = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const totalOrders = await orderModel.countDocuments();
    const totalProducts = await productModel.countDocuments();

    res.status(200).json({
      success: true,
      message: "All admin statistics fetched successfully",
      totalUsers,
      totalOrders,
      totalProducts,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const verifyTokenValidity = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
      tokenExpired: true,
    });
  }

  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({
        success: false,
        tokenExpired: true,
        message: "Token expired or invalid",
      });
    }

    res.json({ success: true, userId: decoded.id });
  });
};

export {
  loginUser,
  registerUser,
  adminLogin,
  forgotPasswordUser,
  resetPasswordUser,
  getUserProfile,
  deleteUserAccount,
  updateEmail,
  adminDashboardStats,
  verifyTokenValidity,
};
