import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const PolicyFeatures = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img src={assets.exchange_icon} className="w-28 m-auto mb-5" alt="" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">
          Enjoy a simple and hassle-free exchange process with us
        </p>
      </div>
      <div>
        <img src={assets.quality_icon} className="w-[101px] m-auto mb-5" alt="" />
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-gray-400">
          Return any product within 7 days with no questions asked
        </p>
      </div>
      <div>
        <img src={assets.support_img} className="w-[102px] m-auto mb-5" alt="" />
        <p className="font-semibold">Best Customer Support</p>
        <p className="text-gray-400">
          Our team is here to assist you 24/7 with any queries
        </p>
      </div>
      {/* New Section */}
   
    </div>
  );
};

export default PolicyFeatures;
