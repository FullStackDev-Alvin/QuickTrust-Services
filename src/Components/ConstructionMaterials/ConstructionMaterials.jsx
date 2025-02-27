import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        const response = await axios.get("https://quicktrustservices-i6rr.vercel.app/api/construction/");
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
      const response = await axios.get(`https://quicktrustservices-i6rr.vercel.app/api/construction/${id}`);
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

  return (
    <div className="w-[94%] m-auto p-2 bg-primary flex flex-wrap gap-[30px] justify-center">
      {data.map((item) => (
        <div key={item.id} className="w-[300px] h-[400px] bg-text p-2 flex flex-col gap-2">
          <img src={item.image ? JSON.parse(item.image)[0] : "default-image.jpg"} className="h-1/2 w-full object-cover" alt={item.name} />
          <h1 className="text-button font-semibold text-lg">{item.title}</h1>
          <div>
            <label className="text-secondary font-semibold">Price</label>
            <p className="text-white">{item.price_details}</p>
          </div>
          <div>
            <label className="text-secondary font-semibold">Short Feature</label>
            <p className="text-white">{item.short_description}</p>
          </div>
          <button
            onClick={() => handleViewDetails(item.id)}
            className="w-[80px] text-center p-2 text-primary bg-button"
          >
            View
          </button>
        </div>
      ))}

      {showModal && selectedItem && (
        <div className="w-full h-screen fixed flex justify-center items-center inset-0 bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-[900px] xl:h-[90%] bg-white rounded-lg shadow-lg flex flex-col xl:flex-row overflow-hidden">
            <div className="xl:w-1/2 w-full flex flex-col items-center xl:justify-center">
              <div className="w-full flex justify-center p-2">
                <img 
                  className="w-full max-h-[300px] object-cover rounded-lg" 
                  src={selectedItem.image[selectedImageIndex]} 
                  alt="Selected" 
                />
              </div>
              <div className="w-full flex gap-2 justify-center overflow-x-auto p-2">
                {selectedItem.image.map((image, index) => (
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
              <h1 className="font-bold text-xl text-text">
                <span className="text-button">Material Name: </span>{selectedItem.title}
              </h1>
              <p><span className="text-button">Details: </span>{selectedItem.short_description}</p>
              <p><span className="text-button">Features: </span>{selectedItem.key_features}</p>
              <p><span className="text-button">Price: </span>{selectedItem.price_details}</p>
              <Link to="/contact" className="bg-button p-2 w-[120px] text-center rounded-md text-primary font-bold">
                Contact Us
              </Link>
            </div>
          </div>
          <button 
            className="bg-button p-2 font-bold fixed right-[5%] top-[10%] text-primary rounded-md" 
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default ConstructionMaterials;