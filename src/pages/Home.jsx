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
        staggerChildren: 0.2,
      },
    },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-screen">
      <header
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-300 ${
          navbarTransparent ? "bg-white/60 shadow" : "bg-white"
        }`}
      >
        <motion.div
          className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="flex items-center gap-3" variants={slideUp}>
            <img
              src={logo}
              alt="Nunez Logo"
              className="h-10 w-10 object-contain cursor-pointer"
              onClick={resetHome}
            />
            <h1 className="text-xl font-serif font-semibold tracking-wide text-gray-800">
              Nunez Vacation Homes
            </h1>
          </motion.div>

          <motion.nav
            className="hidden md:flex items-center gap-8"
            variants={slideUp}
          >
            <div className="relative group">
              <button className="text-gray-700 hover:text-primary transition font-medium">
                Rentals ▾
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-40">
                <button
                  onClick={() => setSelectedProperty("florida")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Florida Getaway
                </button>
                <button
                  onClick={() => setSelectedProperty("coastal")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Coastal Cottage
                </button>
              </div>
            </div>
          </motion.nav>

          <motion.div className="md:hidden" variants={slideUp}>
            <button onClick={toggleMenu} className="text-2xl text-gray-800">
              {menuOpen ? "✕" : "☰"}
            </button>
          </motion.div>
        </motion.div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 pt-2 bg-white shadow-sm">
            <button
              className="block w-full text-left py-2 text-gray-700 hover:text-primary"
              onClick={() => {
                setSelectedProperty("florida");
                setMenuOpen(false);
              }}
            >
              Florida Getaway
            </button>
            <button
              className="block w-full text-left py-2 text-gray-700 hover:text-primary"
              onClick={() => {
                setSelectedProperty("coastal");
                setMenuOpen(false);
              }}
            >
              Coastal Cottage
            </button>
          </div>
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
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
            <motion.div
              className="relative z-10 p-10 rounded-xl"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h1
                className="text-5xl md:text-6xl font-serif mb-6 drop-shadow-lg"
                variants={slideUp}
              >
                Your Home Away From Home
              </motion.h1>
              <motion.button
                variants={slideUp}
                onClick={() =>
                  document
                    .getElementById("property-links")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-3 bg-primary hover:bg-accent transition rounded text-white font-semibold text-lg shadow-lg"
              >
                Explore Our Rentals
              </motion.button>
            </motion.div>
          </section>

          <main className="bg-[#f2e4d9]">
            {/* Intro Text */}
            <motion.section
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-6 max-w-4xl mx-auto text-center text-lg text-gray-700"
            >
              <motion.p variants={slideUp}>
                Welcome to your home away from home! Nestled in the beautiful
                up-and-coming area of Port Charlotte, Florida. Located on the
                Gulf Coast, just 25 minutes from the beach, you can enjoy the
                serenity without the stress of overcrowded tourist destinations.
                Explore our two stunning homes, conveniently located right in
                front of and behind each other, making this the perfect spot for
                large family gatherings and reunions. Take a dip in the pools at
                either location and bask in all the relaxation you deserve,
                surrounded by the meticulous love and care you’d expect in your
                own home.
              </motion.p>
            </motion.section>

            {/* Property Cards */}
            <motion.section
              id="property-links"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-10 py-12"
            >
              {/* Florida */}
              <motion.div
                variants={slideUp}
                className="w-80 rounded-xl shadow-lg ..."
              >
                <img
                  src={floridaGetawayImage}
                  alt="Florida Getaway"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Florida Getaway
                  </h3>
                  <button
                    onClick={() => setSelectedProperty("florida")}
                    className="w-full text-center bg-primary text-white py-2 rounded hover:bg-accent transition"
                  >
                    View Florida Getaway
                  </button>
                </div>
              </motion.div>

              {/* Coastal */}
              <motion.div
                variants={slideUp}
                className="w-80 rounded-xl shadow-lg ..."
              >
                <img
                  src={coastalCottageImage}
                  alt="Coastal Cottage"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Coastal Cottage
                  </h3>
                  <button
                    onClick={() => setSelectedProperty("coastal")}
                    className="w-full text-center bg-primary text-white py-2 rounded hover:bg-accent transition"
                  >
                    View Coastal Cottage
                  </button>
                </div>
              </motion.div>
            </motion.section>

            {/* Reviews */}
            <motion.section
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#f2e4d9] via-[#f7f3ed] to-[#f2e4d9] py-20 px-4"
            >
              <motion.h2
                variants={slideUp}
                className="text-4xl font-serif text-center mb-12 text-gray-800"
              >
                What Our Guests Are Saying
              </motion.h2>
              <motion.div variants={slideUp} className="flex justify-center">
                <Slider {...settings} className="w-full max-w-4xl">
                  {reviews.map((review, i) => (
                    <div key={i} className="review-slide">
                      <div className="relative bg-white rounded-3xl px-6 py-8 md:p-10 shadow-xl border border-gray-100 w-full max-w-2xl mx-auto hover:shadow-2xl transition-all duration-300">
                        {/* Avatar and Opening Quote */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 font-bold text-xl shadow-inner">
                            {review.name.charAt(0)}
                          </div>
                          <div className="text-yellow-400 text-4xl leading-none opacity-70">
                            “
                          </div>
                        </div>

                        {/* Review Text */}
                        <div className="relative">
                          <p className="text-gray-800 text-lg md:text-xl italic font-light leading-relaxed">
                            {review.text}
                          </p>
                          <div className="text-yellow-400 text-4xl leading-none opacity-70 text-right mt-2 pr-1">
                            ”
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <p className="font-semibold text-gray-900 text-base">
                            - {review.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {review.property}
                          </p>
                          <div className="mt-1 text-yellow-400 text-base">
                            {renderStars(review.rating)}
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

      <footer className="bg-[#1f2937] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
          {/* About Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              About Nunez Vacation Homes
            </h4>
            <p className="text-gray-300 leading-relaxed">
              Experience the comfort of home while enjoying Florida's gulf
              coast. Our homes are crafted for relaxing escapes, family
              reunions, and memorable vacations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button
                  onClick={() => setSelectedProperty("florida")}
                  className="hover:text-white transition"
                >
                  Florida Getaway
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedProperty("coastal")}
                  className="hover:text-white transition"
                >
                  Coastal Cottage
                </button>
              </li>
              <li>
                <a
                  href="#property-links"
                  className="hover:text-white transition"
                >
                  Explore Rentals
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@nunezvacationhomes.com"
                  className="hover:text-white transition"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media + Airbnb */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex items-center space-x-4 mb-4">
              <a
                href="https://facebook.com/profile.php?id=61571860077453"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook
                  size={24}
                  className="hover:text-blue-400 transition"
                />
              </a>
              <a
                href="https://instagram.com/nunezvacationhomes"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram
                  size={24}
                  className="hover:text-pink-400 transition"
                />
              </a>
            </div>
            <a
              href="https://www.airbnb.com/users/show/466081621"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg"
                alt="Airbnb"
                className="w-24 hover:opacity-90 transition"
              />
            </a>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@nunezvacationhomes.com</li>
              <li>Port Charlotte, FL</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} Nunez Vacation Homes. All rights
          reserved. | Designed with ❤️ by NunezDev
        </div>
      </footer>

      {showArrow && (
        <div className="fixed bottom-6 right-6 group">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:text-primary hover:shadow-xl transition duration-300 relative"
          >
            <FaArrowUp className="w-4 h-4 animate-bounce" />
            <span className="absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Back to top
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
