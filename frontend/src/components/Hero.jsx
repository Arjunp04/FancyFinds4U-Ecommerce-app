import React, { useContext } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/Shopcontext";

const Hero = () => {

  const { navigate } = useContext(ShopContext);
  return (
    <div className="relative w-full h-[450px] max-h-[450px] mt-3">
      {/* Overlay for text */}
      <div className="absolute inset-0 bg-black"></div>

      {/* Background container with 60% height */}
      <div className="absolute top-0 left-0 w-full h-full shadow-xl">
        {/* Hero image */}
        <img
          src={assets.hero}
          alt="Hero Image"
          className="w-full h-full object-cover opacity-45"
        />
      </div>

      <div className="flex items-center justify-center relative z-10 text-center text-white px-6 sm:px-12 h-full">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Discover the Best in Fashion and Lifestyle
          </h2>
          <p className="text-lg sm:text-xl mb-6 text-white">
            Find Your Perfect Look with FancyFinds4U
          </p>
          <button onClick={()=>{navigate("/collection")}} className="bg-pink-600  text-white py-3 px-6 rounded-full text-lg font-semibold transition duration-300 transform hover:scale-105">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
