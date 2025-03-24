import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cancel from "/icons8-cancel.gif"
// LandAcquisition Component
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }, // Stagger effect
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 }, // Start off-screen
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 100, damping: 10 } 
    },
    exit: { y: "100vh", opacity: 0, transition: { duration: 0.3 } },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.7 } },
  };

  return (
    <motion.div 
      className="w-[94%] m-auto p-5 flex  flex-wrap gap-[20px] justify-center" 
      id="land_acquisation"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {data.map((item) => (
        <motion.div
          key={item.id}
          className="relative min-h-[250px] h-auto w-[350px] bg-cover bg-center bg-no-repeat flex flex-col gap-[2px] p-4"
          style={{ backgroundImage: `url(${JSON.parse(item.image)[0]})` }} // Display the first image as background
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-2 flex flex-col h-full justify-between">
            <h1 className="font-bold text-primary text-lg  white">{item.land_title}</h1>
            <div>
              <label className="text-secondary  font-semibold">Short Feature</label>
              <p className="text-primary ">{item.land_description}</p>
            </div>
            <div>
              <label className="text-secondary  font-semibold">Price</label>
              <p className="text-primary">{item.price_details}</p>
            </div>
            <div className="my-2 w-full justify-end">
              <button onClick={() => handleViewDetails(item.id)} className="p-2 bg-button text-bg bg">
                View
              </button>
            </div>
          </div>
        </motion.div>
      ))}

    <AnimatePresence>
      {showModal && selectedItem && (
        <div className="fixed inset-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-50 p-4 z-50">
          <motion.div
            className="w-full max-w-[900px] h-auto bg-white rounded-lg shadow-xl flex flex-col md:flex-row overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Left Section - Image */}
            <div className="md:w-1/2 w-full flex flex-col items-center p-4">
              <div className="w-full h-[250px] md:h-[350px] flex justify-center items-center">
                <img
                  className="w-full h-full object-cover rounded-md"
                  src={selectedItem.image[selectedImageIndex]}
                  alt="Selected"
                />
              </div>

              {/* Image Thumbnails */}
              <div className="w-full flex gap-2 overflow-x-auto p-2 mt-2">
                {selectedItem.image.map((image, index) => (
                  <img
                    key={index}
                    className={`h-[50px] w-[50px] md:h-[60px] md:w-[60px] object-cover cursor-pointer rounded-md transition-all ${
                      index === selectedImageIndex ? "border-2 border-button shadow-lg" : "border border-gray-300"
                    }`}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            </div>

            {/* Right Section - Details */}
            <div className="md:w-1/2 w-full p-6 flex flex-col gap-3 text-bg">
              <h1 className="text-lg md:text-2xl font-bold text-bg">
                <span className="text-button">Title:</span> {selectedItem.land_title}
              </h1>
              <h3 className="text-sm md:text- text-bg font-bold">
                <span className="text-button font-bold">Description:</span> {selectedItem.land_description}
              </h3>
              <h3 className="text-sm md:text- text-bg font-bold">
                <span className="text-button font-bold">Location:</span> {selectedItem.location}
              </h3>
              <h3 className="text-sm md:text- text-bg font-bold">
                <span className="text-button font-bold">Availability:</span> {selectedItem.drop_off_info}
              </h3>
              <h3 className="text-sm md:text- text-bg font-bold">
                <span className="text-button">Price:</span> {selectedItem.price_details}
              </h3>

              <Link
                to="/contact"
                className="bg-button text-primary text-center py-2 px-4 hover:bg-primary hover:text-button hover:shadow-lg transition duration-300 w-[120px] font-bold"
              >
                Contact Us
              </Link>
            </div>

            {/* Close Button */}
            <button
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
              onClick={() => setShowModal(false)}
            >
              <img className="w-6 h-6" src={cancel} alt="Close" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </motion.div>
  );
};

export default LandAcquisition;
