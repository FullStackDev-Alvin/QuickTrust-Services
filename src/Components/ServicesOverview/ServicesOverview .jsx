import React from "react";

// Importing images for the service icons
import constructionMaterialsIcon from './Services_Icons/icons8-worker-beard-60.png';
import realEstateIcon from './Services_Icons/icons8-apartment-52.png';
import eventCarRentalsIcon from './Services_Icons/icons8-lease-60.png';
import securitySolutionsIcon from './Services_Icons/icons8-ptz-camera-60.png';
import landAcquisitionIcon from './Services_Icons/icons8-land-sales-60.png';
import propertyMarketingIcon from './Services_Icons/icons8-worker-beard-60.png';

const ServicesOverview = () => {
  return (
    <div className="w-full flex flex-col p-5 md:p-10 mt-14 mb-12">
      {/* Title Section */}
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex flex-row justify-start items-center gap-2">
          <div className="w-[23px] bg-secondary rounded-md h-[40px]"></div>
          <h3 className="font-bold text-secondary">Services</h3>
        </div>
        <h1 className="font-semibold text-2xl md:text-3xl">Services Overview Section</h1>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Service Card: Construction Materials */}
        <div className="flex flex-col p-4 w-full shadow-lg min-h-[200px] gap-2 justify-center items-center text-center">
          <img
            src={constructionMaterialsIcon}
            className="w-[60px]"
            alt="Construction Materials"
          />
          <h2 className="font-semibold text-lg">Construction Materials</h2>
          <p className="text-sm">High-quality construction materials</p>
        </div>

        {/* Service Card: Real Estate */}
        <div className="flex flex-col p-4 w-full shadow-lg min-h-[200px] gap-2 justify-center items-center text-center">
          <img
            src={realEstateIcon}
            className="w-[60px]"
            alt="Real Estate"
          />
          <h2 className="font-semibold text-lg">Real Estate</h2>
          <p className="text-sm">Premium apartment rentals</p>
        </div>

        {/* Service Card: Event Car Rentals */}
        <div className="flex flex-col p-4 w-full shadow-lg min-h-[200px] gap-2 justify-center items-center text-center">
          <img
            src={eventCarRentalsIcon}
            className="w-[60px]"
            alt="Event Car Rentals"
          />
          <h2 className="font-semibold text-lg">Event Car Rentals</h2>
          <p className="text-sm">Professional car rental services for events</p>
        </div>

        {/* Service Card: Security Solutions */}
        <div className="flex flex-col p-4 w-full shadow-lg min-h-[200px] gap-2 justify-center items-center text-center">
          <img
            src={securitySolutionsIcon}
            className="w-[60px]"
            alt="Security Solutions"
          />
          <h2 className="font-semibold text-lg">Security Solutions</h2>
          <p className="text-sm">Offering advanced technology to enhance security</p>
        </div>

        {/* Service Card: Land Acquisition */}
        <div className="flex flex-col p-4 w-full shadow-lg min-h-[200px] gap-2 justify-center items-center text-center">
          <img
            src={landAcquisitionIcon}
            className="w-[60px]"
            alt="Land Acquisition"
          />
          <h2 className="font-semibold text-lg">Land Acquisition & Sales</h2>
          <p className="text-sm">Expertise in purchasing & selling land</p>
        </div>

        {/* Service Card: Property Marketing */}
        <div className="flex flex-col p-4 w-full shadow-lg min-h-[200px] gap-2 justify-center items-center text-center">
          <img
            src={propertyMarketingIcon}
            className="w-[60px]"
            alt="Property Marketing"
          />
          <h2 className="font-semibold text-lg">Property Promotion & Marketing</h2>
          <p className="text-sm">Marketing strategies on platforms like Facebook, Instagram, etc.</p>
        </div>
      </div>
    </div>
  );
};

export default ServicesOverview;
