import React from 'react';
import { Helmet } from 'react-helmet-async';

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

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Nunez Vacation Homes" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={url} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Nunez Vacation Homes" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@nunezvacationhomes" />
      <meta name="twitter:creator" content="@nunezvacationhomes" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#1d383f" />
      <meta name="msapplication-TileColor" content="#1d383f" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Geo Meta Tags */}
      <meta name="geo.region" content="US-FL" />
      <meta name="geo.placename" content="Port Charlotte, Florida" />
      <meta name="geo.position" content="26.976;-82.091" />
      <meta name="ICBM" content="26.976, -82.091" />
      
      {/* Business-specific Meta Tags */}
      <meta name="classification" content="vacation rentals, hospitality" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.airbnb.com" />
      <link rel="preconnect" href="https://facebook.com" />
      <link rel="preconnect" href="https://instagram.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
    </Helmet>
  );
};

export default SEO;