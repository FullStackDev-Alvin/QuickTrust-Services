import React, { useState } from "react";
import Navigation from '../Components/Navigation/Navigation'
import AddCarRentalBlock from '../Components/Admin/AddCarRentalBlock';
import EditNewArrivals from "../Components/Admin/EditNewArrivals";
import AddLandBlock from "../Components/Admin/AddLandBlock";
import AddConstructionBlock from "../Components/Admin/AddConstructionBlock";
// import SecuritySolutions from "../Components/SecuritySolutions/SecuritySolutions";
import AddSecurityBlock from "../Components/Admin/AddSecurityBlock";
import AddApartment from "../Components/Admin/AddApartment";
import AdBanner from "../Components/AdBanner/AdBanner";

const Admin_edit = () => {
  const [selectedComponent, setSelectedComponent] = useState("new-listings");
  
  return (
    <>
        <Navigation onNavClick={setSelectedComponent} />
        <div className="p-5">
            {selectedComponent === "rentals" && <AddCarRent
            alBlock/>}
            {selectedComponent === "new-listings" && <EditNewArrivals/>}
            {selectedComponent === "land" && <AddLandBlock/>}
            {selectedComponent === "construction" && <AddConstructionBlock/>}
            {selectedComponent === "security" && <AddSecurityBlock/>}
            {selectedComponent === "appartments" && <AddApartment/>}
        </div>


    </>
  )
}

export default Admin_edit;