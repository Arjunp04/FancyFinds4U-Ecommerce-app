import React from "react";
import { assets } from "../assets/admin_assets/assets.js";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setToken }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    setToken("");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between  py-2 px-[4%]">
      <img className="w-[max(10%,80px)]" src={assets.logo} alt="logo" />
      <button
        onClick={onLogout}
        className="bg-gray-800 text-white px-5 py-2 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
