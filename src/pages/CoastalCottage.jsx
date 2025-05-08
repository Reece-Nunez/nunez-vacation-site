import React from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../index.css";
import Slider from "react-slick";
import { motion } from "framer-motion";
import {
  FaBed,
  FaBath,
  FaUsers,
  FaTv,
  FaMapMarkedAlt,
  FaHome,
  FaUtensils,
  FaSwimmer,
} from "react-icons/fa";

import exteriorImage from "../assets/images/coastal-cottage-images/exterior (1).jpeg";
import poolImage from "../assets/images/coastal-cottage-images/pool (1).jpeg";
import patioImage from "../assets/images/coastal-cottage-images/patio (1).jpeg";
import livingRoomImage from "../assets/images/coastal-cottage-images/living-room (1).jpeg";
import kitchenImage from "../assets/images/coastal-cottage-images/kitchen (1).jpeg";
import bedroom1Image from "../assets/images/coastal-cottage-images/bedroom1 (1).jpeg";
import bedroom2Image from "../assets/images/coastal-cottage-images/bedroom2 (1).jpeg";
import bathroom1Image from "../assets/images/coastal-cottage-images/bathroom1.jpeg";
import bathroom2Image from "../assets/images/coastal-cottage-images/bathroom2 (1).jpeg";
import backyardImage from "../assets/images/coastal-cottage-images/backyard (1).jpeg";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

function CoastalCottage() {
  const images = [
    exteriorImage,
    poolImage,
    patioImage,
    livingRoomImage,
    kitchenImage,
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
    <motion.div
      className="max-w-5xl mx-auto px-6 py-12 bg-gray-50 rounded-lg shadow-xl"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-center mb-8" variants={fadeIn}>
        <h1 className="text-4xl font-serif font-bold mb-2 text-gray-800">
          Coastal Cottage
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          A serene retreat just minutes from the coast — cozy, clean, and
          perfect for families or couples looking to relax and recharge.
        </p>
      </motion.div>
      <motion.div variants={fadeIn}>
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
      </motion.div>
      <motion.div
        className="grid md:grid-cols-2 gap-6 mb-10 text-gray-700 justify-items-center"
        variants={stagger}
      >
        <motion.div
          className="flex items-center gap-3 text-lg"
          variants={fadeIn}
        >
          <FaUsers className="text-primary" />4 Guests
        </motion.div>
        <motion.div
          className="flex items-center gap-3 text-lg"
          variants={fadeIn}
        >
          <FaBed className="text-primary" />2 Bedrooms / 2 Beds
        </motion.div>
        <motion.div
          className="flex items-center gap-3 text-lg"
          variants={fadeIn}
        >
          <FaBath className="text-primary" />2 Bathrooms
        </motion.div>
        <motion.div
          className="flex items-center gap-3 text-lg"
          variants={fadeIn}
        >
          <FaUtensils className="text-primary" />
          Fully Equipped Kitchen
        </motion.div>
        <motion.div
          className="flex items-center gap-3 text-lg"
          variants={fadeIn}
        >
          <FaSwimmer className="text-primary" />
          Private Pool
        </motion.div>
        <motion.div
          className="flex items-center gap-3 text-lg"
          variants={fadeIn}
        >
          <FaTv className="text-primary" />
          Smart TV & WiFi
        </motion.div>
      </motion.div>
      <motion.div className="text-center mb-6" variants={fadeIn}>
        <a
          href="https://www.airbnb.com/rooms/1073345215474384545"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-[#FF5A5F] hover:bg-[#e14b50] text-white font-semibold py-3 px-6 rounded-lg text-lg transition duration-300">
            Book Now on Airbnb
          </button>
        </a>
      </motion.div>
      <motion.div
        className="flex flex-col items-center gap-3"
        variants={fadeIn}
      >
        <Link
          to="/florida-getaway"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-primary hover:underline font-medium"
        >
          → View Florida Getaway
        </Link>

        <Link
          to="/"
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition"
        >
          <FaHome /> Back to Home
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default CoastalCottage;
