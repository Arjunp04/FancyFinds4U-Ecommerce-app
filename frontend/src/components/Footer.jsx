import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom"; // Assuming you're using React Router

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-28 text-sm">
        <div>
          <img
            className="mb-5 w-32"
            src={assets.logo}
            alt="FancyFinds4U Logo"
          />
          <p className="w-full md:w-2/3 text-gray-600">
            Discover trendy and high-quality fashion at FancyFinds4U. Your
            one-stop shop for stylish and affordable clothing. Stay fashionable
            with our latest collections at unbeatable prices!
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">QUICK LINKS</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <Link to="/" className="hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-blue-500">
                My Orders
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-500">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-500">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-blue-500" />
              <a href="tel:+911234567809" className="hover:text-blue-500">
                +91 1234567809
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-blue-500" />
              <a
                href="mailto:fancyfinds4u@gmail.com"
                className="hover:text-blue-500"
              >
                fancyfinds4u@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center text-gray-800">
          Copyright {year} @ FancyFinds4U - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
