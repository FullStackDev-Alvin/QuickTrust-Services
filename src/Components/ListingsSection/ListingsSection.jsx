import React from 'react';
// import { span } from 'react-router-dom';

// Import images as variables
import landAcquisitionIcon from './Services_Icons/icons8-land-sales-60.png';
import constructionMaterialsIcon from './Services_Icons/icons8-worker-beard-60.png';
import carRentalIcon from './Services_Icons/icons8-lease-60.png';
import securitySolutionsIcon from './Services_Icons/icons8-ptz-camera-60.png';

const ListingsSection = ({onspanClick }) => {
  return (
    <div className="w-full flex flex-col p-5 md:p-10 mt-14 mb-12" id="listings">
      {/* Title Section */}
      <div  className="flex flex-col gap-2 mb-6">
        <div className="flex flex-row justify-start items-center gap-2">
          <div className="w-[23px] bg-secondary rounded-md h-[40px]"></div>
          <h3 className="font-bold text-secondary">Categories</h3>
        </div>
        <h1 className="font-semibold text-2xl md:text-3xl">Browse by Category</h1>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Land Acquisition & Sales Card */}
        <span  onClick={() => onspanClick('land')} className="bg-primary hover:cursor-pointer hover:bg-secondary hover:text-bg transition-all duration-300 ease-in-out">
          <div className="flex flex-col p-4 w-full shadow-lg min-h-[200px] gap-2 justify-center items-center text-center">
            <img src={landAcquisitionIcon} className="w-[60px]" alt="Land Acquisition" />
            <h2 className="font-semibold text-lg">Land Acquisition & Sales</h2>
            <p className="text-sm">Expertise in purchasing & selling land</p>
          </div>
        </span>

        {/* Construction Materials Card */}
        <span  onClick={() => onspanClick('construction')} className="bg-primary hover:cursor-pointer hover:bg-secondary hover:text-bg transition-all duration-300 ease-in-out">
          <div className="flex flex-col p-4 w-full shadow-lg min-h-[200px] gap-2 justify-center items-center text-center">
            <img src={constructionMaterialsIcon} className="w-[60px]" alt="Construction Materials" />
            <h2 className="font-semibold text-lg">Construction Materials</h2>
            <p className="text-sm">High-quality construction materials</p>
          </div>
        </span>

        {/* Event Car Rentals Card */}
        <span  onClick={() => onspanClick('rentals')} className="bg-primary hover:cursor-pointer hover:bg-secondary hover:text-bg transition-all duration-300 ease-in-out">
          <div className="flex flex-col p-4 w-full shadow-lg min-h-[200px] gap-2 justify-center items-center text-center">
            <img src={carRentalIcon} className="w-[60px]" alt="Event Car Rentals" />
            <h2 className="font-semibold text-lg">Event Car Rentals</h2>
            <p className="text-sm">Professional car rental services for events</p>
          </div>
        </span>

        {/* Security Solutions Card */}
        <span  onClick={() => onspanClick('security')} className="bg-primary hover:cursor-pointer hover:bg-secondary hover:text-bg transition-all duration-300 ease-in-out">
          <div className="flex flex-col p-4 w-full shadow-lg min-h-[200px] gap-2 justify-center items-center text-center">
            <img src={securitySolutionsIcon} className="w-[60px]" alt="Security Solutions" />
            <h2 className="font-semibold text-lg">Security Solutions</h2>
            <p className="text-sm">Offering advanced technology to enhance security</p>
          </div>
        </span>
      </div>
    </div>
  );
};

export default ListingsSection;
