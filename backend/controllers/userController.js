import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// ----------------- user login ---------------//
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

const adminLogin = async (req, res) => {};

export { loginUser, registerUser, adminLogin };
