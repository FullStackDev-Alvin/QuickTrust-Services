import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import cancel from "/icons8-cancel.gif"

function ConstructionMaterials() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/construction/");
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
      const response = await axios.get(`http://localhost:5000/api/construction/${id}`);
      const item = Array.isArray(response.data) ? response.data[0] : response.data;
      
      if (!item || !item.image) throw new Error("Item or image field is missing");
      
      const parsedImages = typeof item.image === "string" ? JSON.parse(item.image) : [item.image];
      
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
  <motion.div className="w-[94%] m-auto p-2 flex flex-wrap gap-[30px] justify-center" 
    variants={containerVariants} initial="hidden" animate="visible">
    <div className="w-[94%] m-auto p-2 bg-bg flex flex-wrap gap-[30px] justify-center">
      {data.map((item) => (
        <motion.div key={item.id}variants={itemVariants}>
          <div key={item.id} className="w-[300px] h-auto min-h-[400px] bg-text p-2 flex flex-col gap-2">
            <img src={item.image ? JSON.parse(item.image)[0] : "default-image.jpg"} className="h-1/2 w-full object-cover" alt={item.name} />
            <h1 className="text-button font-semibold text-lg">{item.title}</h1>
            <div>
              <label className="text-secondary font-semibold">Price</label>
              <p className="text-bg">{item.price_details}</p>
            </div>
            <div>
              <label className="text-secondary font-semibold">Short Feature</label>
              <p className="text-bg">{item.short_description}</p>
            </div>
            <button
              onClick={() => handleViewDetails(item.id)}
              className="w-[80px] text-center p-2 text-primary bg-button"
            >
              View
            </button>
          </div>
        </motion.div>
      ))}
 <AnimatePresence>
  {showModal && selectedItem && (
    <div className="w-full h-screen fixed flex justify-center items-center inset-0 bg-black bg-opacity-50 p-4 z-50">
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
        <motion.div>
          <div className="w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-[900px] bg-white rounded-lg shadow-lg flex flex-col xl:flex-row overflow-hidden">
            {/* Image Section */}
            <div className="xl:w-1/2 w-full flex flex-col items-center xl:justify-center">
              <div className="w-full flex justify-center h-auto max-h-[500px] p-2">
                <img 
                  className="w-full h-auto object-cover" 
                  src={selectedItem.image[selectedImageIndex]} 
                  alt="Selected" 
                />
              </div>
              <div className="w-full h-auto flex gap-2 justify-center overflow-x-auto p-2">
                {selectedItem.image.map((image, index) => (
                  <img
                    key={index}
                    className={`h-[50px] w-[50px] md:h-[60px] md:w-[60px] object-cover cursor-pointer border-2 ${index === selectedImageIndex ? 'border-button' : 'border-transparent'}`}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="xl:w-1/2 w-full p-4 md:p-6 flex flex-col gap-3 md:gap-4 xl:justify-center">
              <h1 className="font-bold text-lg md:text-xl text-bg">
                <span className="text-button">Material Name: </span>{selectedItem.title}
              </h1>
              <p className="text-bg"><span className="text-button">Details: </span>{selectedItem.short_description}</p>
              <p className="text-bg"><span className="text-button">Features: </span>{selectedItem.key_features}</p>
              <p className="text-bg"><span className="text-button">Price: </span>{selectedItem.price_details}</p>
              <Link to="/contact" className="bg-button p-2 w-[120px] text-center rounded-md text-primary font-bold">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Close Button */}
          <button 
            className="bg-button p-2 rounded-full text-sm md:text-base font-bold fixed right-[5%] top-[5%] md:top-[8%] xl:top-[10%] text-primary"
            onClick={() => setShowModal(false)}
          >
            <img className="rounded-full w-[25px] h-[25px] md:w-[30px] md:h-[30px]" src={cancel} alt="Close" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  )}
</AnimatePresence>


    </div>
  </motion.div>     
  );
}

export default ConstructionMaterials;