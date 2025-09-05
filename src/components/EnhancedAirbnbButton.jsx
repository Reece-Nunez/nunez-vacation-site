import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaStar, FaShieldAlt, FaClock } from 'react-icons/fa';
import { trackAirbnbClick } from '../utils/analytics';

const EnhancedAirbnbButton = ({ 
  href, 
  propertyName, 
  rating = 5.0, 
  reviewCount = 10,
  responseTime = "within an hour",
  className = '',
  location = 'property-page'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    trackAirbnbClick(propertyName, location);
    // Small delay to ensure analytics fires before navigation
    setTimeout(() => {
      window.open(href, '_blank', 'noopener,noreferrer');
    }, 100);
  };

  return (
    <motion.div
      className={`relative ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Trust indicators that appear on hover */}
      {isHovered && (
        <motion.div
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-3 border z-10 min-w-max"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-400" />
              <span className="font-medium">{rating}</span>
              <span className="text-gray-500">({reviewCount})</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <FaClock className="text-green-500" />
              <span>{responseTime}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <FaShieldAlt className="text-blue-500" />
              <span>Verified</span>
            </div>
          </div>
          {/* Arrow pointing down */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
        </motion.div>
      )}

      <button
        onClick={handleClick}
        className="w-full bg-gradient-to-r from-[#FF5A5F] to-[#E00007] hover:from-[#E00007] hover:to-[#FF5A5F] text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:shadow-xl flex items-center justify-center gap-3 group"
        aria-label={`Book ${propertyName} on Airbnb - ${rating} stars with ${reviewCount} reviews`}
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg"
          alt="Airbnb"
          className="h-6 w-6 filter invert"
        />
        <span className="text-lg">Book Now on Airbnb</span>
        <FaExternalLinkAlt className="group-hover:translate-x-1 transition-transform duration-200" />
      </button>

      {/* Secondary info */}
      <div className="mt-2 text-center">
        <p className="text-sm text-gray-600">
          Secure booking • Instant confirmation • 24/7 support
        </p>
        <div className="flex items-center justify-center gap-2 mt-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-600 font-medium">Available now</span>
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedAirbnbButton;