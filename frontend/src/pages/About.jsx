import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";

const About = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto p-4 sm:p-6  text-gray-800 border-t px-4 sm:px-[5vw]">
        <div className="text-2xl mt-4 mb-16 text-center">
          <Title text1={"ABOUT"} text2={"US"} />
        </div>

        <div className="flex flex-col lg:flex-row gap-16 mb-10">
          <div className=" flex justify-center items-center">
            <img
              src={assets.about_img}
              alt="Clothing Display"
              className="w-full sm:max-w-[450px] rounded-lg shadow-lg "
            />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-2.5 text-gray-900">
              About FancyFinds
            </h3>
            <p className="mb-10 md:mb-6 text-base sm:text-lg text-gray-600">
              Welcome to FancyFinds, your ultimate destination for stylish and
              high-quality clothing for men, women, and kids. At FancyFinds, we
              believe that fashion should be accessible to everyone, which is
              why we carefully curate our collection to bring you the latest
              trends and timeless classics at affordable prices.
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2.5 text-gray-900">
              Our Mission
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              At FancyFinds, our mission is to inspire confidence and
              self-expression through fashion. We aim to provide clothing that
              not only looks great but feels amazing too. By combining
              affordability, quality, and style, we strive to empower our
              customers to look and feel their best every day. make it short
            </p>
          </div>
        </div>

        <div className="text-2xl text-center">
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>
        <ul className="list-disc list-inside mb-8 text-base sm:text-lg text-gray-600">
          <li>
            Wide selection of trendy and timeless clothing for men, women, and
            kids.
          </li>
          <li>Exceptional quality at prices that won’t break the bank.</li>
          <li>
            Friendly and knowledgeable customer service ready to assist you.
          </li>
          <li>
            Convenient shopping options with a user-friendly online store and
            fast delivery.
          </li>
          <li>
            Commitment to sustainability by offering eco-friendly and ethically
            sourced products.
          </li>
        </ul>

        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Join the FancyFinds Family
        </h2>
        <p className="text-base sm:text-lg text-gray-600">
          At FancyFinds, we’re more than a store; we’re a community of fashion
          lovers. Follow us on social media to stay updated on the latest
          arrivals, styling tips, and exclusive promotions. Thank you for
          choosing FancyFinds—we can’t wait to help you create your perfect
          wardrobe!
        </p>
      </div>
  
    </>
  );
};

export default About;
