import React from 'react'
import Header_2 from '../Components/Header_2/Header_2'
import RentalHostingSection from '../Components/RentalHostingSection/RentalHostingSection'
import AdBanner from '../Components/AdBanner/AdBanner'
import NewArrivals from '../Components/NewArrivals/NewArrivals'

const RealEstate = () => {
  return (
    <>
        <Header_2/>
        <RentalHostingSection/>
        {/* <AdBanner/> */}
        <NewArrivals/>
    </>
  )
}

export default RealEstate