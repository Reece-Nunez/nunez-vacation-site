"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Property } from "@/lib/data";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { BedDouble, Bath } from "lucide-react";
import { StarIcon } from "@heroicons/react/24/solid";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }} className="h-full">
      <Link
        href={`/properties/${property.slug}`}
        className="flex flex-col h-full rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-shadow duration-300 bg-white"
      >
        {/* Image Section */}
        <div className="aspect-[4/3] relative">
          <Image
            src={property.heroImage}
            alt={property.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Superhost badge */}
          {property.superhost && (
            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary-700 rounded-full px-3 py-1 text-xs font-semibold">
              Superhost
            </span>
          )}

        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-serif font-bold text-primary-900">
            {property.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{property.tagline}</p>

          {/* Stats Row */}
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <BedDouble className="w-4 h-4" />
              <span>
                {property.bedrooms} {property.bedrooms === 1 ? "bed" : "beds"}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>
                {property.bathrooms}{" "}
                {property.bathrooms === 1 ? "bath" : "baths"}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <UserGroupIcon className="w-4 h-4" />
              <span>
                {property.maxGuests}{" "}
                {property.maxGuests === 1 ? "guest" : "guests"}
              </span>
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <StarIcon className="w-4 h-4 text-gold" />
            <span className="font-semibold text-primary-900">
              {property.rating}
            </span>
            <span className="text-sm text-gray-400">
              ({property.reviewCount} reviews)
            </span>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mt-4 content-start">
            {property.features.slice(0, 4).map((feature) => (
              <span
                key={feature}
                className="bg-primary-50 text-primary-700 text-xs font-medium px-2.5 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>

          <div className="flex-1" />
          {/* CTA Button */}
          <span className="bg-primary-700 hover:bg-primary-800 text-white rounded-xl py-3 w-full text-center block mt-4 transition-colors font-semibold">
            View Property
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
