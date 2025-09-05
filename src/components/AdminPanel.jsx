import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';

// Simple admin panel to update Airbnb data without coding
const AdminPanel = ({ isVisible, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Simple password protection (in production, use proper auth)
  const ADMIN_PASSWORD = 'nunez2025';
  
  const [formData, setFormData] = useState({
    floridaGetaway: {
      rating: 4.9,
      reviewCount: 47,
      basePrice: 150,
      nextAvailable: '2025-09-15'
    },
    coastalCottage: {
      rating: 4.8, 
      reviewCount: 32,
      basePrice: 130,
      nextAvailable: '2025-09-12'
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleSave = () => {
    // In production, this would save to a database or update the data file
    console.log('Saving data:', formData);
    localStorage.setItem('airbnbData', JSON.stringify(formData));
    setIsEditing(false);
    alert('Data saved! Refresh the page to see changes.');
  };

  const updateField = (property, field, value) => {
    setFormData(prev => ({
      ...prev,
      [property]: {
        ...prev[property],
        [field]: value
      }
    }));
  };

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg z-50"
        title="Admin Panel"
      >
        <FaEdit />
      </button>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Property Admin Panel</h2>
          <button
            onClick={onToggle}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaEyeSlash />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Login Form */
          <div className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Admin Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter admin password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition"
              >
                Login
              </button>
            </form>
          </div>
        ) : (
          /* Admin Interface */
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Update Property Data</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition"
                >
                  <FaEdit /> {isEditing ? 'Cancel' : 'Edit'}
                </button>
                {isEditing && (
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition"
                  >
                    <FaSave /> Save
                  </button>
                )}
              </div>
            </div>

            {/* Property Data Forms */}
            <div className="space-y-6">
              {Object.entries(formData).map(([propertyKey, property]) => (
                <div key={propertyKey} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3 capitalize">
                    {propertyKey.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rating
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        value={property.rating}
                        onChange={(e) => updateField(propertyKey, 'rating', parseFloat(e.target.value))}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Review Count
                      </label>
                      <input
                        type="number"
                        value={property.reviewCount}
                        onChange={(e) => updateField(propertyKey, 'reviewCount', parseInt(e.target.value))}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Base Price ($)
                      </label>
                      <input
                        type="number"
                        value={property.basePrice}
                        onChange={(e) => updateField(propertyKey, 'basePrice', parseInt(e.target.value))}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Next Available
                      </label>
                      <input
                        type="date"
                        value={property.nextAvailable}
                        onChange={(e) => updateField(propertyKey, 'nextAvailable', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">How to Update:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Check your Airbnb listing for current rating and review count</li>
                <li>• Update pricing based on your current rates</li>
                <li>• Set next available date from your Airbnb calendar</li>
                <li>• Save changes to update the website automatically</li>
              </ul>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AdminPanel;