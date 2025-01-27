import userModel from "../models/userModel.js";

// ------------- add products to cart  -------------- //

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // Initialize cartData if undefined
    let cartData = userData.cartData || {};

    // Ensure cartData[itemId] exists as an object
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    // Update the size quantity
    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1; // Increment quantity
    } else {
      cartData[itemId][size] = 1; // Initialize quantity
    }

    // Update the user's cartData in the database
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ------------- update cart  -------------- //
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // Ensure cartData is not null or undefined

    if (!cartData[itemId]) {
      cartData[itemId] = {}; // Initialize the item if it doesn't exist
    }

    cartData[itemId][size] = quantity; // Update the specific size with the new quantity

    // Save the updated cart data to the database
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart Updated" }); // Send the response
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message }); // Send error response
  }
};

// ------------- get cart details of user  -------------- //
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    res.json({ success: true, message: "Cart data", cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
