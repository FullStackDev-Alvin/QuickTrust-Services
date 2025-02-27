import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LandAcquisition = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://quicktrustservices-i6rr.vercel.app/api/land_aquisition/");
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = async (id) => {
    try {
      const response = await axios.get(`https://quicktrustservices-i6rr.vercel.app/api/land_aquisition/${id}`);
      
      // If the response is an array, get the first item
      const item = Array.isArray(response.data) ? response.data[0] : response.data;
  
      if (!item || !item.image) {
        throw new Error("Item or image field is missing");
      }
  
      // Parse the image field only if it's a valid JSON string
      let parsedImages;
      try {
        parsedImages = JSON.parse(item.image);
        if (!Array.isArray(parsedImages)) {
          throw new Error("Parsed image is not an array");
        }
      } catch (err) {
        console.error("Error parsing image JSON:", err);
        parsedImages = []; // Set a default empty array to prevent crashes
      }
  
      // Set selected item with parsed images
      setSelectedItem({ ...item, image: parsedImages });
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };
  
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-[94%] m-auto p-5 flex flex-wrap gap-[20px] justify-center" id="land_acquisation">
      {data.map((item) => (
        <li className="list-none" key={item.id}>
          <div
            className="relative h-[250px] w-[350px] bg-cover bg-center bg-no-repeat flex flex-col gap-[2px] p-4"
            style={{ backgroundImage: `url(${JSON.parse(item.image)[0]})` }} // Display the first image as background
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-2 flex flex-col h-full justify-between">
              <h1 className="font-bold text-lg text-white">{item.land_title}</h1>
              <div>
                <label className="text-secondary font-semibold">Short Feature</label>
                <p className="text-white">{item.land_description}</p>
              </div>
              <div>
                <label className="text-secondary font-semibold">Price</label>
                <p className="text-white">{item.price_details}</p>
              </div>
              <div className="my-2 w-full justify-end">
                <button onClick={() => handleViewDetails(item.id)} to="#" className="p-2 bg-button text-bg">
                  View
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}

{showModal && selectedItem && (
  <div className="w-full h-screen fixed flex justify-center items-center inset-0 bg-black bg-opacity-50 p-4">
    <div className="w-full max-w-[900px] h-auto xl:h-[90%] bg-white rounded-lg shadow-lg flex flex-col xl:flex-row overflow-hidden">
      
      {/* Left section for images */}
      <div className="xl:w-1/2 w-full flex flex-col items-center">
        
        {/* Large image display */}
        <div className="w-full h-[70%] xl:h-[80%] flex justify-center items-center p-2">
          <img className="w-full max-h-[300px]   h-full object-cover rounded-lg" src={selectedItem.image[selectedImageIndex]} alt="Selected" />
        </div>

        {/* Thumbnails */}
        <div className="w-full h-[30%] xl:h-[20%] flex gap-2 justify-center overflow-x-auto p-2">
          {selectedItem.image.map((image, index) => (
            <img
              key={index}
              className={` h-[50px] w-[50px] md:h-[60px] md:w-[60px] lg:h-[70px] lg:w-[70px] object-cover cursor-pointer border-2 ${index === selectedImageIndex ? 'border-button' : 'border-transparent'}`}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setSelectedImageIndex(index)}
            />
          ))}
        </div>

      </div>

      {/* Right section for details */}
      <div className="xl:w-1/2 w-full p-6 flex flex-col gap-4 justify-center">
        <h1 className="font-bold text-xl md:text-2xl text-text">
          <span className="text-button font-bold">Title: </span>{selectedItem.land_title}
        </h1>
        <p className="text-sm md:text-base"><span className="text-button font-bold">Description: </span>{selectedItem.land_description}</p>
        <p className="text-sm md:text-base"><span className="text-button font-bold">Location: </span>{selectedItem.location}</p>
        <p className="text-sm md:text-base"><span className="text-button font-bold">Availability: </span>{selectedItem.drop_off_info}</p>
        <p className="text-sm md:text-base"><span className="text-button font-bold">Price: </span>{selectedItem.price_details}</p>
        <Link to="/contact" className="bg-button p-2 text-sm md:text-base w-[120px] text-center rounded-md hover:bg-primary hover:text-button hover:shadow-lg transition-all duration-200 text-primary font-bold">
          Contact Us
        </Link>
      </div>

    </div>

    <button className="bg-button p-2 text-sm md:text-base font-bold fixed right-[5%] top-[10%] text-primary rounded-md" onClick={() => setShowModal(false)}>
      Close
    </button>
  </div>
)}



    </div>
  );
};

export default LandAcquisition;
