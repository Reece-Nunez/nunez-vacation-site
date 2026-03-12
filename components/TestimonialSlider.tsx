"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { Testimonial } from "@/lib/data";

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

export default function TestimonialSlider({
  testimonials,
}: TestimonialSliderProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  // Auto-rotate every 6 seconds
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  if (!testimonials.length) return null;

  const testimonial = testimonials[current];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Arrow buttons */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-14 z-10 w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-primary-700 hover:bg-primary-50 transition"
        aria-label="Previous testimonial"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-14 z-10 w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-primary-700 hover:bg-primary-50 transition"
        aria-label="Next testimonial"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>

      {/* Testimonial card */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white rounded-2xl p-8 sm:p-12 shadow-soft"
          >
            {/* Star Rating */}
            <div className="flex items-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-5 h-5 ${
                    i < testimonial.rating ? "text-gold" : "text-gray-200"
                  }`}
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="italic font-serif text-lg text-primary-900 leading-relaxed">
              &ldquo;{testimonial.text}&rdquo;
            </blockquote>

            {/* Reviewer */}
            <div className="mt-6">
              <p className="font-semibold text-primary-800">
                {testimonial.name}
              </p>
              <p className="text-sm text-gray-500">{testimonial.property}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === current ? "bg-accent" : "bg-gray-300"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
