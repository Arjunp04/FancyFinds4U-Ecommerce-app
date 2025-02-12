import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="text-center text-2xl pt-10 border-t ">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        {/* Contact Image */}
        <div className="flex justify-center items-center">
          <img
            src={assets.contact_img}
            alt="Contact"
            className="w-full sm:max-w-[400px]"
            loading="lazy"
          />
        </div>

        {/* Contact Details */}
        <div className="flex flex-col justify-center items-start gap-3">
          <p className="font-semibold text-3xl text-gray-600">Our Store</p>

          <p className="text-gray-500 flex items-start gap-2">
            <FaMapMarkerAlt className="text-blue-500 mt-1.5" />
            <span>
              FancyFinds4U, G-Floor, Block B,
              <br /> Phoenix MarketCity, Kurla- 400070,
              <br /> Mumbai, Maharashtra
            </span>
          </p>

          <p className="text-gray-500 flex items-center gap-2">
            <FaPhoneAlt className="text-blue-500" />
            <a href="tel:+911234567809" className="hover:text-blue-500">
              +91-1234567809
            </a>
          </p>

          <p className="text-gray-500 flex items-center gap-2">
            <FaEnvelope className="text-blue-500" />
            <a
              href="mailto:fancyfinds4u@gmail.com"
              className="hover:text-blue-500"
            >
              fancyfinds4u@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
