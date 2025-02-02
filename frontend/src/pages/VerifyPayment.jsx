import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/Shopcontext";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios"

const VerifyPayment = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/verify-stripe-order`,
        { success, orderId },
        {
          headers: {
            token: token,
          },
        }
        );
        console.log(response)
      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "An error occurred while verifying payment."
      );
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div>Verifying Payment...</div>;
};

export default VerifyPayment;
