import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import images as variables
import apartmentImage1 from './appartments/0V0A3489.jpg';
import apartmentImage2 from './appartments/0V0A3307.jpg';
import apartmentImage3 from './appartments/0V0A3308 (1).jpg';
import apartmentImage4 from './appartments/0V0A3342.jpg';
import apartmentImage5 from './appartments/0V0A3435.jpg';

const RentalHostingSection = () => {
  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');

  const openLightbox = (imageSrc) => {
    setLightboxImage(imageSrc);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage('');
  };

  return (
    <div className="w-full mt-20">
      <div className="p-10 w-[100%] flex flex-col gap-[50px]">
        <div className="flex flex-col gap-[20px]">
          <h1 className="text-text font-bold text-2xl">Apartment Rentals & Hosting Services</h1>
          <p>
            Discover premium living with our exclusive apartment rentals and comprehensive hosting services,
            designed to cater to your unique needs. Whether you're looking for a short-term stay, long-term lease,
            or an investment in rental property, we provide seamless solutions for both guests and property owners.
          </p>
        </div>
        <div className="flex flex-col gap-[20px]">
          <h1 className="text-text font-bold text-xl">Why Choose Our Rental & Hosting Services?</h1>
          <p>
            Premium Apartments – Fully furnished, modern, and strategically located properties for maximum comfort.
            Hassle-Free Hosting – From listing management to guest communication, we handle it all. Seamless Booking
            Experience – Easy reservations through trusted platforms. ️24/7 Support & Maintenance – Dedicated assistance
            for both guests and property owners. Tailored Rental Solutions – Flexible options to suit different budgets
            and preferences. Looking for the perfect stay or a stress-free way to host? Contact us today!
          </p>
        </div>
      </div>
      <div>
        <section>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-2.5 lg:pb-16 pb-10">
              <h2 className="w-full text-center text-gray-900 text-2xl font-bold font-manrope leading-normal">
                Our Rental Appartments
              </h2>
              <div className="w-full text-center text-gray-600 text-lg font-normal leading-8">
                Step into a realm of comfort.
              </div>
            </div>
            <div className="gallery">
              <div className="flex flex-col mb-10">
                <div className="grid md:grid-cols-12 gap-8 lg:mb-11 mb-7">
                  <div className="md:col-span-4 md:h-[404px] h-[277px] w-full rounded-lg">
                    <img
                      src={apartmentImage1}
                      alt="Gallery image"
                      className="gallery-image object-cover rounded-lg hover:grayscale transition-all duration-700 ease-in-out mx-auto lg:col-span-4 md:col-span-6 w-full h-full"
                      onClick={() => openLightbox(apartmentImage1)}
                    />
                  </div>
                  <div className="md:col-span-8 md:h-[404px] h-[277px] w-full rounded-lg">
                    <img
                      src={apartmentImage2}
                      alt="Gallery image"
                      className="gallery-image object-cover rounded-lg hover:grayscale transition-all duration-700 ease-in-out mx-auto lg:col-span-8 md:col-span-6 w-full h-full"
                      onClick={() => openLightbox(apartmentImage2)}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
                  <div className="h-[277px] w-full rounded-lg">
                    <img
                      src={apartmentImage3}
                      alt="Gallery image"
                      className="gallery-image object-cover rounded-lg hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
                      onClick={() => openLightbox(apartmentImage3)}
                    />
                  </div>
                  <div className="h-[277px] w-full rounded-lg">
                    <img
                      src={apartmentImage4}
                      alt="Gallery image"
                      className="gallery-image object-cover rounded-lg hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
                      onClick={() => openLightbox(apartmentImage4)}
                    />
                  </div>
                  <div className="h-[277px] w-full rounded-lg">
                    <img
                      src={apartmentImage5}
                      alt="Gallery image"
                      className="gallery-image object-cover rounded-lg hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
                      onClick={() => openLightbox(apartmentImage5)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isLightboxOpen && (
            // <div className="lightbox w-full h-full fixed top-0" id="lightbox">
            //   <span className="close" id="close" onClick={closeLightbox}>
            //     &times;
            //   </span>
            //   <img src={lightboxImage} class="w-[70%] h-[70%]" alt="Lightbox image" className="lightbox-image" />
            // </div>
            <div className='lightbox w-screen h-screen fixed top-0 left-0 bg-text_2/10 flex justify-center items-center'>
                <span className="close bg-red-600  text-primary hover:cursor-pointer absolute top-[20%] right-[20%] h-[30px] flex items-center justify-center text-center w-[30px] rounded-full" id="close" onClick={closeLightbox}>
                    &times;
                </span>
                <img src={lightboxImage} class="" alt="Lightbox image" className="lightbox-image w-[50%] " />
            </div>
          )}
        </section>
      </div>
      <div className="p-10 flex flex-col w-[100%] gap-[30px]">
        <h1 className="text-xl font-bold text-text">Our Apartment Options & Pricing</h1>
        <p className="w-[80%]">
          Studio Apartments – Ideal for solo travelers or couples. Starting at $XXX per month | $XX per night
          <br />
          1-Bedroom Apartments – Perfect for professionals or small families. Starting at $XXX per month | $XX per night
          <br />
          2-Bedroom Apartments – Spacious and stylish for families or groups. Starting at $XXX per month | $XX per night
          <br />
          Luxury Suites & Penthouses – Exclusive high-end stays with premium amenities. Starting at $XXX per month | $XX
          per night
        </p>
        <Link
          to="/contact"
          className="text-white bg-button w-[240px] text-center text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none hover:bg-primary hover:shadow-md hover:text-button transition-all duration-7 ease-in-out"
        >
          Contact Us for more Details
        </Link>
      </div>
    </div>
  );
};

export default RentalHostingSection;
