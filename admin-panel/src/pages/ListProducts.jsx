import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

const ListProducts = ({ token }) => {
  const [listItems, setListItems] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/product/list-all-products`
      );
      console.log(response);
      if (response?.data?.success) {
        setListItems(response.data.products);
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products.", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/product/${id}`, {
        headers: {
          admintoken: token,
        },
      });
      if (response?.data?.success) {
        toast.success("Product removed successfully!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        await fetchList();
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove product.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2 ">
        {/*-------------- list table title --------------- */}
        <div className="hidden sm:grid grid-cols-[1fr_2fr_2fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm ">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Actions</b>
        </div>

        {/* ---------------- list of products ----------------- */}
        {listItems.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_2fr_2fr_1fr_1fr_1fr] items-center py-1 px-2 gap-2 border text-sm"
          >
            <img className="w-12" src={item?.image[0]} alt="product images" />
            <p>{item?.name}</p>
            <p>{item?.description}</p>
            <p>{item?.category}</p>
            <p>
              {currency} {item?.price}
            </p>
            <p className="flex justify-center text-center cursor-pointer text-lg">
              <MdDelete
                color="red"
                onClick={() => removeProduct(item._id)} 
              />
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListProducts;
