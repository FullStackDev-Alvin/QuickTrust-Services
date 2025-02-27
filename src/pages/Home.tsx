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

const Home = () => {
    const [selectedComponent, setSelectedComponent] = useState('land');
    
        // Handler function to update the selected component
        const handleNavbarClick = (component) => {
            setSelectedComponent(component);
        };
    return (
      <>
          <Header_1/>
          <ListingsSection onspanClick={handleNavbarClick}/>
          {/* Render child components based on the selected state */}
          <div>
              {selectedComponent === 'land' && <LandAcquisition/>}
              {selectedComponent === 'construction' && <ConstructionMaterials/>}
              {selectedComponent === 'rentals' && <Rentals/>}
              {selectedComponent === 'security' && <SecuritySolutions/>}
          </div>
          <ServicesOverview/>
          <WhyChooseUs/>
          <AdBanner/>
          <NewArrivals/>
      </>
    )
}

export default Home