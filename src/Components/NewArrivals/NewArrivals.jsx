import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await axios.get("https://quicktrustservices-i6rr.vercel.app/api/new_arrivals");
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
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

            <div className="relative w-auto p-2 mt-12 h-[100px] flex flex-col gap-2">
              <h2 className="font-semibold text-lg text-bg">{block1.block_title}</h2>
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
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

              <div className="relative w-auto p-2 mt-12 h-[100px] flex flex-col my-2 gap-2">
                <h2 className="font-semibold text-lg text-bg">{block2.block_title}</h2>
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
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

            <div className="relative w-auto p-2 mt-12 h-[120px] flex flex-col my-2 gap-2">
              <h2 className="font-semibold text-lg text-bg">{block3.block_title}</h2>
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
      {isModalOpen && selectedBlock && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg flex flex-row w-[40%] min-w-[500px] h-[60%]">
            <div className="w-[50%] h-full">
              <img
                src={selectedBlock.block_image}
                alt={selectedBlock.block_title}
                className="w-full h-full object-cover "
              />
            </div>
            <div className="w-[50%] h-fuil flex justify-center items-center ">
              <div className="w-[60%] h-[60%] flex flex-col gap-[10px]">
                <h2 className="text-xl font-semibold text-button">{selectedBlock.block_title}</h2>
                <p>{selectedBlock.block_description}</p>
                <Link to='/contact' className="bg-button text-primary w-[100px] text-center p-2 hover:bg-primary hover:shadow-lg hover:text-button rounded-lg">Contact Us</Link>
              </div>
            </div>
          </div>
          <button
              onClick={handleCloseModal}
              className="absolute top-[10%] right-[25%] text-lg text-primary p-2  rounded-lg bg-button font-bold"
            >
              close
            </button>
            
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
