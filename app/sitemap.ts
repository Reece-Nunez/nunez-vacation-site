import { MetadataRoute } from "next";
import { properties } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nunezvacationhomes.com";

  const propertyPages = properties.map((property) => ({
    url: `${baseUrl}/properties/${property.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
    images: property.images.map(
      (img) => `${baseUrl}${img.src}`
    ),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
      images: [`${baseUrl}/images/og-image.jpg`],
    },
    ...propertyPages,
  ];
}
