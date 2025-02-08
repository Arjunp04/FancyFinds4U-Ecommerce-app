import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/Shopcontext.jsx";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);
  const location = useLocation(); // Get the current location

  const Logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };


  return (
    <div className="flex justify-between items-center font-medium py-3 shadow-gray-300 shadow-md px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="logo" />
      </Link>

      <ul className="hidden sm:flex gap-3 md:gap-5 lg:gap-8 text-base">
        {[
          { path: "/", label: "HOME" },
          { path: "/collection", label: "COLLECTION" },
          { path: "/about", label: "ABOUT" },
          { path: "/contact", label: "CONTACT" },
        ].map(({ path, label }) => (
          <div key={path} className="flex flex-col items-center gap-1">
            <NavLink
              to={path}
              className={`font-medium hover:text-gray-800 ${
                location.pathname === path ? "text-blue-800" : "text-gray-900"
              }`}
            >
              <p>{label}</p>
            </NavLink>
            <hr
              className={`w-2/4 h-[1.6px]  border-none ${
                location.pathname === path ? "bg-blue-800" : "bg-transparent"
              }`}
            />
          </div>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          alt="searchIcon"
          className="w-5 cursor-pointer"
        />
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            alt="profile icon"
            className="w-5 cursor-pointer"
          />

          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-20">
              <div className="flex flex-col gap-2 w-36 py-3 bg-slate-100 text-gray-800 rounded">
                <p onClick={()=> navigate("/my-profile")} className="cursor-pointer hover:text-blue-800 px-5">My Profile</p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-blue-800 px-5"
                >
                  Orders
                </p>
                <p
                  onClick={Logout}
                  className="cursor-pointer hover:text-blue-800 px-5"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart icon" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-blue-800 text-white rounded-full text-[8px] aspect-square">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="menu icon"
          className="cursor-pointer sm:hidden w-5"
        />
      </div>

      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-gray-100 transition-all ${
          visible ? "w-3/4 duration-500 ease-in-out z-20" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-700">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180" />
            <p>Back</p>
          </div>

          <NavLink
            onClick={() => {
              setVisible(false);
            }}
            to="/"
            className="py-2 pl-6 border"
          >
            <p>HOME</p>
          </NavLink>
          <NavLink
            onClick={() => {
              setVisible(false);
            }}
            to="/collection"
            className="py-2 pl-6 border"
          >
            <p>COLLECTION</p>
          </NavLink>
          <NavLink
            onClick={() => {
              setVisible(false);
            }}
            to="/about"
            className="py-2 pl-6 border"
          >
            <p>ABOUT US</p>
          </NavLink>
          <NavLink
            onClick={() => {
              setVisible(false);
            }}
            to="/contact"
            className="py-2 pl-6 border"
          >
            <p>CONTACT</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
