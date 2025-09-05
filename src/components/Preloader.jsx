import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/images/logo.png';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          setTimeout(() => {
            onComplete?.();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  const containerVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      scale: 0.8,
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const logoVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2
      }
    }
  };

  const progressVariants = {
    initial: { width: "0%" },
    animate: { 
      width: `${progress}%`,
      transition: { 
        duration: 0.1,
        ease: "linear"
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.5,
        duration: 0.6
      }
    }
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div 
          className="fixed inset-0 z-50 bg-gradient-to-br from-primary via-primary/90 to-accent flex flex-col items-center justify-center"
          variants={containerVariants}
          initial="initial"
          exit="exit"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Logo */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            className="mb-8"
          >
            <div className="relative">
              <img 
                src={logo} 
                alt="Nunez Vacation Homes" 
                className="w-20 h-20 object-contain filter drop-shadow-lg"
              />
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 
            variants={textVariants}
            initial="initial"
            animate="animate"
            className="text-white text-2xl font-serif font-bold mb-2 text-center"
          >
            Nunez Vacation Homes
          </motion.h1>

          <motion.p 
            variants={textVariants}
            initial="initial"
            animate="animate"
            className="text-white/80 text-sm mb-12 text-center max-w-xs"
          >
            Your Home Away From Home
          </motion.p>

          {/* Progress Bar */}
          <div className="w-64 bg-white/20 rounded-full h-1 mb-4 overflow-hidden">
            <motion.div 
              variants={progressVariants}
              initial="initial"
              animate="animate"
              className="h-full bg-white rounded-full"
            />
          </div>

          {/* Progress Text */}
          <motion.p 
            className="text-white/70 text-sm font-medium"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading {progress}%
          </motion.p>

          {/* Floating elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                style={{
                  left: `${20 + (i * 15)}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;