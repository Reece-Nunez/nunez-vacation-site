"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import ImageGallery from "@/components/ImageGallery";
import AnimatedSection from "@/components/AnimatedSection";
import ScrollProgress from "@/components/ScrollProgress";
import { Property } from "@/lib/data";
import {
  HomeIcon,
  UserGroupIcon,
  MapPinIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowLeftIcon,

  ClockIcon,
  ShieldCheckIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

interface PropertyDetailProps {
  property: Property;
  otherProperty: Property | null;
}

export default function PropertyDetail({ property, otherProperty }: PropertyDetailProps) {
  const hasHeatedPool = property.features.some(
    (f) => f.toLowerCase().includes("heated pool")
  );

  return (
    <>
      <ScrollProgress />

      {/* Hero Banner */}
      <section className="h-[50vh] sm:h-[60vh] relative">
        <Image
          src={property.heroImage}
          alt={property.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 flex flex-col justify-end pb-16 sm:pb-20 px-6"
        >
          <div className="container-wide max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRightIcon className="w-3 h-3" />
              <span>Properties</span>
              <ChevronRightIcon className="w-3 h-3" />
              <span className="text-white">{property.name}</span>
            </nav>

            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-3">
              {property.name}
            </h1>
            <p className="text-lg text-white/80 mb-4">{property.tagline}</p>

            {/* Rating badge */}
            <div className="flex items-center gap-2">
              <StarSolidIcon className="w-5 h-5 text-yellow-400" />
              <span className="text-white/90 font-semibold">{property.rating}</span>
              <span className="text-white/90">({property.reviewCount} reviews)</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Quick Stats Bar */}
      <div className="bg-white shadow-medium rounded-2xl -mt-8 relative z-10 mx-4 sm:mx-auto max-w-5xl p-6">
        <div className="hidden sm:flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HomeIcon className="w-5 h-5 text-primary-700" />
            <div>
              <p className="text-sm text-gray-500">Bedrooms</p>
              <p className="font-semibold text-primary-900">{property.bedrooms} Bedrooms</p>
            </div>
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div className="flex items-center gap-3">
            <HomeIcon className="w-5 h-5 text-primary-700" />
            <div>
              <p className="text-sm text-gray-500">Bathrooms</p>
              <p className="font-semibold text-primary-900">{property.bathrooms} Bathrooms</p>
            </div>
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div className="flex items-center gap-3">
            <UserGroupIcon className="w-5 h-5 text-primary-700" />
            <div>
              <p className="text-sm text-gray-500">Guests</p>
              <p className="font-semibold text-primary-900">Sleeps {property.maxGuests}</p>
            </div>
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div className="flex items-center gap-3">
            <MapPinIcon className="w-5 h-5 text-primary-700" />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold text-primary-900">Port Charlotte, FL</p>
            </div>
          </div>
        </div>

        {/* Mobile: 2x3 grid */}
        <div className="grid grid-cols-2 gap-4 sm:hidden">
          <div className="flex items-center gap-2">
            <HomeIcon className="w-5 h-5 text-primary-700" />
            <span className="text-sm font-semibold text-primary-900">{property.bedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <HomeIcon className="w-5 h-5 text-primary-700" />
            <span className="text-sm font-semibold text-primary-900">{property.bathrooms} Bathrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <UserGroupIcon className="w-5 h-5 text-primary-700" />
            <span className="text-sm font-semibold text-primary-900">Sleeps {property.maxGuests}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-5 h-5 text-primary-700" />
            <span className="text-sm font-semibold text-primary-900">Port Charlotte, FL</span>
          </div>
        </div>
      </div>

      {/* Image Gallery Section */}
      <section className="section-padding container-wide max-w-6xl mx-auto">
        <AnimatedSection>
          <ImageGallery images={property.images} propertyName={property.name} />
        </AnimatedSection>
      </section>

      {/* About This Property */}
      <section className="section-padding container-wide max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left column - Content */}
          <div className="lg:col-span-2">
            <AnimatedSection>
              <h2 className="text-2xl font-serif font-bold text-primary-900 mb-2">
                About This Property
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">
                {property.description}
              </p>
              <p className="text-gray-600 leading-relaxed">
                This {property.bedrooms}-bedroom, {property.bathrooms}-bathroom home offers
                the perfect blend of comfort and convenience. Located in the heart of Port
                Charlotte, you&apos;re just 25 minutes from the stunning Gulf Coast beaches.
                Enjoy the {hasHeatedPool ? "heated pool" : "swimming pool"}, fully equipped
                kitchen, and all the amenities of home.
              </p>
            </AnimatedSection>
          </div>

          {/* Right column - Booking Sidebar */}
          <div className="lg:col-span-1">
            <AnimatedSection delay={0.2}>
              <div className="bg-primary-700 rounded-2xl p-6 text-white sticky top-24">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarSolidIcon
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(property.rating)
                          ? "text-yellow-400"
                          : "text-white/30"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-white/80 ml-1">
                    ({property.reviewCount} reviews)
                  </span>
                </div>

                <div className="w-full h-px bg-white/20 mb-4" />

                {/* Quick info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <ClockIcon className="w-4 h-4 text-white/70" />
                    <span>Check-in 3:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ClockIcon className="w-4 h-4 text-white/70" />
                    <span>Check-out 11:00 AM</span>
                  </div>
                </div>

                {/* Badges */}
                <div className="space-y-2 mb-6">
                  {property.instantBook && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircleIcon className="w-4 h-4 text-accent" />
                      <span>Instant Book Available</span>
                    </div>
                  )}
                  {property.superhost && (
                    <div className="flex items-center gap-2 text-sm">
                      <ShieldCheckIcon className="w-4 h-4 text-accent" />
                      <span>Superhost</span>
                    </div>
                  )}
                </div>

                {/* Book on Airbnb button */}
                <a
                  href={property.airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    toast.success("Redirecting to Airbnb...", {
                      description:
                        "You'll be taken to the listing to complete your booking.",
                    })
                  }
                  className="block bg-[#FF5A5F] hover:bg-[#e04e52] text-white rounded-xl py-4 w-full font-semibold text-center transition-colors"
                >
                  Book on Airbnb
                </a>

                <p className="text-white/70 text-sm mt-3">
                  Response time: {property.responseTime}
                </p>
                <p className="text-white/70 text-sm">
                  {property.responseRate}% response rate
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Amenities & Features */}
      <section className="bg-gray-50 section-padding">
        <div className="container-wide max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="text-2xl font-serif font-bold text-primary-900 mb-2">
              Amenities & Features
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mb-8" />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {property.features.map((feature, index) => (
              <AnimatedSection key={feature} delay={index * 0.05}>
                <div className="flex items-center gap-3 bg-white rounded-xl p-4">
                  <CheckCircleIcon className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-link to Other Property */}
      {otherProperty && (
        <section className="section-padding container-wide max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="text-2xl font-serif font-bold text-primary-900 mb-2">
              Explore Our Other Property
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mb-8" />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <Link
              href={`/properties/${otherProperty.slug}`}
              className="group block bg-white rounded-2xl shadow-medium overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-80 h-56 sm:h-auto flex-shrink-0">
                  <Image
                    src={otherProperty.heroImage}
                    alt={otherProperty.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <h3 className="text-xl font-serif font-bold text-primary-900 mb-1 group-hover:text-primary-700 transition-colors">
                    {otherProperty.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">{otherProperty.tagline}</p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {otherProperty.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <HomeIcon className="w-4 h-4" />
                      {otherProperty.bedrooms} Bedrooms
                    </span>
                    <span className="flex items-center gap-1">
                      <UserGroupIcon className="w-4 h-4" />
                      Sleeps {otherProperty.maxGuests}
                    </span>
                    <span className="flex items-center gap-1">
                      <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                      {otherProperty.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-semibold">View Property</span>
                    <ChevronRightIcon className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </AnimatedSection>
        </section>
      )}

      {/* Back Navigation */}
      <section className="section-padding text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-900 font-medium transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to All Properties
        </Link>
      </section>
    </>
  );
}
