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

// ------------------- app config ------------------ //

//CREATING INSTANCE OF EXPPRESS PACKAGE
const app = express();
const port = process.env.PORT || 4000;
connectToDB();
connectCloudinary();

// ---------------------- middlewares --------------------//

app.use(express.json());
// CORS Middleware
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

//----------------  api endpoints --------------------//

app.get("/", (req, res) => {
  res.json("welcome to server");
});

app.listen(port, () => {
  console.log(`Server running on ${`http://localhost:${port}`}`);
});
