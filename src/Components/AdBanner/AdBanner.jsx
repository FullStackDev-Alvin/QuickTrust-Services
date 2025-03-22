import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ads = [
  "./Ads/bird-cctv.gif",
  "./Ads/WhatsApp Image 2025-03-22 at 2.25.00 PM.jpeg",
  "./Ads/6f349cd5.jpg", 
  "./Ads/spy-camera.gif",
  "./Ads/best-in-buidings.jpg",
  "./Ads/WhatsApp Image 2025-03-22 at 2.24.56 PM.jpeg",
  "./Ads/Add a heading.png"
];

const AdBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div className="w-full p-4">
      {/* Laptop View - Looping Ads */}
      <div className="hidden md:grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <motion.img
            key={index}
            src={ads[(currentIndex + index) % ads.length]} 
            className="w-full h-48 object-cover rounded-lg shadow-md"
            alt="Ad"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.7 }}
          />
        ))}
      </div>

      {/* Mobile View - Single Scrolling Ad */}
      <div
        className="relative block md:hidden w-full h-60 overflow-hidden rounded-lg shadow-md"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <AnimatePresence>
          <motion.img
            key={ads[currentIndex]}
            src={ads[currentIndex]}
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            alt="Ad Banner"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.7 }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdBanner;
