import React from "react";
import { Link } from "react-router-dom"; // Import the Link component

// Import images as variables
import topImage from './Hero/Top.png';
import bLeftImage from './Hero/b-left.png';
import bRightImage from './Hero/b-right.png';


const Header_1 = () => {
  return (
    <div className="w-full p-5 md:p-10 flex flex-col mt-8 md:flex-row items-center bg-bg">
      {/* Left Section */}
      <div className="flex flex-col gap-5 items-center md:items-start justify-center w-full md:w-1/2 text-center md:text-left">
        <div className="flex flex-col gap-5 md:gap-10 w-full md:w-4/5 h-auto md:h-[300px] justify-center items-center md:items-start p-2">
          <h1 className="font-semibold text-xl md:text-2xl w-full md:w-[300px]">
            Your One-Stop Solution for Real Estate, Security & Rentals.
          </h1>
          {/* Using Link component for routing */}
          <Link
            to="/listings"  // Update to route to the correct "Contact" page
            className="w-[200px] text-center bg-button text-primary p-3 rounded-md"
          >
            Browse Our Collections
          </Link>
        </div>
      </div>

      {/* Right Section (Images) */}
      <div className="flex flex-col w-full md:w-1/2 gap-5">
        {/* Top Image */}
        <div className="w-full">
          <img
            src={topImage} // Using imported variable
            className="w-full object-cover"
            alt="A beautiful modern building with a clear sky."
          />
        </div>
        {/* Bottom Two Images */}
        <div className="flex flex-row justify-between w-full">
          <img
            src={bLeftImage} // Using imported variable
            className="w-[48%] object-cover"
            alt="Security features represented visually with modern design."
          />
          <img
            src={bRightImage} // Using imported variable
            className="w-[48%] object-cover"
            alt="Showcasing a rental property with vibrant design."
          />
        </div>
      </div>
    </div>
  );
};

export default Header_1;
