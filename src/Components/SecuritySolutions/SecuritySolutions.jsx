import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SecuritySolutions() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://quicktrustservices-i6rr.vercel.app/api/security_solutions/");
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
      const response = await axios.get(`https://quicktrustservices-i6rr.vercel.app/api/security_solutions/${id}`);
      const item = Array.isArray(response.data) ? response.data[0] : response.data;
  
      if (!item || !item.image) throw new Error("Item or image field is missing");
  
      // Parse image field (since it's stored as a JSON string)
      let parsedImages;
      try {
        parsedImages = JSON.parse(item.image); // Convert to an array
      } catch (error) {
        parsedImages = [item.image]; // Fallback if parsing fails
      }
  
      setSelectedItem({ ...item, image: parsedImages });
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      id="security"
      className="w-[94%] m-auto flex flex-row bg-primary py-2 flex-wrap justify-center gap-[10px] items-center"
    >
      {data.map((item) => (
        <div
          key={item.id}
          className="relative h-[250px] w-[350px] bg-cover bg-no-repeat flex flex-col gap-[2px] p-4"
          style={{ backgroundImage: `url(${JSON.parse(item.image)[0]})` }} // Use single image directly
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-2">
            <h1 className="font-bold text-lg text-white">{item.title}</h1>
            <div>
              <label className="text-secondary font-semibold">Category</label>
              <p className="text-white">Security Solutions</p>
            </div>
            <div>
              <label className="text-secondary font-semibold">Short Description</label>
              <p className="text-white">{item.short_description}</p>
            </div>
            <div>
              <label className="text-secondary font-semibold">Price</label>
              <p className="text-white">{item.price_details}</p>
            </div>
            <div className="my-2 w-full justify-end">
              <button onClick={() => handleViewDetails(item.id)} className="p-2 bg-button text-bg">
                View
              </button>
            </div>
          </div>
        </div>
      ))}

      {showModal && selectedItem && (
        <div className="w-full h-screen fixed flex justify-center items-center inset-0 bg-black bg-opacity-50 p-4 z-50">
          <div className="w-full max-w-[900px] h-auto xl:h-[70%] max-h-[600px] bg-white rounded-lg shadow-lg flex flex-col xl:flex-row overflow-hidden">
            <div className="xl:w-1/2 w-full flex flex-col items-center h-full">
              
              <div className="w-full h-[70%] xl:h-[80%] flex justify-center items-center ">
                <img 
                  className="w-full max-h-[500px] h-full object-cover " 
                  src={selectedItem.image[selectedImageIndex]} 
                  alt="Selected" 
                />
              </div>

              <div className="w-full h-[30%] xl:h-[20%] flex gap-2 justify-center overflow-x-auto p-2">
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
                <span className="text-button">Security Solution: </span>{selectedItem.title}
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

export default SecuritySolutions;
