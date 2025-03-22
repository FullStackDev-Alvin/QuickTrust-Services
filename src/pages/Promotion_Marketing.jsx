import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Header_2 from '../Components/Header_2/Header_2';
import PropertyPromotionSection from '../Components/PropertyPromotionSection/PropertyPromotionSection';
import AdBanner from '../Components/AdBanner/AdBanner';
import NewArrivals from '../Components/NewArrivals/NewArrivals';

const getRandomAnimation = () => {
  const animations = [
    // Fade and slide from top
    { opacity: 0, y: -50 },
    
    // Fade and slide from bottom
    { opacity: 0, y: 50 },
    
    // Bounce in from top
    { opacity: 0, y: -50, scale: 0.8, transition: { type: "spring", stiffness: 100, damping: 10 } },
    
    // Slide in from left
    { opacity: 0, x: -100 },
    
    // Slide in from right
    { opacity: 0, x: 100 },
    
    // Slide in with slight bounce effect
    { opacity: 0, y: 80, scale: 0.95, transition: { type: "spring", stiffness: 120, damping: 8 } },
    
    // Scale up pop-in
    { opacity: 0, scale: 0.5, transition: { type: "spring", stiffness: 120, damping: 12 } },
    
    // Zoom in with opacity transition
    { opacity: 0, scale: 0.7, transition: { duration: 1.8, ease: "easeOut" } },
    
    // Diagonal slide-in from top-left
    { opacity: 0, x: -80, y: -80, transition: { type: "spring", stiffness: 120, damping: 10 } },
    
    // Diagonal slide-in from bottom-right
    { opacity: 0, x: 80, y: 80, transition: { type: "spring", stiffness: 120, damping: 10 } },
    
    // Slight rotation while scaling up
    { opacity: 0, scale: 0.9, transition: { type: "spring", stiffness: 150, damping: 15 } },
  ];

  return animations[Math.floor(Math.random() * animations.length)];
};

const FadeInSection = ({ children }) => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });
  
  const randomInitial = getRandomAnimation();
  const randomAnimate = getRandomAnimation();

  return (
    <motion.div
      ref={ref}
      initial={randomInitial}
      animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : randomInitial}
      transition={{
        duration: 1.8,
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

const Promotion_Marketing = () => {
  return (
    <>
      <FadeInSection>
        <Header_2 />
      </FadeInSection>
      <FadeInSection>
        <AdBanner/>
      </FadeInSection>
      <FadeInSection>
        <PropertyPromotionSection />
      </FadeInSection>
      {/* <FadeInSection>
        <AdBanner />
      </FadeInSection> */}
      <FadeInSection>
        <NewArrivals />
      </FadeInSection>
    </>
  );
};

export default Promotion_Marketing;
