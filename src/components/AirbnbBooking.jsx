import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import { FaCalendarAlt, FaUsers, FaExternalLinkAlt } from 'react-icons/fa';

const AirbnbBooking = ({ 
  propertyName,
  airbnbUrl, 
  listingId,
  className = '',
  showDatePicker = true 
}) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const handleBookNow = () => {
    let bookingUrl = airbnbUrl;
    
    // Add query parameters if dates are selected
    if (checkIn && checkOut) {
      const params = new URLSearchParams({
        check_in: checkIn,
        check_out: checkOut,
        adults: guests.toString(),
        source: 'website'
      });
      bookingUrl = `${airbnbUrl}?${params.toString()}`;
    }

    // Track booking click for analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'booking_click', {
        event_category: 'engagement',
        event_label: propertyName,
        property_name: propertyName
      });
    }

    window.open(bookingUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCheckAvailability = () => {
    const availabilityUrl = `${airbnbUrl}/availability`;
    window.open(availabilityUrl, '_blank', 'noopener,noreferrer');
  };

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-lg p-6 border border-gray-100 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Book Your Stay</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg" 
            alt="Powered by Airbnb"
            className="h-4"
          />
          <span>via Airbnb</span>
        </div>
      </div>

      {showDatePicker && (
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-in
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={today}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-out
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || tomorrow}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guests
            </label>
            <div className="relative">
              <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {[1,2,3,4,5,6,7,8].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <Button
          onClick={handleBookNow}
          fullWidth
          size="lg"
          className="bg-[#FF5A5F] hover:bg-[#E00007] text-white"
          rightIcon={<FaExternalLinkAlt />}
          ariaLabel={`Book ${propertyName} on Airbnb`}
        >
          Book Now on Airbnb
        </Button>

        <Button
          onClick={handleCheckAvailability}
          fullWidth
          variant="outline"
          className="border-[#FF5A5F] text-[#FF5A5F] hover:bg-[#FF5A5F] hover:text-white"
          ariaLabel={`Check availability for ${propertyName}`}
        >
          Check Availability & Pricing
        </Button>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Secure booking via Airbnb</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span>Instant confirmation</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AirbnbBooking;