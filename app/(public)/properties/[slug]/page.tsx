import { Metadata } from "next";
import { notFound } from "next/navigation";
import { properties, getPropertyBySlug } from "@/lib/data";
import { generatePropertyJsonLd } from "@/lib/metadata";
import PropertyDetail from "./PropertyDetail";

// Generate static params for both properties
export async function generateStaticParams() {
  return properties.map((property) => ({
    slug: property.slug,
  }));
}

// Dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) return {};

  return {
    title: `${property.name} - ${property.bedrooms} Bed Vacation Rental`,
    description: property.description,
    openGraph: {
      title: `${property.name} | Nunez Vacation Homes`,
      description: property.description,
      images: [{ url: property.heroImage, width: 1200, height: 630, alt: property.name }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${property.name} | Nunez Vacation Homes`,
      description: property.description,
      images: [property.heroImage],
    },
    alternates: {
      canonical: `https://nunezvacationhomes.com/properties/${slug}`,
    },
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) notFound();

  // Find the other property for cross-linking
  const otherProperty = properties.find((p) => p.slug !== slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generatePropertyJsonLd(property)),
        }}
      />
      <PropertyDetail property={property} otherProperty={otherProperty || null} />
    </>
  );
}
