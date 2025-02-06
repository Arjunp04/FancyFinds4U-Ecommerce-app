import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <p className="text-gray-500 text-3xl font-medium uppercase tracking-wide">
        {text1}
        <span className="text-gray-800 font-semibold pl-2">{text2}</span>
      </p>
      {/* <div className="w-12 h-[2px] bg-gray-700"></div> */}
    </div>
  );
};

export default Title;
