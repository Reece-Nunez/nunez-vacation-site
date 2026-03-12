"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const properties = [
  { name: "Florida Getaway", href: "/properties/florida-getaway" },
  { name: "Coastal Cottage", href: "/properties/coastal-cottage" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "#", dropdown: true },
  { name: "Amenities", href: "/#amenities" },
  { name: "Contact", href: "/#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solid = scrolled || !isHome;
  const textColor = solid ? "text-gray-700" : "text-white";
  const logoTextColor = solid ? "text-primary-700" : "text-white";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Nunez Vacation Homes"
            width={48}
            height={48}
            className={`rounded-md transition-all duration-300 ${
              !solid ? "brightness-0 invert" : ""
            }`}
          />
          <span
            className={`font-serif text-xl font-bold transition-colors duration-300 ${logoTextColor}`}
          >
            Nunez Vacation Homes
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 ${textColor} hover:text-accent`}
                >
                  {link.name}
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-2 w-56 overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-black/5"
                    >
                      {properties.map((property) => (
                        <Link
                          key={property.href}
                          href={property.href}
                          className={`block px-5 py-3 text-sm text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-700 ${
                            isActive(property.href)
                              ? "bg-primary-50 font-semibold text-primary-700"
                              : ""
                          }`}
                        >
                          {property.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-300 ${textColor} hover:text-accent`}
              >
                {link.name}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-accent"
                  />
                )}
              </Link>
            )
          )}

          {/* Book Now CTA */}
          <Link
            href="/#properties"
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className={`lg:hidden ${textColor}`}
          aria-label="Open menu"
        >
          <Bars3Icon className="h-7 w-7" />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b px-5 py-4">
                <span className="font-serif text-lg font-bold text-primary-700">
                  Menu
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              <div className="flex flex-col px-5 py-6">
                {navLinks.map((link) =>
                  link.dropdown ? (
                    <div key={link.name} className="border-b border-gray-100">
                      <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex w-full items-center justify-between py-3 text-base font-medium text-gray-700"
                      >
                        {link.name}
                        <ChevronDownIcon
                          className={`h-5 w-5 transition-transform duration-200 ${
                            dropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            {properties.map((property) => (
                              <Link
                                key={property.href}
                                href={property.href}
                                onClick={() => setMobileOpen(false)}
                                className={`block py-2 pl-4 text-sm transition-colors hover:text-primary-700 ${
                                  isActive(property.href)
                                    ? "font-semibold text-primary-700"
                                    : "text-gray-500"
                                }`}
                              >
                                {property.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`border-b border-gray-100 py-3 text-base font-medium transition-colors hover:text-primary-700 ${
                        isActive(link.href)
                          ? "text-primary-700"
                          : "text-gray-700"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )
                )}

                {/* Mobile Book Now */}
                <Link
                  href="/#properties"
                  onClick={() => setMobileOpen(false)}
                  className="mt-6 block rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
