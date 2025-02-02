import express from "express";
import {
  placeOrder,
  placeOrderRazorPay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateOrderStatus,
  verifyStripePayment,
  verifyRazorPayemnt,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/authUser.js";

const orderRouter = express.Router();

//admin features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/update-status", adminAuth, updateOrderStatus);

//payment features
orderRouter.post("/place-order", authUser, placeOrder);
orderRouter.post("/create-stripe-session", authUser, placeOrderStripe);
orderRouter.post("/create-razorpay-order", authUser, placeOrderRazorPay);

//user features
orderRouter.get("/user-orders", authUser, userOrders);

//verify stripe payment
orderRouter.post("/verify-stripe-order", authUser, verifyStripePayment);
orderRouter.post("/verify-razorpay", authUser, verifyRazorPayemnt);

export default orderRouter;
