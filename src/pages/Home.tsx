import React,{useState}from 'react'
import Header_1 from '../Components/Header_!/Header_1'
import ListingsSection from '../Components/ListingsSection/ListingsSection'
import ServicesOverview from '../Components/ServicesOverview/ServicesOverview '
import WhyChooseUs from '../Components/WhyChooseUs/WhyChooseUs'
import AdBanner from '../Components/AdBanner/AdBanner'
import NewArrivals from '../Components/NewArrivals/NewArrivals'
import LandAcquisition from '../Components/LandAcquisition/LandAcquisition';
import ConstructionMaterials from '../Components/ConstructionMaterials/ConstructionMaterials';
import Rentals from '../Components/Rentals/Rentals';
import SecuritySolutions from '../Components/SecuritySolutions/SecuritySolutions';
import Apartments from '../Components/Apartments/Apartments'
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Array of modern animations with effects like bounce, slide-in, and fade
const randomAnimations = [
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

const FadeInSection = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Allows animation to trigger multiple times
    threshold: 0.2, // Adjusts when the animation should start
  });

  // Pick a random animation from the array
  const randomIndex = Math.floor(Math.random() * randomAnimations.length);
  const randomStart = randomAnimations[randomIndex];
  const randomEnd = { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }; // Final position

  return (
    <motion.div
      ref={ref}
      initial={randomStart} // Start position with random values
      animate={inView ? randomEnd : randomStart} // Animate based on visibility
      transition={{
        duration: 1.8,
        ease: "easeInOut",
        type: "spring", // Optional for more realistic effects
        stiffness: 100,
        damping: 15,
      }}
    >
      {children}
    </motion.div>
  );
};
const Home = () => {
    const [selectedComponent, setSelectedComponent] = useState('land');
    
        // Handler function to update the selected component
        const handleNavbarClick = (component) => {
            setSelectedComponent(component);
        };
    return (
      <>
        <FadeInSection>
          <AdBanner/>
        </FadeInSection>
        <ListingsSection onspanClick={handleNavbarClick}/>
          {/* Render child components based on the selected state */}
        <div>
            {selectedComponent === 'land' && <FadeInSection><LandAcquisition /></FadeInSection>}
            {selectedComponent === 'construction' && <FadeInSection><ConstructionMaterials /></FadeInSection>}
            {selectedComponent === 'rentals' && <FadeInSection><Rentals /></FadeInSection>}
            {selectedComponent === 'security' && <FadeInSection><SecuritySolutions /></FadeInSection>}
            {selectedComponent === 'appartments' && <FadeInSection><Apartments /></FadeInSection>}
        </div>

        <FadeInSection>
            <Header_1 />
        </FadeInSection>
        
        <FadeInSection>
            <WhyChooseUs />
        </FadeInSection>
        <FadeInSection>
          <AdBanner/>
        </FadeInSection>
        <FadeInSection>
            <NewArrivals />
        </FadeInSection>
          
      </>
    )
}

export default Home