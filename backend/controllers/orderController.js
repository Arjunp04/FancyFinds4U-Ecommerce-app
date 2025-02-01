import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

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
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ********* placing order using razorpay ************** //

const placeOrderRazorPay = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ******** all orders data for admin panel ********** //

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, message: "All orders data fetched successfully",orders });
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
};
