import React, { useEffect } from 'react';

const SEO = ({ 
  title = "Nunez Vacation Homes | Luxury Vacation Rentals in Port Charlotte, Florida",
  description = "Experience luxury vacation rentals in Port Charlotte, Florida. Two stunning homes with pools, near Gulf Coast beaches. Perfect for families, reunions, and relaxing getaways.",
  keywords = "Port Charlotte vacation rentals, Florida vacation homes, Gulf Coast rentals, family vacation rentals, luxury vacation homes Florida, heated pool rentals, beach house rentals Florida, vacation rentals near beach",
  image = "/images/og-image.jpg",
  url = "https://nunezvacationhomes.com",
  type = "website",
  property = null,
  price = null,
  availability = null
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nunez Vacation Homes",
    "description": description,
    "url": url,
    "telephone": "+1-XXX-XXX-XXXX",
    "email": "info@nunezvacationhomes.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Port Charlotte",
      "addressRegion": "FL",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.976,
      "longitude": -82.091
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "$$",
    "image": image,
    "sameAs": [
      "https://facebook.com/profile.php?id=61571860077453",
      "https://instagram.com/nunezvacationhomes",
      "https://www.airbnb.com/users/show/466081621"
    ]
  };

  // Create separate structured data for properties to avoid circular references
  let finalStructuredData = structuredData;
  
  if (property) {
    finalStructuredData = {
      "@context": "https://schema.org",
      "@type": "VacationRental",
      "name": property.name,
      "description": property.description,
      "url": `${url}/${property.slug}`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Port Charlotte",
        "addressRegion": "FL",
        "addressCountry": "US"
      },
      "amenityFeature": property.amenities?.map(amenity => ({
        "@type": "LocationFeatureSpecification",
        "name": amenity
      })) || [],
      "numberOfRooms": property.bedrooms,
      "numberOfBathroomsTotal": property.bathrooms,
      "occupancy": {
        "@type": "QuantitativeValue",
        "maxValue": property.maxGuests
      },
      "offers": price ? {
        "@type": "Offer",
        "price": price,
        "priceCurrency": "USD",
        "availability": availability || "InStock"
      } : undefined,
      "aggregateRating": property.rating ? {
        "@type": "AggregateRating",
        "ratingValue": property.rating,
        "reviewCount": property.reviewCount || 10
      } : undefined,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Nunez Vacation Homes",
        "url": "https://nunezvacationhomes.com"
      }
    };
  }

  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Helper function to update or create meta tag
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    // Update basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Nunez Vacation Homes');
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMetaTag('theme-color', '#1d383f');
    
    // Update Open Graph tags
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:site_name', 'Nunez Vacation Homes', true);
    updateMetaTag('og:locale', 'en_US', true);
    
    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    
    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
    
    // Update structured data
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(finalStructuredData);
    
    // Cleanup function
    return () => {
      // Reset title to default when component unmounts
      document.title = "Nunez Vacation Homes | Luxury Vacation Rentals in Port Charlotte, Florida";
    };
  }, [title, description, keywords, image, url, type, finalStructuredData]);
  
  return null;
};

export default SEO;