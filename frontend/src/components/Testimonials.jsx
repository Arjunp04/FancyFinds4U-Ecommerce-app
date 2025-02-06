import React, { useState } from "react";
import Title from "./Title";
import { FaUserAlt } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonialsData = [
  {
    name: "Amit Sharma",
    feedback:
      "I absolutely love the clothes I bought from this store. The quality is exceptional and the fit is perfect. Will definitely recommend it to my friends and family. The delivery was also quick and the packaging was amazing.",
    rating: 5,
  },
  {
    name: "Priya Desai",
    feedback:
      "The best online shopping experience I’ve had in a long time. The clothing is stylish, comfortable, and reasonably priced. I’m very impressed with the collection, especially the ethnic wear.",
    rating: 4,
  },
  {
    name: "Raj Kumar",
    feedback:
      "Amazing quality and great customer service. I’ve been shopping here for a while and the collection is always fresh and trendy. Perfect for any occasion.",
    rating: 5,
  },
  {
    name: "Shalini Patel",
    feedback:
      "I found exactly what I was looking for. The clothes fit perfectly, and the styles are always on point. I love how user-friendly the website is.",
    rating: 4,
  },
];

const Testimonials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const handleReadMore = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const truncateFeedback = (feedback) => {
    const maxLength = 150;
    return feedback.length > maxLength
      ? `${feedback.substring(0, maxLength)}...`
      : feedback;
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 550,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="my-2">
      <div className="text-center py-8 text-3xl text-blue-600">
        <Title text1={"CUSTOMER"} text2={"TESTIMONIALS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500">
          Hear from our happy customers who are loving their new style and
          experience.
        </p>
      </div>

      <div className="relative">
        <Slider {...settings}>
          {testimonialsData.map((item, index) => (
            <div key={index} className="p-4">
              <div className="bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col items-center border border-gray-300">
                <div className="w-16 h-16 mb-2 flex items-center justify-center rounded-full border-2 border-blue-500 bg-gray-200">
                  <FaUserAlt className="text-blue-500 text-3xl" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </p>
                  <div className="flex text-yellow-600 items-center justify-center">
                    {[...Array(item.rating)].map((_, idx) => (
                      <span key={idx} className="text-yellow-500">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {truncateFeedback(item.feedback)}
                  </p>
                  <button
                    onClick={() => handleReadMore(item)}
                    className="mt-2 text-blue-500 text-xs hover:underline"
                  >
                    Read more
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-96 h-80 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-blue-600">
                {selectedTestimonial.name}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                &#10005;
              </button>
            </div>
            <div className="flex flex-col items-center mb-4">
              <div className="w-24 h-24 mb-4 flex items-center justify-center rounded-full border-2 border-blue-500 bg-gray-200">
                <FaUserAlt className="text-blue-500 text-4xl" />
              </div>
              <div className="flex mt-2 text-yellow-500">
                {[...Array(selectedTestimonial.rating)].map((_, idx) => (
                  <span key={idx} className="text-yellow-500">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                {selectedTestimonial.feedback}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;
