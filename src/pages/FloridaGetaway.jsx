import React from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../index.css";
import Slider from "react-slick";

import {
  FaBed,
  FaBath,
  FaUsers,
  FaTv,
  FaSwimmer,
  FaMapMarkedAlt,
  FaHome,
} from "react-icons/fa";

import exteriorImage from "../assets/images/florida-getaway-images/exterior.jpeg";
import poolImage from "../assets/images/florida-getaway-images/pool.jpeg";
import patioImage from "../assets/images/florida-getaway-images/patio.jpeg";
import livingRoomImage from "../assets/images/florida-getaway-images/living-room.jpeg";
import kitchenImage from "../assets/images/florida-getaway-images/kitchen.jpeg";
import diningImage from "../assets/images/florida-getaway-images/dining.jpeg";
import bedroom1Image from "../assets/images/florida-getaway-images/bedroom1.jpeg";
import bedroom2Image from "../assets/images/florida-getaway-images/bedroom2.jpeg";
import bathroom1Image from "../assets/images/florida-getaway-images/bathroom1.jpeg";
import bathroom2Image from "../assets/images/florida-getaway-images/bathroom2.jpeg";
import backyardImage from "../assets/images/florida-getaway-images/backyard.jpeg";

function FloridaGetaway() {
  const images = [
    exteriorImage,
    poolImage,
    patioImage,
    livingRoomImage,
    kitchenImage,
    diningImage,
    bedroom1Image,
    bedroom2Image,
    bathroom1Image,
    bathroom2Image,
    backyardImage,
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 bg-gray-50 rounded-lg shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif font-bold mb-2 text-gray-800">
          Florida Getaway
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Your perfect winter escape awaits. Enjoy peaceful evenings, a private
          pool, and the warmth of a true home-away-from-home in sunny Port
          Charlotte.
        </p>
      </div>

      {/* Slider */}
      <Slider
        {...settings}
        className="rounded-xl overflow-hidden shadow-lg mb-10"
      >
        {images.map((image, i) => (
          <div key={i}>
            <img
              src={image}
              alt={`Slide ${i + 1}`}
              className="w-full h-[500px] object-cover"
            />
          </div>
        ))}
      </Slider>

      {/* Amenities */}
      <div className="grid md:grid-cols-2 gap-6 mb-10 text-gray-700 justify-items-center">
        <div className="flex items-center gap-3 text-lg">
          <FaUsers className="text-primary" />6 Guests
        </div>
        <div className="flex items-center gap-3 text-lg">
          <FaBed className="text-primary" />3 Bedrooms / 3 Beds
        </div>
        <div className="flex items-center gap-3 text-lg">
          <FaBath className="text-primary" />2 Bathrooms
        </div>
        <div className="flex items-center gap-3 text-lg">
          <FaMapMarkedAlt className="text-primary" />
          Close to local attractions
        </div>
        <div className="flex items-center gap-3 text-lg">
          <FaSwimmer className="text-primary" />
          Private Pool
        </div>
        <div className="flex items-center gap-3 text-lg">
          <FaTv className="text-primary" />
          Smart TV & WiFi
        </div>
      </div>

      {/* Book Button */}
      <div className="text-center mb-6">
        <a
          href="https://www.airbnb.com/rooms/818184240745799799"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-[#FF5A5F] hover:bg-[#e14b50] text-white font-semibold py-3 px-6 rounded-lg text-lg transition duration-300">
            Book Now on Airbnb
          </button>
        </a>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col items-center gap-3">
        <Link
          to="/coastal-cottage"
          className="text-primary hover:underline font-medium"
        >
          → View Coastal Cottage
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition"
        >
          <FaHome /> Back to Home
        </Link>
      </div>
    </div>
  );
}

export default FloridaGetaway;
