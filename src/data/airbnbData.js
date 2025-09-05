// Manual Airbnb data - update monthly or when info changes
// This is what most small vacation rental sites do

export const airbnbData = {
  floridaGetaway: {
    listingId: "818184240745799799",
    url: "https://www.airbnb.com/rooms/818184240745799799",
    rating: 4.9,
    reviewCount: 47,
    basePrice: 150,
    responseTime: "within an hour",
    responseRate: 100,
    instantBook: true,
    superhost: true,
    lastUpdated: "2025-09-04",
    recentReviews: [
      {
        name: "Sarah",
        date: "2025-08-15",
        rating: 5,
        text: "Amazing property with a beautiful heated pool! Lisa was incredibly responsive and helpful. The house exceeded our expectations."
      },
      {
        name: "Michael",
        date: "2025-08-10", 
        rating: 5,
        text: "Perfect location for our family vacation. Clean, spacious, and exactly as described. Would definitely stay again!"
      },
      {
        name: "Jessica",
        date: "2025-07-28",
        rating: 5,
        text: "The pool was a hit with the kids! Great communication from the host and smooth check-in process."
      }
    ],
    amenityHighlights: [
      "Heated Pool",
      "Fast WiFi", 
      "Self Check-in",
      "Kitchen",
      "Free Parking"
    ],
    availability: {
      nextAvailable: "2025-09-15",
      popularMonths: ["November", "December", "January", "February", "March"]
    }
  },
  
  coastalCottage: {
    listingId: "1073345215474384545",
    url: "https://www.airbnb.com/rooms/1073345215474384545", 
    rating: 4.8,
    reviewCount: 32,
    basePrice: 130,
    responseTime: "within an hour",
    responseRate: 98,
    instantBook: true,
    superhost: true,
    lastUpdated: "2025-09-04",
    recentReviews: [
      {
        name: "David",
        date: "2025-08-20",
        rating: 5,
        text: "Cozy cottage perfect for couples! The screened patio was our favorite spot. Very clean and well-maintained."
      },
      {
        name: "Amanda",
        date: "2025-08-05",
        rating: 5,
        text: "Great location and beautiful property. Host was super responsive and provided excellent local recommendations."
      },
      {
        name: "Robert",
        date: "2025-07-18",
        rating: 4,
        text: "Nice quiet retreat. Pool was refreshing after beach days. Would recommend for a peaceful getaway."
      }
    ],
    amenityHighlights: [
      "Swimming Pool",
      "Screened Patio",
      "Pet Friendly", 
      "Kitchen",
      "Beach Close"
    ],
    availability: {
      nextAvailable: "2025-09-12", 
      popularMonths: ["October", "November", "December", "January", "February"]
    }
  }
};

// Helper functions
export const getPropertyData = (propertyName) => {
  return airbnbData[propertyName] || null;
};

export const getAllProperties = () => {
  return Object.values(airbnbData);
};

export const isDataStale = (propertyName, daysThreshold = 30) => {
  const property = getPropertyData(propertyName);
  if (!property) return true;
  
  const lastUpdate = new Date(property.lastUpdated);
  const now = new Date();
  const daysDiff = (now - lastUpdate) / (1000 * 60 * 60 * 24);
  
  return daysDiff > daysThreshold;
};

// Mock real-time features
export const simulateBookingActivity = (propertyName) => {
  const activities = [
    "2 people viewed this property today",
    "Booked 3 times this week", 
    "Last booked 2 days ago",
    "5 people are viewing this property",
    "Highly rated by recent guests"
  ];
  
  return activities[Math.floor(Math.random() * activities.length)];
};

export const getSeasonalMessage = (propertyName) => {
  const month = new Date().getMonth();
  const property = getPropertyData(propertyName);
  
  // Winter season (Nov-March) is peak for Florida
  if (month >= 10 || month <= 2) {
    return {
      message: "🌴 Peak Season - Book Early!",
      urgency: "high",
      color: "text-red-600"
    };
  } 
  // Spring/Summer  
  else if (month >= 3 && month <= 5) {
    return {
      message: "🌺 Spring Special Rates Available",
      urgency: "medium", 
      color: "text-green-600"
    };
  }
  // Off season
  else {
    return {
      message: "☀️ Great Summer Value!",
      urgency: "low",
      color: "text-blue-600" 
    };
  }
};