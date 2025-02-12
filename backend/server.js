import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectToDB from "./config/connectDB.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// ------------------- App Config ------------------- //
const app = express();
const port = process.env.PORT || 4000;

// Connect to Database & Cloudinary
connectToDB();
connectCloudinary();

// ---------------- Middleware ---------------- //
app.use(express.json());

// ---------------------- CORS Handling -------------------- //
const corOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://fancyfinds4u.vercel.app",
    "https://fancyfinds4u-admin-panel.vercel.app/",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corOptions));

// ---------------- Routes ---------------- //
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Root Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server!" });
});

// ---------------- Start Server ---------------- //
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
