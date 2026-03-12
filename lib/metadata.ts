import { Property, properties } from "./data";

const SITE_URL = "https://nunezvacationhomes.com";
const SITE_NAME = "Nunez Vacation Homes";

export function generatePropertyJsonLd(property: Property) {
  return {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    "@id": `${SITE_URL}/properties/${property.slug}#vacation-rental`,
    name: property.name,
    description: property.description,
    url: `${SITE_URL}/properties/${property.slug}`,
    image: property.images.map((img) => `${SITE_URL}${img.src}`),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Port Charlotte",
      addressRegion: "FL",
      postalCode: "33948",
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
      unitText: "guests",
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
      worstRating: 1,
    },
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}#business`,
      name: SITE_NAME,
    },
    containedInPlace: {
      "@type": "City",
      name: "Port Charlotte",
      containedInPlace: {
        "@type": "State",
        name: "Florida",
      },
    },
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}#business`,
    name: SITE_NAME,
    description:
      "Luxury Superhost vacation rentals in Port Charlotte, Florida with heated saltwater pools near Gulf Coast beaches.",
    url: SITE_URL,
    email: "info@nunezvacationhomes.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Port Charlotte",
      addressRegion: "FL",
      postalCode: "33948",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.976,
      longitude: -82.091,
    },
    image: `${SITE_URL}/images/og-image.jpg`,
    logo: `${SITE_URL}/images/logo.png`,
    priceRange: "$$",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 26.976,
        longitude: -82.091,
      },
      geoRadius: "50 mi",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 5.0,
      reviewCount: properties.reduce((sum, p) => sum + p.reviewCount, 0),
      bestRating: 5,
      worstRating: 1,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Vacation Rentals",
      itemListElement: properties.map((p) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "VacationRental",
          name: p.name,
          url: `${SITE_URL}/properties/${p.slug}`,
        },
      })),
    },
  };
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQJsonLd() {
  const faqs = [
    {
      question:
        "Where are Nunez Vacation Homes located?",
      answer:
        "Our vacation homes are located in Port Charlotte, Florida — centrally positioned between Sarasota and Fort Myers on the Gulf Coast. Both properties are minutes from Englewood Beach, Boca Grande, and dozens of waterfront restaurants.",
    },
    {
      question: "Do the homes have heated pools?",
      answer:
        "Yes! Both vacation homes feature heated saltwater pools under screened-in lanais. The pools can be enjoyed year-round, making our properties perfect for snowbirds and winter travelers.",
    },
    {
      question: "How many guests can each property accommodate?",
      answer:
        "The Florida Getaway sleeps up to 6 guests with 3 bedrooms and 2 bathrooms. The Coastal Cottage sleeps up to 8 guests with 4 bedrooms and 2 bathrooms. Combined, they're ideal for large family reunions or group trips.",
    },
    {
      question: "Are you an Airbnb Superhost?",
      answer:
        "Yes, we are proud Airbnb Superhosts with a perfect 5.0 rating across both properties. Superhost status means we provide exceptional hospitality, fast communication, and consistently 5-star experiences.",
    },
    {
      question: "What beaches are near the properties?",
      answer:
        "The closest beaches include Englewood Beach (15 min), Boca Grande Beach on Gasparilla Island (25 min), and Venice Beach (30 min). All are stunning Gulf Coast beaches with white sand and clear water.",
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Luxury Superhost vacation rentals in Port Charlotte, Florida.",
    publisher: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}#business`,
    },
  };
}
