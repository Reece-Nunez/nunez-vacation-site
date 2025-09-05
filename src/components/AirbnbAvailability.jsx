import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaStar, FaDollarSign, FaWifi, FaSwimmer } from 'react-icons/fa';

const AirbnbAvailability = ({ propertyName, airbnbUrl, mockData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [propertyData, setPropertyData] = useState(null);

  useEffect(() => {
    // In a real implementation, you'd fetch from Airbnb API or your backend
    // For now, we'll use mock data
    setTimeout(() => {
      setPropertyData(mockData);
      setIsLoading(false);
    }, 1000);
  }, [mockData]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Property Header */}
      <div className="p-6 bg-gradient-to-r from-primary to-accent text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-1">{propertyName}</h3>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <FaStar className="text-yellow-300" />
              <span>{propertyData.rating} ({propertyData.reviewCount} reviews)</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">${propertyData.price}</div>
            <div className="text-sm opacity-75">per night</div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{propertyData.bedrooms}</div>
            <div className="text-sm text-gray-600">Bedrooms</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{propertyData.bathrooms}</div>
            <div className="text-sm text-gray-600">Bathrooms</div>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">Popular Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {propertyData.amenities.map((amenity, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {amenity.includes('Pool') && <FaSwimmer />}
                {amenity.includes('WiFi') && <FaWifi />}
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Availability Status */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 text-green-800">
            <FaCalendarCheck />
            <span className="font-semibold">Available for booking</span>
          </div>
          <p className="text-sm text-green-600 mt-1">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div>
            <div className="text-lg font-bold text-gray-800">{propertyData.responseTime}</div>
            <div className="text-xs text-gray-600">Response Time</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-800">{propertyData.responseRate}%</div>
            <div className="text-xs text-gray-600">Response Rate</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-800">{propertyData.cancellationPolicy}</div>
            <div className="text-xs text-gray-600">Cancellation</div>
          </div>
        </div>

        {/* Action Button */}
        <a
          href={airbnbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-[#FF5A5F] hover:bg-[#E00007] text-white text-center py-3 rounded-lg font-semibold transition duration-200 transform hover:scale-105"
        >
          View on Airbnb
        </a>
      </div>
    </motion.div>
  );
};

export default AirbnbAvailability;