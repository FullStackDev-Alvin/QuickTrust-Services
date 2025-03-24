import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import cancel from "/icons8-cancel.gif"

const NewArrivals = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await axios.get("https://quicktrustservices.vercel.app/api/new_arrivals");
        setBlocks(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlocks();
  }, []);

  const handleViewClick = (block) => {
    setSelectedBlock(block);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBlock(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Filter blocks by block_id
  const block1 = blocks.find((item) => item.block_id === 1);
  const block2 = blocks.find((item) => item.block_id === 2);
  const block3 = blocks.find((item) => item.block_id === 3);


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
    <div className="w-full max-w-screen-xl m-auto h-auto p-10 flex flex-col gap-2">
      <div className="flex flex-row justify-start items-center gap-6">
        <div className="w-[23px] bg-secondary rounded-md h-[40px]"></div>
        <h3 className="font-bold text-secondary">Featured</h3>
      </div>
      <h1 className="font-semibold text-2xl my-2">New Arrival</h1>

      <div className="flex flex-col lg:flex-row gap-2 lg:h-[600px] h-[400px] w-full mt-12">
        {/* First Block (Toyota) */}
        {block1 && (
          <div
            className="relative w-full lg:w-1/2 lg:block hidden bg-text_2 bg-no-repeat p-[10px] justify-start bg-cover bg-center"
            style={{
              backgroundImage: `url(${block1.block_image})`,
            }}
          >
            {/* Black Blur Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative w-auto p-2 mt-12 h-[150px] flex flex-col gap-2 justify-center items-start bg-black/80">
              <h2 className="font-semibold text-lg text-primary">{block1.block_title}</h2>
              <p className="text-primary font-light">{block1.block_description}</p>
              <button
                onClick={() => handleViewClick(block1)}
                className="w-[40px] text-center text-primary font-light border-b-2 border-primary"
              >
                View
              </button>
            </div>
          </div>
        )}


        {/* Second & Third Blocks (Mercedes & Land for Sale) */}
        <div className="w-full lg:w-1/2 flex flex-col lg:flex-col md:flex-row md:h-[250px] gap-2 h-full lg:h-full justify-center items-center">
          {/* Second Block (Mercedes) */}
          {block2 && (
            <div
              className="relative flex w-full h-full min-h-[200px] max-w-[500px] lg:max-w-[600px] min-w-[50%] lg:h-1/2 bg-text bg-no-repeat p-[10px] items-end bg-cover bg-center"
              style={{
                backgroundImage: `url(${block2.block_image})`,
              }}
            >
              {/* Black Blur Overlay */}
              <div className="absolute inset-0 bg-black/40 "></div>

              <div className="relative w-auto p-2 mt-12 h-[100px] flex flex-col my-2 gap-2 justify-center items-start bg-black/80">
                <h2 className="font-semibold text-lg text-primary">{block2.block_title}</h2>
                <p className="text-primary font-light">{block2.block_description}</p>
                <button
                  onClick={() => handleViewClick(block2)}
                  className="w-[40px] text-center text-primary font-light border-b-2 border-primary"
                >
                  View
                </button>
              </div>
            </div>
          )}


          {/* Third Block (Large Green Land for Sale) */}
          {block3 && (
          <div
            className="relative flex w-full h-full min-h-[200px] max-w-[500px] lg:max-w-[600px] min-w-[50%] lg:h-1/2 bg-text bg-no-repeat p-[10px] items-end bg-cover bg-center"
            style={{
              backgroundImage: `url(${block3.block_image})`,
            }}
          >
            {/* Black Blur Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative w-auto p-2 mt-12 h-[120px] flex flex-col my-2 gap-2 justify-center items-start bg-black/80">
              <h2 className="font-semibold text-lg text-primary">{block3.block_title}</h2>
              <p className="text-primary font-light">{block3.block_description}</p>
              <button
                onClick={() => handleViewClick(block3)}
                className="w-[40px] text-center text-primary font-light border-b-2 border-primary"
              >
                View
              </button>
            </div>
          </div>
        )}

        </div>
      </div>

      {/* Modal */}

    <AnimatePresence>
  {isModalOpen && selectedBlock && (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 p-4 z-50">
      <motion.div 
        variants={modalVariants} 
        initial="hidden" 
        animate="visible" 
        exit="exit"
        className="w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg bg-white rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
      >
        {/* Left - Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={selectedBlock.block_image}
            alt={selectedBlock.block_title}
            className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
          />
        </div>

        {/* Right - Content Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
          <h2 className="text-2xl font-semibold text-button mb-2">{selectedBlock.block_title}</h2>
          <p className="text-base text-bg text-center md:text-left">{selectedBlock.block_description}</p>

          <Link
            to="/contact"
            className="mt-4 bg-button text-bg w-[120px] text-center py-2 px-4 rounded-lg font-semibold 
                      hover:bg-primary hover:shadow-lg hover:text-button transition duration-300"
          >
            Contact Us
          </Link>
        </div>

        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
        >
          <img className="w-6 h-6" src={cancel} alt="Close" />
        </button>
      </motion.div>
    </div>
  )}
</AnimatePresence>

    </div>
  );
};

export default NewArrivals;
