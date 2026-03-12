import { Property } from "./data";

export function generatePropertyJsonLd(property: Property) {
  return {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    name: property.name,
    description: property.description,
    image: property.images.map(
      (img) => `https://nunezvacationhomes.com${img.src}`
    ),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Port Charlotte",
      addressRegion: "FL",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.976,
      longitude: -82.091,
    },
    numberOfBedrooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: property.maxGuests,
    },
    amenityFeature: property.features.map((f) => ({
      "@type": "LocationFeatureSpecification",
      name: f,
      value: true,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: property.rating,
      reviewCount: property.reviewCount,
      bestRating: 5,
    },
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://nunezvacationhomes.com",
    name: "Nunez Vacation Homes",
    description: "Luxury vacation rentals in Port Charlotte, Florida",
    url: "https://nunezvacationhomes.com",
    email: "info@nunezvacationhomes.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Port Charlotte",
      addressRegion: "FL",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.976,
      longitude: -82.091,
    },

    image: "https://nunezvacationhomes.com/images/logo.png",
  };
}
