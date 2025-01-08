import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import NewsLetterBox from "../components/NewsLetterBox";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <div className=" flex justify-center items-center">
          {" "}
          <img
            src={assets.contact_img}
            alt="contact image"
            className="w-full sm:max-w-[480px]"
          />
        </div>

        <div className="flex flex-col justify-center items-start gap-3">
          <p className="font-semibold text-3xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            Address: FancyFinds4U, G-Floor, Block B,
            <br /> Phoenix MarketCity, Kurla- 400070,
            <br /> Mumbai, Maharashtra
          </p>
          <p className="text-gray-500">Phone: +91-9876543210</p>
          <p className="text-gray-500">Email: fancyfinds4u@gmail.com</p>
        </div>
      </div>

      <div>
        <NewsLetterBox/>
      </div>
    </div>
  );
};

export default Contact;
