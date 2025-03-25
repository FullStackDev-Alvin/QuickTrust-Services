import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LandAquisationAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [editItem, setEditItem] = useState({
    id: "",
    land_title: "",
    location: "",
    price_details: "",
    land_description: "",
    image: [],
  });

  const handleViewDetails = async (id) => {
    try {
      const response = await axios.get(`https://quicktrustservices.vercel.app/api/land_aquisition/${id}`);
      const item = Array.isArray(response.data) ? response.data[0] : response.data;
      if (!item || !item.image) {
        throw new Error("Item or image field is missing");
      }
  
      const parsedImages = Array.isArray(item.image) ? item.image : JSON.parse(item.image); // parse image if it's a string
      setSelectedItem({ ...item, image: parsedImages });
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://quicktrustservices.vercel.app/api/land_aquisition/");
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.id === id || item._id === id);
    if (itemToEdit) {
      setEditItem({ ...itemToEdit, image: JSON.parse(itemToEdit.image) });
      setShowUpdateModal(true);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("land_title", editItem.land_title);
      formData.append("price_details", editItem.price_details);
      formData.append("location", editItem.location);
      formData.append("land_description", editItem.land_description);
      files.forEach((file) => formData.append("images", file));

      const id = editItem.id || editItem._id;
      await axios.put(`https://quicktrustservices.vercel.app/api/land_aquisition/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setData((prevData) =>
        prevData.map((item) => (item.id === id || item._id === id ? { ...editItem } : item))
      );

      alert("Item updated successfully.");
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Error updating item.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://quicktrustservices.vercel.app/api/land_aquisition/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id && item._id !== id));
      alert("Item deleted successfully.");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Error deleting item.");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center w-full py-10">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-button rounded-full animate-bounce delay-150"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
    );
    
    if (error) return (
      <div className="flex flex-col items-center justify-center text-red-500">
        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M4.293 4.293a1 1 0 011.414 0L12 10.586l6.293-6.293a1 1 0 111.414 1.414L13.414 12l6.293 6.293a1 1 0 01-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 01-1.414-1.414L10.586 12 4.293 5.707a1 1 0 010-1.414z"></path>
        </svg>
        <p className="text-lg font-semibold">Oops! Something went wrong.</p>
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  

  return (
    <div className="w-[94%] m-auto p-5 flex flex-wrap gap-[20px] justify-center h-screen overflow-scroll">
      {data.map((item) => (
        <div key={item.id || item._id} className="w-[300px] max-h-[500px] h-auto bg-text p-2 flex flex-col gap-2">
          <img
            src={item.image ? JSON.parse(item.image)[0] : "default-image.jpg"}
            className="h-1/2 w-full object-cover"
            alt={item.land_title}
          />
          <h1 className="text-black font-semibold text-lg">{item.land_title}</h1>
          <p className="text-bg">{item.price_details}</p>
          <p className="text-bg">{item.land_description}</p>
          <p className="text-bg">{item.location}</p>
         <div className="w-full flex flex-col gap-[10px] justify-center items-center">
          <button onClick={() => handleEdit(item.id || item._id)} className="bg-button p-2 text-white w-[95%]">
            Edit
          </button>
          <div className="w-[100%] flex flex-row justify-center items-center gap-[10%] ">
            <button onClick={() => handleViewDetails(item.id)} to="#" className="p-2 bg-button text-bg w-[120px] ">
                View
            </button>
            <button onClick={() => handleDelete(item.id || item._id)} className="bg-red-500 p-2 text-white w-[120px] ">
                Delete
            </button>
          </div>
         </div>
        </div>
      ))}

      {showUpdateModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-[400px] bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold">Edit Land Aquisition Item</h2>
            <input
              type="text"
              className="w-full p-2 border text-black rounded"
              value={editItem.land_title}
              onChange={(e) => setEditItem({ ...editItem, land_title: e.target.value })}
            />
            <input
                type="text"
                className="w-full p-2 border text-black rounded"
                value={editItem.location}
                onChange={(e) => setEditItem({ ...editItem, location: e.target.value })}
            />
            <textarea
              className="w-full p-2 border text-black rounded"
              value={editItem.price_details}
              onChange={(e) => setEditItem({ ...editItem, price_details: e.target.value })}
            />
            <textarea
              className="w-full p-2 border text-black rounded"
              value={editItem.land_description}
              onChange={(e) => setEditItem({ ...editItem, land_description: e.target.value })}
            />
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className="w-full p-2 border text-black rounded"
            />
            <button onClick={handleEditSubmit} className="bg-green-500 p-2 text-white mt-2 w-full">
              Save Changes
            </button>
            <button className="bg-gray-500 p-2 text-white mt-2 w-full" onClick={() => setShowUpdateModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

{showModal && selectedItem && (
  <div className="w-full h-screen fixed flex justify-center items-center inset-0 bg-black bg-opacity-50 p-4">
    <div className="w-full max-w-[900px] h-auto xl:h-[90%] bg-white rounded-lg shadow-lg flex flex-col xl:flex-row overflow-hidden">
      {/* Left section for images */}
      <div className="xl:w-1/2 w-full flex flex-col items-center">
        <div className="w-full h-[70%] xl:h-[80%] flex justify-center items-center p-2">
          {/* Ensure image array is parsed before rendering */}
          <img
            className="w-full max-h-[300px] h-full object-cover rounded-lg"
            src={Array.isArray(selectedItem.image) ? selectedItem.image[selectedImageIndex] : ''}
            alt="Selected"
          />
        </div>

        <div className="w-full h-[30%] xl:h-[20%] flex gap-2 justify-center overflow-x-auto p-2">
          {/* Iterate over parsed image array */}
          {Array.isArray(selectedItem.image) && selectedItem.image.map((image, index) => (
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
        <h1 className="font-bold text-xl md:text-2xl text-black">
          <span className="text-button font-bold">Title: </span>{selectedItem.land_title}
        </h1>
        <p className="text-sm md:text-base text-bg"><span className="text-button font-bold">Price Details: </span>{selectedItem.price_details}</p>
        <p className="text-sm md:text-base text-bg"><span className="text-button font-bold">Short Description: </span>{selectedItem.land_description}</p>
        <p className="text-sm md:text-base text-bg"><span className="text-button font-bold">Availability: </span>{selectedItem.drop_off_info}</p>
        <p className="text-sm md:text-base text-bg"><span className="text-button font-bold">Location: </span>{selectedItem.location}</p>

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
}

export default LandAquisationAdmin;
