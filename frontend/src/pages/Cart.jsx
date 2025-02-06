import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/Shopcontext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate,
    loading,
    setLoading,
  } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // Handle navigation change and set loading to false
  const handleNavigation = (path) => {
    setLoading(true);
    navigate(path);
    setLoading(false);
  };

  return (
    <div className="border-t pt-14 relative px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* If cart is empty */}
      {cartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center my-20">
          <img
            src={assets.cartempty}// Add an empty cart image in assets
            alt="Empty Cart"
            className="w-40 sm:w-60 mb-4"
          />
          <p className="text-2xl text-gray-900 font-medium">
            Your cart is empty!</p>
          <p className="text-gray-500 mb-6 text-sm"
          >
            Looks like you haven’t added anything yet.
          </p>
          <button
            onClick={() => handleNavigation("/collection")}
            className="bg-black text-white px-6 py-2 text-sm rounded-md"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <>
          {/* If cart has items */}
          <div>
            {cartData.map((item, index) => {
              const productData = products.find(
                (product) => product._id === item._id
              );
              return (
                <div
                  key={index}
                  className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                >
                  <div className="flex items-start gap-6">
                    <img
                      className="w-16 sm:w-20"
                      src={productData.image[0]}
                      alt=""
                    />
                    <div>
                      <p className="text-xs sm:text-lg font-medium">
                        {productData.name}
                      </p>
                      <div className="flex items-center gap-5 mt-2">
                        <p>
                          {currency} {productData.price}/-
                        </p>
                        <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                          {item.size}
                        </p>
                      </div>
                    </div>
                  </div>

                  <input
                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 focus:outline-none focus:border-gray-300"
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    onChange={(e) => {
                      e.target.value === "" || e.target.value === "0"
                        ? null
                        : updateQuantity(
                            item._id,
                            item.size,
                            Number(e.target.value)
                          );
                    }}
                  />
                  <img
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    src={assets.bin_icon}
                    alt=""
                    className="w-4 sm:w-5 mr-4 cursor-pointer"
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className="w-full text-end">
                <button
                  onClick={() => handleNavigation("/place-order")}
                    className={` text-white px-8 py-3 text-sm my-8 bg-green-700 hover:bg-green-800
                    
                      ${
                    loading ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  disabled={loading}
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
