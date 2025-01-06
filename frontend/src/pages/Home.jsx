import React from "react";
import Hero from "../components/Hero";
import LatestCollections from "../components/LatestCollections";
import BestSellerProducts from "../components/BestSellerProducts";
import PolicyFeatures from "../components/PolicyFeatures";
import NewsLetterBox from "../components/NewsLetterBox";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollections />
      <BestSellerProducts />
      <PolicyFeatures />
      <NewsLetterBox/>
    </div>
  );
};

export default Home;
