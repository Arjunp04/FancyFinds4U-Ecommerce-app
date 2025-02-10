import React, { useContext } from "react";
import { ShopContext } from "../context/Shopcontext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      to={`/product/${id}`}
      className="relative overflow-hidden rounded-lg border border-gray-200 shadow-lg transform transition-all hover:scale-105 hover:shadow-xl hover:border-zinc-300"
    >
      <div className="overflow-hidden">
        <img
          className="transition ease-in-out duration-300 object-cover w-full h-72 sm:h-80 md:h-72 lg:h-64 rounded-lg"
          src={image[0]}
          alt={name}
        />
      </div>
      <div className="p-4">
        <p className="text-lg font-semibold text-gray-800 truncate">{name}</p>
        <p className="text-sm font-medium text-gray-600">
          {currency} {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
