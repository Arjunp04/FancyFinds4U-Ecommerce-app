import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img className="mb-5 w-32" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            esse optio id a. Ullam veniam earum aspernatur culpa possimus
            recusandae aut fugit exercitationem repellat ducimus, explicabo
            commodi rem dicta ipsum. Architecto obcaecati facilis, perspiciatis{" "}
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91 111-111-1111</li>
            <li>fancyfinds4u@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright {year}@FancyFinds4U - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
