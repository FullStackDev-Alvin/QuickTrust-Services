import React from "react";
import { Link } from "react-router-dom";

// Import background image
import contactBg from "./contacts/pexels-pixabay-326576.jpg";

function ContactUs() {
  return (
    <div className="w-full flex flex-col gap-[20px] mt-20 p-10" id="contacts">
      {/* Contact Header Section */}
      <div
        className="w-full h-[300px] flex justify-center rounded-lg items-center bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${contactBg})` }}
      >
        <h1 className="w-full h-[100px] bg-black-200 text-button font-bold text-4xl text-center">
          Contact Us
        </h1>
      </div>

      {/* Contact Information Section */}
      <div className="flex w-full md:flex-row flex-col lg:flex-row gap-[10px] mt-10">
        {/* Left Column */}
        <div className="flex w-1/2 flex-col gap-[20px]">
          <h1 className="font-bold text-2xl">Contact Us</h1>
          <p>
            We are here to assist you. Whether you are looking for apartment rentals,
            property marketing, or hosting services, reach out to the relevant
            department for prompt assistance.
          </p>

          <div>
            <h2 className="font-bold">General Inquiries</h2>
            <p>
              📍 Office Address: [Company Name], [Physical Address]
              <br />
              📞 Phone: [General Contact Number]
              <br />
              📧 Email: [General Email]
            </p>
          </div>

          <div>
            <h2 className="font-bold">Apartment Rentals & Bookings</h2>
            <p>
              For inquiries about available apartments, pricing, and reservations.
              <br />
              📞 Phone: [Rental Contact Number]
              <br />
              📧 Email: [Rental Email]
            </p>
          </div>

          <div>
            <h2 className="font-bold">Business Hours</h2>
            <p>
              Monday – Friday: 8:00 AM – 6:00 PM
              <br />
              Saturday – Sunday: 9:00 AM – 4:00 PM
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex w-1/2 flex-col gap-[20px]">
          <div>
            <h2 className="font-bold">Hosting & Property Management</h2>
            <p>
              For property owners looking to list their apartments or require hosting
              and maintenance services.
              <br />
              📞 Phone: [Hosting Contact Number]
              <br />
              📧 Email: [Hosting Email]
            </p>
          </div>

          <div>
            <h2 className="font-bold">Property Promotion & Marketing</h2>
            <p>
              For businesses and property owners interested in marketing services,
              digital promotions, and advertising.
              <br />
              📞 Phone: [Marketing Contact Number]
              <br />
              📧 Email: [Marketing Email]
            </p>
          </div>

          <div>
            <h2 className="font-bold">Customer Support & Complaints</h2>
            <p>
              For assistance with ongoing rentals, service issues, or complaints.
              <br />
              📞 Phone: [Support Contact Number]
              <br />
              📧 Email: [Support Email]
            </p>
          </div>

          <div>
            <h2 className="font-bold">Business Partnerships & Collaborations</h2>
            <p>
              For real estate agencies, developers, or service providers looking for
              partnership opportunities.
              <br />
              📞 Phone: [Partnership Contact Number]
              <br />
              📧 Email: [Partnership Email]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
