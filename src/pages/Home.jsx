import React, { useState, useEffect } from "react";
import FloridaGetaway from "./FloridaGetaway";
import CoastalCottage from "./CoastalCottage";
import Slider from "react-slick";
import floridaGetawayImage from "../assets/images/florida-getaway-images/exterior.jpeg";
import coastalCottageImage from "../assets/images/coastal-cottage-images/exterior (1).jpeg";
import logo from "../assets/images/logo.png";
import arrowIcon from "../assets/images/custom-arrow.png";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaArrowUp } from "react-icons/fa";
import SEO from "../components/SEO";
import ScrollProgress from "../components/ScrollProgress";
import Button from "../components/Button";

function Home() {
  const [showArrow, setShowArrow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarTransparent, setNavbarTransparent] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarTransparent(window.scrollY > 50);
      setShowArrow(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (selectedProperty !== null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedProperty]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const reviews = [
    {
      name: "Heather",
      property: "Florida Getaway",
      text: "Wonderful place to stay! Host is very responsive and helpful. This home is beautiful! Clean, comfortable and relaxing.",
      rating: 5,
    },
    {
      name: "Susan",
      property: "Florida Getaway",
      text: "Definitely, home away from home -- even better, since there was a heated swimming pool. Home was warm and inviting, comfortable and spacious. Every room was beautifully decorated, kitchen was well-equipped with plenty of spices and condiments. We will definitely stay again.",
      rating: 5,
    },
    {
      name: "Karen",
      property: "Florida Getaway",
      text: "Fantastic location. The house is more than we expected in every way!!!",
      rating: 5,
    },
    {
      name: "JD",
      property: "Coastal Cottage",
      text: "We were so excited to be able to stay blocks from our family for Christmas. I loved the location, the comforts of home and space. Coffee on the Lanai, poolside relaxation. Everything was perfect. Lisa was super responsive to all our needs while we were here. Thanks to the awesome host. We plan to be back next year if the family remains local to this area.",
      rating: 5,
    },
    {
      name: "Randi",
      property: "Coastal Cottage",
      text: "We had a great week at Lisa's beautiful home. The pictures were exactly what the house looked like. The home was stocked with everything anyone could, or would need. There were clear instructions in the house about what needed to be done, trash, etc., and we loved that all the light switches were marked! The pool was great to have, and so refreshing with the HOT weather. Lisa was very responsive when we texted her with questions, and we definitely appreciated all the small touches around the house. We especially loved the screened in patio area. This was a great space, and the ceiling fans were adequate enough to cool off the room. Thank you Lisa, for sharing your home with us!",
      rating: 5,
    },
    {
      name: "Teri",
      property: "Florida Getaway",
      text: "Had a wonderful time there. The house was very nice just like the pictures show. And Lisa was very good about responding to all my questions. Would definitely stay there again!!",
      rating: 5,
    },
  ];

  const arrowButtonStyles =
    "w-12 h-12 rounded-full bg-white/90 shadow-md hover:shadow-lg border border-gray-200 transition transform hover:scale-105 flex items-center justify-center";

  const NextArrow = ({ onClick }) => (
    <div
      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
      onClick={onClick}
    >
      <div className={arrowButtonStyles}>
        <img src={arrowIcon} alt="Next" className="w-6 h-6 rotate-0" />
      </div>
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
      onClick={onClick}
    >
      <div className={arrowButtonStyles}>
        <img src={arrowIcon} alt="Previous" className="w-6 h-6 rotate-180" />
      </div>
    </div>
  );

  const renderStars = (rating) =>
    Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={`text-yellow-400 ${
          i < rating ? "opacity-100" : "opacity-30"
        }`}
      >
        ★
      </span>
    ));

  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const resetHome = () => {
    setSelectedProperty(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94],
        scale: {
          duration: 0.3,
        }
      },
    },
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Removed unused fadeIn animation variant

  return (
    <div className="min-h-screen">
      <SEO 
        title="Nunez Vacation Homes | Luxury Vacation Rentals in Port Charlotte, Florida"
        description="Experience luxury vacation rentals in Port Charlotte, Florida. Two stunning homes with pools, near Gulf Coast beaches. Perfect for families, reunions, and relaxing getaways."
        keywords="Port Charlotte vacation rentals, Florida vacation homes, Gulf Coast rentals, family vacation rentals, luxury vacation homes Florida, heated pool rentals, beach house rentals Florida, vacation rentals near beach"
        url="https://nunezvacationhomes.com"
      />
      <ScrollProgress />
      <header
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-300 ${
          navbarTransparent ? "bg-white/80 shadow-lg" : "bg-white shadow-sm"
        }`}
        role="banner"
      >
        <motion.div
          className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="flex items-center gap-4" variants={slideUp}>
            <button
              onClick={resetHome}
              className="h-12 w-12 object-contain focus:outline-none focus:ring-2 focus:ring-teal-600 rounded-full hover:bg-neutral-50 transition-all duration-200 p-1"
              aria-label="Go to homepage"
            >
              <img
                src={logo}
                alt="Nunez Vacation Homes logo"
                className="h-full w-full object-contain"
              />
            </button>
            <div className="hidden sm:block">
              <h1 className="text-xl font-serif font-bold tracking-wide text-neutral-800">
                Nunez Vacation Homes
              </h1>
              <p className="text-xs text-neutral-500 font-medium">
                Premium Vacation Rentals
              </p>
            </div>
          </motion.div>

          <motion.nav
            className="hidden lg:flex items-center gap-2"
            variants={slideUp}
            role="navigation"
            aria-label="Main navigation"
          >
            <button
              onClick={() => resetHome()}
              className="text-neutral-700 hover:text-teal-700 hover:bg-teal-50 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 rounded-lg px-4 py-2"
            >
              Home
            </button>
            
            <div className="relative group">
              <button 
                className="text-neutral-700 hover:text-teal-700 hover:bg-teal-50 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 rounded-lg px-4 py-2 flex items-center gap-1"
                aria-expanded="false"
                aria-haspopup="true"
                aria-label="Properties menu"
              >
                Properties
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div 
                className="absolute left-0 mt-2 w-56 bg-white/95 backdrop-blur-md shadow-xl rounded-2xl border border-neutral-200 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 z-40 overflow-hidden"
                role="menu"
                aria-label="Rental properties"
              >
                <div className="py-2">
                  <button
                    onClick={() => setSelectedProperty("florida")}
                    className="block w-full text-left px-4 py-3 text-sm text-neutral-700 hover:bg-teal-50 hover:text-teal-700 focus:outline-none focus:bg-teal-50 transition-colors duration-200"
                    role="menuitem"
                  >
                    <div className="font-medium">Florida Getaway</div>
                    <div className="text-xs text-neutral-500">3 bed • 2 bath • Pool</div>
                  </button>
                  <button
                    onClick={() => setSelectedProperty("coastal")}
                    className="block w-full text-left px-4 py-3 text-sm text-neutral-700 hover:bg-teal-50 hover:text-teal-700 focus:outline-none focus:bg-teal-50 transition-colors duration-200"
                    role="menuitem"
                  >
                    <div className="font-medium">Coastal Cottage</div>
                    <div className="text-xs text-neutral-500">2 bed • 2 bath • Pool</div>
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (selectedProperty !== null) {
                  // If on a property page, go back to home first, then scroll to amenities
                  setSelectedProperty(null);
                  setTimeout(() => {
                    document.getElementById("amenities")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                } else {
                  // If on home page, scroll to amenities
                  document.getElementById("amenities")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-neutral-700 hover:text-teal-700 hover:bg-teal-50 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 rounded-lg px-4 py-2"
            >
              Amenities
            </button>

            <a
              href="mailto:info@nunezvacationhomes.com"
              className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 rounded-lg px-6 py-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Contact Us
            </a>
          </motion.nav>

          <motion.div className="lg:hidden" variants={slideUp}>
            <button 
              onClick={toggleMenu} 
              className="relative w-10 h-10 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-teal-600 rounded-lg hover:bg-neutral-50 transition-all duration-200 flex items-center justify-center"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close mobile menu" : "Open mobile menu"}
            >
              <div className="flex flex-col items-center justify-center">
                <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${menuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${menuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
              </div>
            </button>
          </motion.div>
        </motion.div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.nav 
            className="lg:hidden px-6 pb-6 pt-4 bg-white/95 backdrop-blur-md shadow-xl border-t border-neutral-200"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-2">
              <button
                className="block w-full text-left py-3 px-4 text-neutral-700 hover:text-teal-700 hover:bg-teal-50 focus:outline-none focus:text-teal-700 focus:bg-teal-50 rounded-lg transition-colors duration-200 font-medium"
                onClick={() => {
                  resetHome();
                  setMenuOpen(false);
                }}
              >
                🏠 Home
              </button>
              
              <div className="border-l-2 border-teal-100 ml-4 pl-4 space-y-1">
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Properties</p>
                <button
                  className="block w-full text-left py-2 px-3 text-sm text-neutral-600 hover:text-teal-700 hover:bg-teal-50 focus:outline-none focus:text-teal-700 focus:bg-teal-50 rounded-lg transition-colors duration-200"
                  onClick={() => {
                    setSelectedProperty("florida");
                    setMenuOpen(false);
                  }}
                >
                  <div className="font-medium">Florida Getaway</div>
                  <div className="text-xs text-neutral-400">3 bed • 2 bath • Pool</div>
                </button>
                <button
                  className="block w-full text-left py-2 px-3 text-sm text-neutral-600 hover:text-teal-700 hover:bg-teal-50 focus:outline-none focus:text-teal-700 focus:bg-teal-50 rounded-lg transition-colors duration-200"
                  onClick={() => {
                    setSelectedProperty("coastal");
                    setMenuOpen(false);
                  }}
                >
                  <div className="font-medium">Coastal Cottage</div>
                  <div className="text-xs text-neutral-400">2 bed • 2 bath • Pool</div>
                </button>
              </div>

              <button
                className="block w-full text-left py-3 px-4 text-neutral-700 hover:text-teal-700 hover:bg-teal-50 focus:outline-none focus:text-teal-700 focus:bg-teal-50 rounded-lg transition-colors duration-200 font-medium"
                onClick={() => {
                  if (selectedProperty !== null) {
                    // If on a property page, go back to home first, then scroll to amenities
                    setSelectedProperty(null);
                    setTimeout(() => {
                      document.getElementById("amenities")?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  } else {
                    // If on home page, scroll to amenities
                    document.getElementById("amenities")?.scrollIntoView({ behavior: "smooth" });
                  }
                  setMenuOpen(false);
                }}
              >
                ✨ Amenities
              </button>

              <a
                href="mailto:info@nunezvacationhomes.com"
                className="block w-full text-center py-3 px-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 font-semibold rounded-lg shadow-lg mt-4"
                onClick={() => setMenuOpen(false)}
              >
                📧 Contact Us
              </a>
            </div>
          </motion.nav>
        )}
      </header>

      {selectedProperty === "florida" ? (
        <div className="pt-24">
          <FloridaGetaway />
        </div>
      ) : selectedProperty === "coastal" ? (
        <div className="pt-24">
          <CoastalCottage />
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section
            className="h-screen relative flex flex-col justify-center items-center text-white text-center bg-cover bg-center"
            style={{ backgroundImage: `url('/images/beach-scene.jpg')` }}
            aria-label="Hero section"
            role="main"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" aria-hidden="true"></div>
            <motion.div
              className="relative z-10 p-10 rounded-xl"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-5xl md:text-6xl font-serif font-bold mb-8 drop-shadow-lg tracking-tight leading-tight"
                variants={slideUp}
                id="main-content"
              >
                Your Home Away From Home
              </motion.h2>
              <motion.div variants={slideUp}>
                <Button
                  onClick={() =>
                    document
                      .getElementById("property-links")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  size="lg"
                  className="px-10 py-4 bg-primary-700 hover:bg-primary-600 transition-all duration-300 rounded-xl text-white font-semibold text-lg shadow-large hover:shadow-xl hover:scale-105"
                  ariaLabel="Scroll to rental properties section"
                >
                  Explore Our Rentals
                </Button>
              </motion.div>
            </motion.div>
          </section>

          <main className="bg-gradient-to-br from-neutral-50 via-gold-50 to-neutral-100" role="main" aria-label="Main content">
            {/* Intro Text */}
            <motion.section
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="py-16 px-6 max-w-4xl mx-auto text-center"
            >
              <motion.div variants={slideUp} className="space-y-6">
                <h2 className="text-3xl font-serif font-bold text-neutral-800 mb-6">
                  Discover Paradise in Port Charlotte
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl mx-auto">
                  Welcome to your home away from home! Nestled in the beautiful
                  up-and-coming area of Port Charlotte, Florida. Located on the
                  Gulf Coast, just 25 minutes from the beach, you can enjoy the
                  serenity without the stress of overcrowded tourist destinations.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl mx-auto">
                  Explore our two stunning homes, conveniently located right in
                  front of and behind each other, making this the perfect spot for
                  large family gatherings and reunions. Take a dip in the pools at
                  either location and bask in all the relaxation you deserve,
                  surrounded by the meticulous love and care you'd expect in your
                  own home.
                </p>
              </motion.div>
            </motion.section>

            {/* Amenities Section */}
            <motion.section
              id="amenities"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="py-20 px-6"
            >
              <motion.h2
                variants={slideUp}
                className="text-4xl font-serif font-bold text-center mb-16 text-neutral-800"
              >
                Premium Amenities
              </motion.h2>
              
              <motion.div 
                variants={staggerContainer}
                className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                <motion.div 
                  variants={slideInLeft} 
                  className="text-center p-6 bg-white rounded-2xl shadow-medium hover:shadow-large transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm4.64-1.96l3.54 3.54 7.07-7.07 1.41 1.41L9.18 17.4l-4.95-4.95 1.41-1.41z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-serif font-bold mb-2 text-neutral-800">Heated Pools</h3>
                  <p className="text-sm text-neutral-600">Enjoy year-round swimming in our beautifully maintained heated pools</p>
                </motion.div>

                <motion.div 
                  variants={slideUp} 
                  className="text-center p-6 bg-white rounded-2xl shadow-medium hover:shadow-large transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-serif font-bold mb-2 text-neutral-800">Fully Furnished</h3>
                  <p className="text-sm text-neutral-600">Complete home furnishing with everything you need for a comfortable stay</p>
                </motion.div>

                <motion.div 
                  variants={slideUp} 
                  className="text-center p-6 bg-white rounded-2xl shadow-medium hover:shadow-large transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-serif font-bold mb-2 text-neutral-800">Prime Location</h3>
                  <p className="text-sm text-neutral-600">Just 25 minutes from Gulf Coast beaches in beautiful Port Charlotte</p>
                </motion.div>

                <motion.div 
                  variants={slideUp} 
                  className="text-center p-6 bg-white rounded-2xl shadow-medium hover:shadow-large transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-serif font-bold mb-2 text-neutral-800">Modern Kitchen</h3>
                  <p className="text-sm text-neutral-600">Fully equipped kitchen with modern appliances and all essentials</p>
                </motion.div>

                <motion.div 
                  variants={slideUp} 
                  className="text-center p-6 bg-white rounded-2xl shadow-medium hover:shadow-large transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h18v8z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-serif font-bold mb-2 text-neutral-800">Entertainment</h3>
                  <p className="text-sm text-neutral-600">Smart TVs, high-speed WiFi, and entertainment systems in every home</p>
                </motion.div>

                <motion.div 
                  variants={slideUp} 
                  className="text-center p-6 bg-white rounded-2xl shadow-medium hover:shadow-large transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9L12 2 4.5 2 12 2zm1.5 17h-2v-2H9v2H7v-2H5v2H3v-4h18v4z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-serif font-bold mb-2 text-neutral-800">Outdoor Spaces</h3>
                  <p className="text-sm text-neutral-600">Private patios, screened porches, and beautiful landscaped yards</p>
                </motion.div>

                <motion.div 
                  variants={slideUp} 
                  className="text-center p-6 bg-white rounded-2xl shadow-medium hover:shadow-large transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-serif font-bold mb-2 text-neutral-800">Free Parking</h3>
                  <p className="text-sm text-neutral-600">Convenient driveway parking with space for multiple vehicles</p>
                </motion.div>

                <motion.div 
                  variants={slideUp} 
                  className="text-center p-6 bg-white rounded-2xl shadow-medium hover:shadow-large transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.08 2.69-.08 2.69s-1.17.5-2.64.6c-.13-.17-.27-.35-.41-.53-.31-.41-.69-.77-1.08-1.08C13.93 9.5 15.1 8.8 16.64 8.8zM8.53 10.73c.3-.38.73-.68 1.22-.87.38-.15.8-.24 1.25-.24.45 0 .87.09 1.25.24.49.19.92.49 1.22.87.38.48.61 1.07.61 1.69 0 .62-.23 1.21-.61 1.69-.3.38-.73.68-1.22.87-.38.15-.8.24-1.25.24-.45 0-.87-.09-1.25-.24-.49-.19-.92-.49-1.22-.87-.38-.48-.61-1.07-.61-1.69 0-.62.23-1.21.61-1.69z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-serif font-bold mb-2 text-neutral-800">24/7 Support</h3>
                  <p className="text-sm text-neutral-600">Round-the-clock guest support for any questions or assistance needed</p>
                </motion.div>
              </motion.div>
            </motion.section>

            {/* Property Cards */}
            <motion.section
              id="property-links"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-8 py-16 px-6"
              aria-labelledby="properties-heading"
            >
              <h2 id="properties-heading" className="sr-only">
                Available Vacation Rental Properties
              </h2>
              
              {/* Florida */}
              <motion.article
                variants={fadeInScale}
                className="w-80 rounded-2xl shadow-medium bg-white overflow-hidden hover:shadow-large transition-all duration-300 border border-neutral-100"
                role="region"
                aria-labelledby="florida-heading"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img
                  src={floridaGetawayImage}
                  alt="Exterior view of Florida Getaway vacation rental showing the front entrance and landscaping"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 id="florida-heading" className="text-xl font-serif font-bold mb-3 text-neutral-800">
                    Florida Getaway
                  </h3>
                  <p className="sr-only">
                    3-bedroom, 2-bathroom vacation rental with heated pool in Port Charlotte, Florida
                  </p>
                  <motion.button
                    onClick={() => setSelectedProperty("florida")}
                    className="w-full px-6 py-3 bg-teal-700 hover:bg-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
                    aria-label="View details for Florida Getaway vacation rental"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    View Florida Getaway
                  </motion.button>
                </div>
              </motion.article>

              {/* Coastal */}
              <motion.article
                variants={fadeInScale}
                className="w-80 rounded-2xl shadow-medium bg-white overflow-hidden hover:shadow-large transition-all duration-300 border border-neutral-100"
                role="region"
                aria-labelledby="coastal-heading"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img
                  src={coastalCottageImage}
                  alt="Exterior view of Coastal Cottage vacation rental showing the charming front facade"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 id="coastal-heading" className="text-xl font-serif font-bold mb-3 text-neutral-800">
                    Coastal Cottage
                  </h3>
                  <p className="sr-only">
                    2-bedroom, 2-bathroom cozy cottage with pool in Port Charlotte, Florida
                  </p>
                  <motion.button
                    onClick={() => setSelectedProperty("coastal")}
                    className="w-full px-6 py-3 bg-teal-700 hover:bg-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
                    aria-label="View details for Coastal Cottage vacation rental"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    View Coastal Cottage
                  </motion.button>
                </div>
              </motion.article>
            </motion.section>

            {/* Reviews */}
            <motion.section
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gradient-to-br from-neutral-50 via-teal-50 to-emerald-50 py-24 px-6"
            >
              <motion.h2
                variants={slideUp}
                className="text-4xl md:text-5xl font-serif font-bold text-center mb-20 text-neutral-800"
              >
                What Our Guests Are Saying
              </motion.h2>
              <motion.div variants={slideUp} className="flex justify-center">
                <Slider {...settings} className="w-full max-w-5xl">
                  {reviews.map((review, i) => (
                    <div key={i} className="review-slide">
                      <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl px-8 py-10 md:p-12 shadow-xl border border-white/20 w-full max-w-3xl mx-auto hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
                        {/* Avatar and Header */}
                        <div className="flex items-start justify-between mb-8">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-teal-100 to-emerald-100 text-teal-700 font-bold text-2xl shadow-lg ring-4 ring-white">
                              {review.name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-amber-400 text-lg mb-1">
                                {renderStars(review.rating)}
                              </div>
                              <p className="text-sm text-neutral-500 font-medium">
                                {review.property}
                              </p>
                            </div>
                          </div>
                          <div className="text-teal-200 text-6xl leading-none opacity-30 select-none">
                            "
                          </div>
                        </div>

                        {/* Review Text */}
                        <div className="relative mb-8">
                          <div className="absolute -left-4 -top-2 text-teal-600 text-3xl opacity-20 select-none">"</div>
                          <p className="text-neutral-700 text-lg md:text-xl leading-relaxed font-medium relative z-10">
                            {review.text}
                          </p>
                          <div className="absolute -right-2 -bottom-2 text-teal-600 text-3xl opacity-20 select-none rotate-180">"</div>
                        </div>

                        {/* Footer */}
                        <div className="pt-6 border-t border-gradient-to-r from-transparent via-neutral-200 to-transparent">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-bold text-neutral-800 text-lg">
                                {review.name}
                              </p>
                              <p className="text-sm text-neutral-500 font-medium">
                                Verified Guest
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-2 rounded-full shadow-lg">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm font-semibold">Verified</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </motion.div>
            </motion.section>
          </main>
        </>
      )}

      <motion.footer 
        className="bg-neutral-800 text-white py-16 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div 
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm"
          variants={staggerContainer}
        >
          {/* About Section */}
          <motion.div variants={slideUp}>
            <motion.h4 
              className="text-lg font-serif font-bold mb-6 text-gold-400"
              variants={slideUp}
            >
              About Nunez Vacation Homes
            </motion.h4>
            <motion.p 
              className="text-neutral-300 leading-relaxed"
              variants={slideUp}
            >
              Experience the comfort of home while enjoying Florida's gulf
              coast. Our homes are crafted for relaxing escapes, family
              reunions, and memorable vacations.
            </motion.p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={slideUp}>
            <motion.h4 
              className="text-lg font-serif font-bold mb-6 text-gold-400"
              variants={slideUp}
            >
              Quick Links
            </motion.h4>
            <motion.ul 
              className="space-y-3 text-neutral-300"
              variants={staggerContainer}
            >
              <motion.li variants={slideUp}>
                <motion.button
                  onClick={() => setSelectedProperty("florida")}
                  className="hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Florida Getaway
                </motion.button>
              </motion.li>
              <motion.li variants={slideUp}>
                <motion.button
                  onClick={() => setSelectedProperty("coastal")}
                  className="hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Coastal Cottage
                </motion.button>
              </motion.li>
              <motion.li variants={slideUp}>
                <motion.a
                  href="#property-links"
                  className="hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Rentals
                </motion.a>
              </motion.li>
              <motion.li variants={slideUp}>
                <motion.a
                  href="mailto:info@nunezvacationhomes.com"
                  className="hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us
                </motion.a>
              </motion.li>
            </motion.ul>
          </motion.div>

          {/* Social Media + Airbnb */}
          <motion.div variants={slideUp}>
            <motion.h4 
              className="text-lg font-serif font-bold mb-6 text-gold-400"
              variants={slideUp}
            >
              Connect With Us
            </motion.h4>
            <motion.div 
              className="flex items-center space-x-4 mb-4"
              variants={staggerContainer}
            >
              <motion.a
                href="https://facebook.com/profile.php?id=61571860077453"
                target="_blank"
                rel="noopener noreferrer"
                variants={slideUp}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaFacebook
                  size={24}
                  className="hover:text-blue-400 transition-colors duration-200"
                />
              </motion.a>
              <motion.a
                href="https://instagram.com/nunezvacationhomes"
                target="_blank"
                rel="noopener noreferrer"
                variants={slideUp}
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaInstagram
                  size={24}
                  className="hover:text-pink-400 transition-colors duration-200"
                />
              </motion.a>
            </motion.div>
            <motion.a
              href="https://www.airbnb.com/users/show/466081621"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2"
              variants={slideUp}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg"
                alt="Airbnb"
                className="w-24 hover:opacity-90 transition-opacity duration-200"
                whileHover={{ filter: "brightness(1.2)" }}
              />
            </motion.a>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={slideUp}>
            <motion.h4 
              className="text-lg font-serif font-bold mb-6 text-gold-400"
              variants={slideUp}
            >
              Get in Touch
            </motion.h4>
            <motion.ul 
              className="space-y-3 text-neutral-300"
              variants={staggerContainer}
            >
              <motion.li variants={slideUp}>Email: info@nunezvacationhomes.com</motion.li>
              <motion.li variants={slideUp}>Port Charlotte, FL</motion.li>
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-neutral-600 mt-12 pt-8 text-center text-neutral-400 text-sm"
          variants={slideUp}
        >
          <motion.p
            variants={slideUp}
            whileHover={{ scale: 1.05 }}
          >
            © {new Date().getFullYear()} Nunez Vacation Homes. All rights
            reserved. | Designed with ❤️ by NunezDev
          </motion.p>
        </motion.div>
      </motion.footer>

      {showArrow && (
        <motion.div 
          className="fixed bottom-6 right-6 group"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:text-teal-600 hover:shadow-xl transition duration-300 relative"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            animate={{ y: [0, -3, 0] }}
            transition={{ y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
          >
            <FaArrowUp className="w-4 h-4" />
            <motion.span 
              className="absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
              initial={{ opacity: 0, y: 5 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              Back to top
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}

export default Home;
