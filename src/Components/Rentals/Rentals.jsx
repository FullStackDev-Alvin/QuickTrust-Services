import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cancel from "/icons8-cancel.gif"
function Rentals() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rental_vehicles/");
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
      const response = await axios.get(`http://localhost:5000/api/rental_vehicles/${id}`);
      const item = Array.isArray(response.data) ? response.data[0] : response.data;
      
      if (!item || !item.image) throw new Error("Item or image field is missing");
      const parsedImages = Array.isArray(item.image) ? item.image : [item.image];

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
      className="w-[94%] m-auto p-5 flex flex-wrap gap-[20px] justify-center" 
      id="rentals"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {data.map((item, index) => (
        <motion.div
          key={item.id}
          className="relative min-h-[250px] h-auto w-[350px] bg-cover bg-center bg-no-repeat flex flex-col gap-[2px] p-4"
          style={{ backgroundImage: `url(${item.image[0]})` }}
          variants={itemVariants}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Content */}
          <div className="relative z-2 flex flex-col h-full justify-between">
            <h1 className="font-bold text-lg text-white">{item.car_name}</h1>
            <div>
              <label className="text-secondary font-semibold">Short Feature</label>
              <p className="text-white">{item.rental_details}</p>
            </div>
            <div>
              <label className="text-secondary font-semibold">Price</label>
              <p className="text-white">{item.features}</p>
            </div>
            <div className="my-2 w-full justify-end">
              <button onClick={() => handleViewDetails(item.id)} className="p-2 bg-button text-bg">
                View
              </button>
            </div>
          </div>
        </motion.div>
      ))}
      <AnimatePresence>
      {showModal && selectedItem && (
         <div className="w-full h-screen fixed flex justify-center items-center inset-0 bg-black bg-opacity-50 p-4 z-50">
          <motion.div 
              className=""
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
          <motion.div 
              className="w-full max-w-[900px] h-auto xl:h-[70%] max-h-[600px] bg-white rounded-lg shadow-lg flex flex-col xl:flex-row overflow-hidden"
              variants={contentVariants}
            >
            <div className="w-full max-w-[900px] h-auto xl:h-[70%] max-h-[600px] bg-white rounded-lg shadow-lg flex flex-col xl:flex-row overflow-hidden">
            
              
              {/* Left section for images */}
              <div className="xl:w-1/2 w-full flex flex-col items-center h-full">
                <div className="w-full h-[70%] xl:h-[80%] flex justify-center items-center ">
                  <img 
                    className="w-full max-h-[500px] h-full object-cover" 
                    src={selectedItem.image[selectedImageIndex]} 
                    alt="Selected" 
                  />
                </div>

                {/* Thumbnails */}
                <div className="w-full h-[30%] xl:h-[20%] flex gap-2 justify-center overflow-x-auto p-2">
                  {selectedItem.image.map((image, index) => (
                    <img
                      key={index}
                      className={`h-[50px] w-[50px] md:h-[60px] md:w-[60px] lg:h-[70px] lg:w-[70px] object-cover cursor-pointer border-2 
                      ${index === selectedImageIndex ? 'border-button' : 'border-transparent'}`}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => setSelectedImageIndex(index)}
                    />
                  ))}
                </div>
              </div>

              {/* Right section for details */}
              <div className="xl:w-1/2 w-full p-6 flex flex-col gap-4 justify-center">
                <h1 className="font-bold text-xl md:text-2xl text-bg  ">
                  <span className="text-button font-bold">Car Name: </span>{selectedItem.car_name}
                </h1>
                <p className=" text-bg text-sm md:text-base"><span className="text-button font-bold">Details: </span>{selectedItem.rental_details}</p>
                <p className="text-bg text-sm md:text-base"><span className="text-button font-bold">Features: </span>{selectedItem.features}</p>
                <p className="text-bg text-sm md:text-base"><span className="text-button font-bold">Availability: </span>{selectedItem.drop_off_info}</p>

                <Link to="/contact" className="bg-button p-2 text-sm md:text-base w-[120px] text-center  hover:bg-primary hover:text-button hover:shadow-lg transition-all duration-200 text-primary font-bold">
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
    </motion.div>
  );
}

export default Rentals;
