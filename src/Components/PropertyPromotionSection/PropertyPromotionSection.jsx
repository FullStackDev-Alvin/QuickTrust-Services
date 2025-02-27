import React from 'react';
import promotionImage from './promotion/pexels-magnus-mueller-1398178-2818118.jpg'; // Import the image
import { Link } from 'react-router-dom';

const PropertyPromotionSection = () => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-start gap-2 mt-24">
      <div className="w-full lg:w-[45%] h-auto lg:h-full flex p-10 flex-col">
        <div className="flex flex-row justify-start items-center gap-2">
          <div className="w-[23px] bg-secondary rounded-md h-[40px]"></div>
        </div>
        <h1 className="font-semibold text-2xl my-8">Property Promotion & Marketing</h1>
        <p>
          Maximize your property’s visibility with our expert marketing strategies! Whether you own hotels, residential
          units, or commercial spaces, we ensure your listings stand out in a competitive market.
        </p>

        <h1 className="font-semibold text-xl my-8">Property Promotion & Marketing</h1>

        <ul>
          <p>
            We leverage the power of Facebook, Instagram, and other digital platforms to attract potential buyers,
            renters, and guests. Our targeted marketing campaigns ensure your properties reach the right audience, driving
            inquiries and conversions.
          </p>
          <li>✅ Professional Property Listings – High-quality images, videos, and compelling descriptions that captivate potential clients.</li>
          <li>✅ Social Media Management – Engaging weekly posts to maintain consistent visibility and brand awareness.</li>
          <li>✅ Paid Advertising & Boosted Listings – Reach a broader audience with strategic ad placements.</li>
          <li>✅ Virtual Tours & Video Marketing – Showcase your properties with immersive experiences.</li>
          <li>✅ SEO & Content Marketing – Optimized property descriptions and blog content to rank higher in search results.</li>
        </ul>

        <Link
          href="#"
          className="w-[200px] text-center bg-button p-2 text-primary rounded-md mt-8 hover:bg-primary hover:shadow-lg hover:text-button transition-all duration-7 ease-in-out"
        >
          Contact us
        </Link>
      </div>

      <div className="hidden lg:block lg:w-[50%] h-full items-center justify-center">
        <img
          src={promotionImage}  // Use the imported image here
          className="object-cover w-full h-full m-auto"
          alt="Property Promotion"
        />
      </div>
    </div>
  );
};

export default PropertyPromotionSection;
