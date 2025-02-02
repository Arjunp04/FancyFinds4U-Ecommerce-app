import React, { useContext, useState, useEffect } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../context/Shopcontext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
    navigate,
    loading,
    setLoading,
  } = useContext(ShopContext);

  const location = useLocation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const initiateRazorPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/order/verify-razorpay`,
            response,
            {
              headers: {
                token: token,
              },
            }
          );
          if (data.success) {
            navigate("/orders");
            setCartItems({});
          }
        } catch (error) {
          console.log(error);
          toast.error(error);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    console.log(rzp);
    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading (disable button)

    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      let response;
      switch (method) {
        case "cod":
          response = await axios.post(
            `${backendUrl}/api/order/place-order`,
            orderData,
            {
              headers: { token: token },
            }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          responseStripe = await axios.post(
            `${backendUrl}/api/order/create-stripe-session`,
            orderData,
            {
              headers: { token: token },
            }
          );
          if (responseStripe.data.success) {
            window.location.replace(responseStripe.data.session_url);
          } else {
            toast.error(
              responseStripe.data.message || "Failed to initiate Stripe payment"
            );
          }
          break;

        case "razorpay":
          const responseRazorpay = await axios.post(
            `${backendUrl}/api/order/create-razorpay-order`,
            orderData,
            {
              headers: { token: token },
            }
          );
          if (responseRazorpay.data.success) {
            initiateRazorPay(responseRazorpay.data.order);
          } else {
            toast.error("Failed to initiate Razorpay payment");
          }
          break;

        default:
          break;
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // End loading state
    }
  };

  // Reset `loading` state when the route changes
  useEffect(() => {
    setLoading(false);
  }, [location.pathname]);

  return (
    <div>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]"
      >
        {/* Left Side - Delivery Information */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
          <div className="text-xl sm:text-2xl my-3">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="First Name"
              onChange={handleChange}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Last Name"
              onChange={handleChange}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              required
            />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Your email address"
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
          <input
            type="text"
            name="street"
            value={formData.street}
            placeholder="Street"
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
          <div className="flex gap-3">
            <input
              type="text"
              name="city"
              value={formData.city}
              placeholder="City"
              onChange={handleChange}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              required
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              placeholder="State"
              onChange={handleChange}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              required
            />
          </div>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            placeholder="Phone"
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
        </div>

        {/* Right Side - Payment Method */}
        <div className="mt-8">
          <CartTotal />
          <div className="mt-12">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
            <div className="flex flex-col lg:flex-row gap-3">
              <div
                onClick={() => setMethod("stripe")}
                className={`flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer ${
                  method === "stripe" && "bg-gray-100"
                }`}
              >
                <p
                  className={`w-4 h-4 border border-gray-300 rounded-full ${
                    method === "stripe" ? "bg-green-500" : ""
                  }`}
                ></p>
                <img src={assets.stripe_logo} alt="" className="mx-4 h-5" />
              </div>
              <div
                onClick={() => setMethod("razorpay")}
                className={`flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer ${
                  method === "razorpay" && "bg-gray-100"
                }`}
              >
                <p
                  className={`w-4 h-4 border border-gray-300 rounded-full ${
                    method === "razorpay" ? "bg-green-500" : ""
                  }`}
                ></p>
                <img src={assets.razorpay_logo} alt="" className="mx-4 h-5" />
              </div>
              <div
                onClick={() => setMethod("cod")}
                className={`flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer ${
                  method === "cod" && "bg-gray-100"
                }`}
              >
                <p
                  className={`w-4 h-4 border border-gray-300 rounded-full ${
                    method === "cod" ? "bg-green-500" : ""
                  }`}
                ></p>
                <p className="text-gray-500 text-sm mx-4 font-medium">
                  CASH ON DELIVERY
                </p>
              </div>
            </div>

            <div className="w-full text-end mt-8">
              <button
                type="submit"
                className="bg-black text-white px-16 py-3 text-sm disabled:opacity-50"
                disabled={loading}
              >
                PLACE YOUR ORDER
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
