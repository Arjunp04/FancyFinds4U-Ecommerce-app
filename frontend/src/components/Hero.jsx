import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
  return (
    <div className="relative w-full h-96 bg-gradient-to-r from-orange-700 via-yellow-500 to-red-500">
      {/* Overlay for text */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Background container with 60% height */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Hero image */}
        <img
          src={assets.hero_img}
          alt="Hero Image"
          className="w-full h-full object-cover opacity-70"
        />
      </div>

      <div className="flex items-center justify-center relative z-10 text-center text-white px-6 sm:px-12 h-full">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Discover the Best in Fashion and Lifestyle
          </h2>
          <p className="text-lg sm:text-xl mb-6">
            Find Your Perfect Look with FancyFinds4U
          </p>
          <button className="bg-white text-black py-3 px-6 rounded-full text-lg font-semibold transition duration-300 transform hover:scale-105">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
