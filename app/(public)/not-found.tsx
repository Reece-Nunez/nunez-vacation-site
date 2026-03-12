"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center px-4"
      >
        <h1 className="text-9xl font-bold text-primary-600 font-playfair">
          404
        </h1>
        <h2 className="mt-4 text-3xl font-semibold text-primary-800">
          Page Not Found
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block px-8 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
