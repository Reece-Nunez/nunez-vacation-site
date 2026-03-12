"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import PropertyCard from "@/components/PropertyCard";
import AmenityCard from "@/components/AmenityCard";
import TestimonialSlider from "@/components/TestimonialSlider";
import ScrollProgress from "@/components/ScrollProgress";
import { properties, amenities, testimonials, siteConfig } from "@/lib/data";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />

      {/* ─── Hero Section ─── */}
      <section className="relative min-h-screen flex items-center justify-center">
        <Image
          src="/images/beach-scene.jpg"
          alt="Port Charlotte beach scene"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm mb-8"
          >
            Welcome to Port Charlotte, Florida
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Your Home Away
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              From Home
            </motion.span>
          </h1>

          <motion.p
            className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Discover luxury vacation rentals nestled in beautiful Port Charlotte,
            just minutes from stunning Gulf Coast beaches.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <motion.a
              href="#properties"
              className="bg-accent hover:bg-accent-dark text-white rounded-full px-8 py-4 font-semibold transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Our Rentals
            </motion.a>
            <motion.a
              href="#amenities"
              className="border-2 border-white/40 hover:border-white text-white rounded-full px-8 py-4 font-semibold transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Amenities
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDownIcon className="w-8 h-8 text-white/70" />
        </motion.div>
      </section>

      {/* ─── Introduction Section ─── */}
      <section id="about" className="section-padding container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimatedSection direction="left">
            <span className="text-accent font-semibold tracking-widest text-sm uppercase">
              Discover Paradise
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-900 mt-3">
              Experience the Best of Port Charlotte
            </h2>
            <div className="w-20 h-1 bg-gold-400 mt-4" />
            <p className="text-gray-600 leading-relaxed mt-6">
              Nestled in the beautiful up-and-coming area of Port Charlotte,
              Florida, our vacation homes offer the perfect blend of comfort and
              adventure. Located on the Gulf Coast, just 25 minutes from the
              beach, you&apos;ll find everything you need for an unforgettable
              getaway.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Whether you&apos;re planning a large family gathering, a romantic
              retreat, or a relaxing solo escape, our fully furnished homes with
              heated pools provide the ideal setting. Take a dip in the pool,
              explore nearby beaches, or simply unwind in your home away from
              home.
            </p>

            <div className="flex gap-8 mt-8">
              <div>
                <span className="text-3xl font-bold text-primary-700">2</span>
                <p className="text-sm text-gray-500">Luxury Homes</p>
              </div>
              <div>
                <span className="text-3xl font-bold text-primary-700">5.0</span>
                <p className="text-sm text-gray-500">Guest Rating</p>
              </div>
              <div>
                <span className="text-3xl font-bold text-primary-700">100+</span>
                <p className="text-sm text-gray-500">Happy Guests</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <motion.div
              className="rounded-2xl overflow-hidden shadow-large"
              initial={{ rotate: 2 }}
              whileInView={{ rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/images/properties/florida-getaway/pool.jpeg"
                alt="Luxury pool at Port Charlotte vacation home"
                width={600}
                height={500}
                className="object-cover w-full h-full"
              />
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Amenities Section ─── */}
      <section id="amenities" className="bg-gray-50 section-padding">
        <div className="container-wide">
          <AnimatedSection direction="up">
            <div className="text-center mb-12">
              <span className="text-accent font-semibold tracking-widest text-sm uppercase">
                What We Offer
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-900 mt-3">
                Premium Amenities
              </h2>
              <div className="w-20 h-1 bg-gold-400 mt-4 mx-auto" />
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Every detail has been thoughtfully curated to ensure your comfort
                and enjoyment.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((amenity, index) => (
              <AmenityCard key={index} amenity={amenity} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Properties Section ─── */}
      <section id="properties" className="section-padding container-wide">
        <AnimatedSection direction="up">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold tracking-widest text-sm uppercase">
              Our Properties
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-900 mt-3">
              Find Your Perfect Escape
            </h2>
            <div className="w-20 h-1 bg-gold-400 mt-4 mx-auto" />
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Choose from our handpicked vacation homes, each offering a unique
              experience with all the comforts of home.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ─── Testimonials Section ─── */}
      <section className="bg-primary-900 section-padding">
        <div className="container-wide">
          <AnimatedSection direction="up">
            <div className="text-center mb-12">
              <span className="text-accent font-semibold tracking-widest text-sm uppercase">
                Guest Reviews
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-3">
                What Our Guests Say
              </h2>
              <div className="w-20 h-1 bg-gold-400 mt-4 mx-auto" />
            </div>
          </AnimatedSection>

          <TestimonialSlider testimonials={testimonials} />

          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <span className="bg-white/10 rounded-full px-4 py-2 text-white/80 text-sm">
              Superhost
            </span>
            <span className="bg-white/10 rounded-full px-4 py-2 text-white/80 text-sm">
              5.0<StarIcon className="w-4 h-4 inline-block align-text-top" /> Average
            </span>
            <span className="bg-white/10 rounded-full px-4 py-2 text-white/80 text-sm">
              39 Reviews
            </span>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="section-padding">
        <motion.div
          className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-3xl p-12 text-center text-white max-w-4xl mx-auto shadow-large"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Ready for Your Dream Vacation?
          </h2>
          <p className="text-white/80 mt-4 text-lg max-w-xl mx-auto">
            Book your stay today and experience the magic of Port Charlotte.
          </p>
          <motion.a
            href="#properties"
            className="inline-block bg-accent hover:bg-accent-dark rounded-full px-8 py-4 font-semibold text-white mt-8 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Browse Properties
          </motion.a>
        </motion.div>
      </section>
    </>
  );
}
