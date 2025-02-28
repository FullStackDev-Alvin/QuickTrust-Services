import React ,{useState}from 'react'
import Header_2 from '../Components/Header_2/Header_2'
import ListingsSection from '../Components/ListingsSection/ListingsSection'
import LandAcquisition from '../Components/LandAcquisition/LandAcquisition';
import ConstructionMaterials from '../Components/ConstructionMaterials/ConstructionMaterials';
import Rentals from '../Components/Rentals/Rentals';
import SecuritySolutions from '../Components/SecuritySolutions/SecuritySolutions';
import AdBanner from '../Components/AdBanner/AdBanner'
import NewArrivals from '../Components/NewArrivals/NewArrivals'

const Listings = () => {
    // State to keep track of the selected component
    const [selectedComponent, setSelectedComponent] = useState('land');

    // Handler function to update the selected component
    const handleNavbarClick = (component) => {
        setSelectedComponent(component);
    };
    return (
    <>
        <Header_2/>
        <ListingsSection onspanClick={handleNavbarClick}/>
         {/* Render child components based on the selected state */}
        <div>
            {selectedComponent === 'land' && <LandAcquisition/>}
            {selectedComponent === 'construction' && <ConstructionMaterials/>}
            {selectedComponent === 'rentals' && <Rentals/>}
            {selectedComponent === 'security' && <SecuritySolutions/>}
        </div>
        {/* <AdBanner/> */}
        <NewArrivals/>
    </>
  )
}

export default Listings