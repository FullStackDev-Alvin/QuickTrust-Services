import React from "react";

// Import the image
import whyChooseImage from './Why us/portrait-two-african-females-holding-shopping-bags-while-reacting-something-their-smartphone 1.png';

const WhyChooseUs = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row  items-center justify-start gap-2 mt-24">
      {/* Left Section */}
      <div className="w-full lg:w-[45%] h-auto lg:h-[400px] p-10">
        <div className="flex flex-row justify-start items-center gap-2">
          <div className="w-[23px] bg-secondary rounded-md h-[40px]"></div>
        </div>
        <h1 className="font-semibold text-2xl my-8">Why Choose Us?</h1>

        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-row">
            <p>
              <label className="text-secondary font-semibold">Expertise You Can Trust</label> – Years of experience in real estate, security, and rentals.
            </p>
          </div>
          <div className="flex flex-row">
            <p>
              <label className="text-secondary font-semibold">Quality & Reliability</label> – Premium properties, top-tier construction materials, and advanced security solutions.
            </p>
          </div>
          <div className="flex flex-row">
            <p>
              <label className="text-secondary font-semibold">Seamless Process</label> – Hassle-free transactions with transparent pricing and professional support.
            </p>
          </div>
          <div className="flex flex-row">
            <p>
              <label className="text-secondary font-semibold">Tailored Solutions</label> – Whether you’re buying, renting, or securing your property, we provide custom solutions to meet your needs.
            </p>
          </div>
          <div className="flex flex-row">
            <p>
              <label className="text-secondary font-semibold">Global Reach, Local Excellence</label> – Offices in Rwanda & China to ensure the best deals and quality imports.
            </p>
          </div>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="hidden lg:block lg:w-[50%] lg:h-auto">
        <img
          src={whyChooseImage}
          className="object-cover rounded-md"
          alt="Two African females holding shopping bags while reacting to something on their smartphone."
        />
      </div>
    </div>
  );
};

export default WhyChooseUs;
