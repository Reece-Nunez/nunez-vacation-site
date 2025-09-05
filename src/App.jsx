import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FloridaGetaway from "./pages/FloridaGetaway";
import CoastalCottage from "./pages/CoastalCottage";
import ErrorBoundary from "./components/ErrorBoundary";
import Preloader from "./components/Preloader";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload critical images and resources
    const criticalImages = [
      '/images/beach-scene.jpg',
      '/images/logo.png'
    ];

    const preloadImages = criticalImages.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    });

    // Wait for all critical resources to load
    Promise.allSettled(preloadImages).finally(() => {
      // Ensure minimum loading time for better UX
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    });
  }, []);

  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/florida-getaway" element={<FloridaGetaway />} />
        <Route path="/coastal-cottage" element={<CoastalCottage />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
