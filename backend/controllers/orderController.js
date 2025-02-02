import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import Razorpay from "razorpay";

const currency = "inr";
const deliveryCharge = 10;

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ********* placing order using cod ************** //
const placeOrder = async (req, res) => {
  try {
    const { userId, amount, items, address } = req.body;
    console.log(req.body);

    const orderData = {
      userId,
      amount,
      items,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    //clearing the cart data once order is placed
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ********* placing order using stripe ************** //

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, amount, items, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      amount,
      items,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({
      success: true,
      message: "Stripe checkout session created",
      session_url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// verify the stripe payment
const verifyStripePayment = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({
        success: true,
        message: "Order verified",
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.josn({
        success: false,
        message: "Order payment failed .verified from stripe",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ********* placing order using razorpay ************** //

const placeOrderRazorPay = async (req, res) => {
  try {
    const { userId, amount, items, address } = req.body;

    const orderData = {
      userId,
      amount,
      items,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };

    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// verify razorpay payment

const verifyRazorPayemnt = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({
        success: true,
        message: "Order payment successful",
      });
    } else {
      res.json({
        success: false,
        message: "Order payment failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ******** all orders data for admin panel ********** //
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    // Reverse the orders array
    const reversedOrders = orders.reverse();

    res.json({
      success: true,
      message: "All orders data fetched successfully",
      orders: reversedOrders,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ******** user orders data for frontend ********** //

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });

    res.json({
      success: true,
      message: "User orders data fetched successfully",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ******** update orders status from admin panel ********** //

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({
      success: true,
      message: "Order status updated",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderRazorPay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateOrderStatus,
  verifyStripePayment,
  verifyRazorPayemnt,
};
