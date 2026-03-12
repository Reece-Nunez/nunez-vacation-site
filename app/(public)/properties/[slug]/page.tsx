import { Metadata } from "next";
import { notFound } from "next/navigation";
import { properties, getPropertyBySlug } from "@/lib/data";
import {
  generatePropertyJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/metadata";
import PropertyDetail from "./PropertyDetail";

const SITE_URL = "https://nunezvacationhomes.com";

export async function generateStaticParams() {
  return properties.map((property) => ({
    slug: property.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) return {};

  const title = `${property.name} — ${property.bedrooms} Bed/${property.bathrooms} Bath Vacation Rental in Port Charlotte, FL`;
  const description = `Book ${property.name}: ${property.bedrooms} bedrooms, ${property.bathrooms} baths, heated saltwater pool. Sleeps ${property.maxGuests}. ${property.rating}-star Superhost rated with ${property.reviewCount} reviews. Near Gulf Coast beaches in Port Charlotte, FL.`;
  const ogImageUrl = `/images/properties/${slug}/og-image.jpg`;

  return {
    title,
    description,
    keywords: [
      `${property.name} Airbnb`,
      `${property.name} vacation rental`,
      `Port Charlotte ${property.bedrooms} bedroom rental`,
      `vacation rental ${property.maxGuests} guests Florida`,
      "Port Charlotte FL Airbnb with pool",
      "Superhost vacation rental Florida",
    ],
    openGraph: {
      title: `${property.name} | Nunez Vacation Homes`,
      description,
      url: `${SITE_URL}/properties/${slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${property.name} — ${property.bedrooms} bedroom vacation rental with heated pool in Port Charlotte, FL`,
          type: "image/jpeg",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${property.name} | Nunez Vacation Homes`,
      description,
      images: [
        {
          url: ogImageUrl,
          alt: `${property.name} — vacation rental in Port Charlotte, FL`,
        },
      ],
    },
    alternates: {
      canonical: `${SITE_URL}/properties/${slug}`,
    },
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) notFound();

  const otherProperty = properties.find((p) => p.slug !== slug);

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Properties", url: `${SITE_URL}/#properties` },
    { name: property.name, url: `${SITE_URL}/properties/${slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generatePropertyJsonLd(property)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <PropertyDetail
        property={property}
        otherProperty={otherProperty || null}
      />
    </>
  );
}
