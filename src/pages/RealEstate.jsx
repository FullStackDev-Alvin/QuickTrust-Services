import React from 'react';
import Header_2 from '../Components/Header_2/Header_2';
import RentalHostingSection from '../Components/RentalHostingSection/RentalHostingSection';
import AdBanner from '../Components/AdBanner/AdBanner';
import NewArrivals from '../Components/NewArrivals/NewArrivals';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Array of modern animations with bounce, slide-in, and fade effects
const randomAnimations = [
  { opacity: 0, y: -50 },
  { opacity: 0, y: 50 },
  { opacity: 0, y: -50, scale: 0.8, transition: { type: "spring", stiffness: 100, damping: 10 } },
  { opacity: 0, x: -100 },
  { opacity: 0, x: 100 },
  { opacity: 0, y: 80, scale: 0.95, transition: { type: "spring", stiffness: 120, damping: 8 } },
  { opacity: 0, scale: 0.5, transition: { type: "spring", stiffness: 120, damping: 12 } },
  { opacity: 0, scale: 0.7, transition: { duration: 0.3, ease: "easeOut" } },
  { opacity: 0, x: -80, y: -80, transition: { type: "spring", stiffness: 120, damping: 10 } },
  { opacity: 0, x: 80, y: 80, transition: { type: "spring", stiffness: 120, damping: 10 } },
  { opacity: 0, scale: 0.9, transition: { type: "spring", stiffness: 150, damping: 15 } },
];

const FadeInSection = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Allows animation to trigger multiple times
    threshold: 0.2, // Adjusts when the animation should start
  });

  // Pick a random animation from the array
  const randomIndex = Math.floor(Math.random() * randomAnimations.length);
  const randomStart = randomAnimations[randomIndex];
  const randomEnd = { opacity: 1, y: 0, x: 0, scale: 1 };

  return (
    <motion.div
      ref={ref}
      initial={randomStart}
      animate={inView ? randomEnd : randomStart}
      transition={{
        duration: 0.7,
        ease: "easeInOut",
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
    >
      {children}
    </motion.div>
  );
};

const RealEstate = () => {
  return (
    <>
      <FadeInSection>
        <Header_2 />
      </FadeInSection>
      <FadeInSection>
        <AdBanner/>
      </FadeInSection>
      <FadeInSection>
        <RentalHostingSection />
      </FadeInSection>

      {/* Uncomment if needed */}
      {/* <FadeInSection>
        <AdBanner />
      </FadeInSection> */}
      <FadeInSection>
        <AdBanner/>
      </FadeInSection>
      <FadeInSection>
        <NewArrivals />
      </FadeInSection>
    </>
  );
};

export default RealEstate;
