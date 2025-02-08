import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
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
    console.log(error);
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
    console.log(error);
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

export {
  loginUser,
  registerUser,
  adminLogin,
  forgotPasswordUser,
  resetPasswordUser,
};
