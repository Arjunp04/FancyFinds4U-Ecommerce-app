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

// ---------------------- CORS Handling -------------------- //
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_FRONTEND_URL,
];

// Dynamic CORS Middleware
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization","Origin"],
};

app.use(cors(corsOptions));

// Manually set CORS Headers for all requests
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// ---------------- Middleware ---------------- //
app.use(express.json());

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
