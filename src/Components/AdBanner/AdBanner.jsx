import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const gifs = [
  "./Ads/bird-cctv.gif",
  "./Ads/1.jpeg",
  "./Ads/2.jpeg", 
  "./Ads/spy-camera.gif",
  "./Ads/3.jpeg",
  "./Ads/4.jpeg",
  "./Ads/Add a heading.png",
  // "./Ads/car-rental-in-port-louis-rent-a-car-in-port-louis (1).gif",
  // "./Ads/cars-sunday.gif",
  // "./Ads/caught-in-4k-caught-in-walton.gif",
  // "./Ads/japanese-mazda-premacy2016-japanese-used-car.gif",
  // "./Ads/sobha-projects-sobha-projects-bangalore.gif",
  // "./Ads/mauritius-car-rental.gif"
];

const exitAnimations = [
  { opacity: 0, x: -100 },
  { opacity: 0, x: 100 },
  { opacity: 0, y: -100 },
  { opacity: 0, y: 100 },
  { scale: 0 },
  { rotate: 90, opacity: 0 }
];

const AdBanner = () => {
  const [currentGif, setCurrentGif] = useState(0);
  const [exitAnimIndex, setExitAnimIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setExitAnimIndex(Math.floor(Math.random() * exitAnimations.length));
      setCurrentGif((prev) => (prev + 1) % gifs.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-w-5xl m-auto mt-10 p-6 flex flex-row gap-2">
      {[0, 1, 2, 3, 4].map((offset) => (
        <motion.img 
          key={offset} 
          src={gifs[(currentGif + offset) % gifs.length]} 
          className="w-full h-48 object-contain rounded-lg shadow-lg" 
          alt="Advertisement Banner" 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={exitAnimations[exitAnimIndex]}
          transition={{ duration: 0.5 }}
        />
      ))}
    </div>
  );
};

export default AdBanner;
