import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApartmentAdmin from "./ApartmentAdmin";
import { motion, AnimatePresence } from "framer-motion";
import cancel from "/icons8-cancel.gif"
function Apartments() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/apartments");
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleViewDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/apartments/${id}`);
      const item = response.data;
      
      if (!item || !item.images) throw new Error("Item or images field is missing");
      
      const parsedImages = typeof item.images === "string" ? JSON.parse(item.images) : [item.images];
      
      setSelectedItem({ ...item, images: parsedImages });
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
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
  return (
    <div className="w-[94%] m-auto p-2 bg-bg flex flex-wrap gap-[30px] justify-center">
      {data.map((item) => {
  // Parse images safely
        const images = item.images ? JSON.parse(item.images) : [];
        const firstImage = images.length > 0 ? images[0] : "default-image.jpg"; // Fallback image

        return (
          <motion.div key={item.id}variants={itemVariants}>
            <div
              key={item.id}
              className="relative min-h-[250px] h-auto w-[350px] bg-cover bg-no-repeat flex flex-col gap-[2px] p-4"
              style={{ backgroundImage: `url(${firstImage})` }}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="relative z-2">
                <h1 className="font-bold text-lg text-bg">{item.title}</h1>
                <div>
                  <label className="text-secondary font-semibold">Category</label>
                  <p className="text-primary">Security Solutions</p>
                </div>
                <div>
                  <label className="text-secondary font-semibold">Short Description</label>
                  <p className="text-primary">{item.short_description}</p>
                </div>
                <div>
                  <label className="text-secondary font-semibold">Price</label>
                  <p className="text-primary">{item.price_details}</p>
                </div>
                <div className="my-2 w-full justify-end">
                  <button
                    onClick={() => handleViewDetails(item.id)}
                    className="p-2 bg-button text-bg"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      <AnimatePresence>
      {showModal && selectedItem && (
        <div className="w-full h-screen fixed flex justify-center items-center inset-0 bg-black bg-opacity-50 p-4 z-50">
        <motion.div 
          variants={modalVariants} initial="hidden" animate="visible" exit="exit">
        <motion.div >
          <div className="w-full max-w-[900px] md:min-h-[600px]  lg:min-w-[900px] xl:h-[70%] bg-white rounded-lg shadow-lg flex flex-col xl:flex-row overflow-hidden">
            <div className="xl:w-1/2 w-full flex flex-col items-center xl:justify-center">
              <div className="w-full flex justify-center h-[90%]">
                <img 
                  className="w-full max-h-[500px] lg:min-h-[500px] md:min-h-[500px]  h-full object-cover " 
                  src={selectedItem.images[selectedImageIndex]} 
                  alt="Selected" 
                />
              </div>
              <div className="w-full h-[30%] xl:h-[20%] flex gap-2 justify-center overflow-x-auto p-2 ">
                {selectedItem.images.map((image, index) => (
                  <img
                    key={index}
                    className={`h-[60px] w-[60px] object-cover cursor-pointer border-2 ${index === selectedImageIndex ? 'border-button' : 'border-transparent'}`}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            </div>

            <div className="xl:w-1/2 w-full p-6 flex flex-col gap-4 xl:justify-center">
              <h1 className="font-bold text-xl text-bg">
                <span className="text-button">Apartment Name: </span>{selectedItem.title}
              </h1>
              <p className="text-bg"><span className="text-button">Location: </span>{selectedItem.location}</p>
              <p className="text-bg"><span className="text-button">Description: </span>{selectedItem.description}</p>
              <p className="text-bg"><span className="text-button">Price: </span>{selectedItem.price_details}</p>
              <Link to="/contact" className="bg-button p-2 w-[120px] text-center rounded-md text-primary font-bold">
                Contact Us
              </Link>
            </div>
          </div>
          <button className="bg-button p-2  rounded-full text-sm md:text-base font-bold fixed right-[5%] top-[10%] text-primary " onClick={() => setShowModal(false)}>
          <img className="rounded-full w-[30px] h-[30px]" src={cancel} alt="" />
          </button>
          </motion.div>
          </motion.div>
        </div>
      )}
      </AnimatePresence>
      
    </div>
  );
}

export default Apartments;
