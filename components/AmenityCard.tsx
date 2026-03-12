"use client";

import { motion } from "framer-motion";
import { ComponentType } from "react";
import {
  FireIcon,
  HomeModernIcon,
  MapPinIcon,
  CakeIcon,
  TvIcon,
  SunIcon,
  PhoneIcon,
  KeyIcon,
  StarIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

interface AmenityCardProps {
  amenity: {
    title: string;
    description: string;
    icon: string;
  };
  index: number;
}

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  fire: FireIcon,
  home: HomeModernIcon,
  "map-pin": MapPinIcon,
  "fork-knife": CakeIcon,
  tv: TvIcon,
  sun: SunIcon,
  car: BuildingOfficeIcon,
  phone: PhoneIcon,
  key: KeyIcon,
};

export default function AmenityCard({ amenity, index }: AmenityCardProps) {
  const Icon = iconMap[amenity.icon] || StarIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition group"
    >
      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-semibold text-primary-800 mt-4">{amenity.title}</h3>
      <p className="text-sm text-gray-500 mt-2">{amenity.description}</p>
    </motion.div>
  );
}
