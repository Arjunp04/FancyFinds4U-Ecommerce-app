import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { MdDelete, MdEdit } from "react-icons/md";

const ListProducts = ({ token }) => {
  const [listItems, setListItems] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/product/list-all-products`
      );
      if (response?.data?.success) {
        setListItems(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products.");
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/product/${id}`, {
        headers: { admintoken: token },
      });
      if (response?.data?.success) {
        toast.success("Product removed successfully!");
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="bg-white">
      <h2 className="text-xl font-semibold mb-4">All Products List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-sm md:text-base uppercase">
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listItems.map((item, index) => (
              <tr
                key={item._id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                } hover:bg-gray-50 transition`}
              >
                <td className="py-3 px-4">
                  <img
                    className="w-12 h-12 object-cover rounded-md border"
                    src={item?.image[0]}
                    alt="product"
                  />
                </td>
                <td className="py-3 px-4">{item?.name}</td>
                <td className="py-3 px-4">
                  {item?.description.slice(0, 80)}...
                </td>
                <td className="py-3 px-4">{item?.category}</td>
                <td className="py-3 pl-4 text-left font-semibold text-gray-600">
                  {currency} {item?.price}
                </td>
                <td className="py-3 px-4 text-center flex justify-center gap-3">
                  {/* Edit Button */}
                  <button
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    onClick={() => navigate(`/update-item/${item._id}`)}
                  >
                    <MdEdit size={20} />
                  </button>

                  {/* Delete Button */}
                  <button
                    className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    onClick={() => removeProduct(item._id)}
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {listItems.length === 0 && (
          <p className="text-center text-gray-600 mt-4">
            No products available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ListProducts;
