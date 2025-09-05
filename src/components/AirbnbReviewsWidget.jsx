import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaExternalLinkAlt, FaQuoteLeft } from 'react-icons/fa';

const AirbnbReviewsWidget = ({ propertyName, airbnbUrl, mockReviews }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, you'd fetch real Airbnb reviews via API or web scraping
    // For now, using mock data that matches your existing review structure
    setTimeout(() => {
      setReviews(mockReviews || []);
      setLoading(false);
    }, 1000);
  }, [mockReviews]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FF5A5F] to-[#E00007] text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Airbnb Guest Reviews</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[1,2,3,4,5].map(star => (
                  <FaStar
                    key={star}
                    className={star <= Math.round(averageRating) ? 'text-yellow-300' : 'text-white/30'}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
              <span className="text-white/80">({reviews.length} reviews)</span>
            </div>
          </div>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg"
            alt="Airbnb"
            className="h-8 filter invert"
          />
        </div>
      </div>

      {/* Reviews */}
      <div className="p-6">
        <div className="space-y-4 mb-6">
          {reviews.slice(0, 3).map((review, index) => (
            <motion.div
              key={index}
              className="border-l-4 border-[#FF5A5F] pl-4 py-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-[#FF5A5F] text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{review.name}</div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(star => (
                      <FaStar
                        key={star}
                        className={`text-xs ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative">
                <FaQuoteLeft className="absolute -top-1 -left-1 text-gray-300 text-xs" />
                <p className="text-gray-700 text-sm italic pl-3">
                  {review.text.length > 120 ? `${review.text.substring(0, 120)}...` : review.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all reviews button */}
        <div className="text-center pt-4 border-t border-gray-100">
          <a
            href={`${airbnbUrl}#reviews`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#FF5A5F] hover:text-[#E00007] font-semibold transition-colors duration-200"
          >
            View All {reviews.length} Reviews on Airbnb
            <FaExternalLinkAlt className="text-sm" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default AirbnbReviewsWidget;