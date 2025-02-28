import React from 'react';
import { Link } from 'react-router-dom';
// import heroImage from ''; // Import the image

const Header_2 = () => {
  return (
    <div className="w-full p-5 md:p-10 flex flex-col h-screen md:flex-row items-center bg-light_grey justify-between">
      {/* Left Section */}
      <div className="flex flex-col gap-5 items-center md:items-start justify-center w-full md:w-1/2 text-center md:text-left">
        <div className="flex flex-col gap-5 md:gap-10 w-full md:w-4/5 h-auto md:h-[300px] justify-center items-center md:items-start p-2">
          <h1 className="font-semibold text-xl md:text-2xl w-full md:w-[300px]">
          Looking to book an apartment or rent a car? You’re in the right place! Whether you need a rental or want to list your property, we’ve got you covered. Contact us today
          </h1>
          <Link to="/contact" className="w-[200px] text-center bg-button text-primary p-3 rounded-md">
            Contact Us
          </Link>
        </div>
      </div>

      {/* Right Section (Images) */}
      <div className="flex w-full h-full md:w-1/2 gap-5 justify-center items-center">
        {/* Top Image */}
        <img src="https://res.cloudinary.com/dhm8wroqe/image/upload/v1740681724/uploads/ggjfdju3mff6cgwtgsit.webp" className="h-[65%] w-full rounded-full" alt="Hero Section" />
      </div>
    </div>
  );
};

export default Header_2;
