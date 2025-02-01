import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../assets/admin_assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        {
          headers: {
            adminToken: token,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message || "Failed to fetch orders.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch all orders.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const statusHandler = async (e, orderId) => {
    const newStatus = e.target.value; // Get the selected status value

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/update-status`, // API endpoint to update order status
        { orderId, status: newStatus },
        {
          headers: {
            adminToken: token,
          },
        }
      );

      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated successfully!");
      } else {
        toast.error(response.data.message || "Failed to update order status.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order status.");
    }
  };

  return (
    <div className="w-full max-w-6xl">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        📦 Order Details
      </h2>

      {orders.length > 0 ? (
        <div className="grid gap-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className=" bg-white shadow-md border border-gray-200 rounded-lg p-5 transition duration-300 hover:shadow-lg"
            >
              {/* Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-[5fr_2.5fr_2.5fr] xl:grid-cols-[7fr_4fr_3.5fr_2fr_3.5fr] gap-4 items-start">
                {/* Column 1 - Image & Order Info */}
                <div className="flex flex-col md:flex-row items-start gap-3 ">
                  <img
                    src={assets?.parcel_icon}
                    alt="icon"
                    className="w-14 h-14 md:w-10 md:h-10 object-contain"
                  />
                  <div className="w-full">
                    {order.items.map((item, idx) => (
                      <p key={idx} className="text-sm space-y-0.5">
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Address and User Info */}
                <div className="rounded-lg space-y-0.5 ">
                  <p className="font-semibold text-gray-800 flex items-center gap-1">
                    <span className="text-sm">👤</span>
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className="text-gray-600 text-sm flex items-center gap-1">
                    📍 {order.address.street}, {order.address.city},{" "}
                    {order.address.state}, {order.address.country},{" "}
                    {order.address.zipCode}
                  </p>
                  <p className="text-gray-600 text-sm mt-0.5 flex items-center gap-1">
                    📞 {order.address.phone}
                  </p>
                </div>

                {/* Column 2 - Order Details */}
                <div className="space-y-0.5 text-sm ">
                  <p>🛍️ Items: {order.items.length}</p>
                  <p>💳 Method: {order.paymentMethod}</p>
                  <p>✅ Payment: {order.payment ? "Done" : "Pending"}</p>
                  <p>📅 Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>

                {/* Column 3 - Amount */}
                <div className="font-medium text-lg text-gray-700 ">
                  {currency} {order.amount}
                </div>

                {/* Column 4 - Order Status */}
                <div className="-mt-1">
                  <label className="text-sm font-medium text-gray-700">
                    Status:
                  </label>
                  <select
                    value={order.status}
                    onChange={(e) => statusHandler(e, order._id)} // Trigger the status handler on change
                    className="w-full p-2 border rounded text-sm font-semibold"
                  >
                    <option value="Order Placed">🛒 Order Placed</option>
                    <option value="Packing">📦 Packing</option>
                    <option value="Shipped">🚚 Shipped</option>
                    <option value="Out for Delivery">
                      🚀 Out for Delivery
                    </option>
                    <option value="Delivered">✅ Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center text-lg mt-10">
          No orders found. 📭
        </p>
      )}
    </div>
  );
};

export default Orders;
