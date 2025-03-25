import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RentalsAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [files, setFiles] = useState([]);
  // For edit functionality
  const [editItem, setEditItem] = useState({
    car_name: "",
    rental_details: "",
    features: "",
    drop_off_info: "",
    image: [], // Array for storing images
  });
  const [selectedImages, setSelectedImages] = useState([]); // Store selected new images

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://quicktrustservices.vercel.app/api/rental_vehicles/");
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
      const response = await axios.get(`https://quicktrustservices.vercel.app/api/rental_vehicles/${id}`);
  
      const item = Array.isArray(response.data) ? response.data[0] : response.data;
      if (!item || !item.image) {
        throw new Error("Item or image field is missing");
      }
  
      const parsedImages = Array.isArray(item.image) ? item.image : [item.image];
  
      setSelectedItem({ ...item, image: parsedImages });
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.id === id);
    if (itemToEdit) {
      setEditItem(itemToEdit);
      setShowUpdateModal(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://quicktrustservices.vercel.app/api/rental_vehicles/${id}`);
      setData(data.filter((item) => item.id !== id)); // Update local data
      alert("Item deleted successfully.");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Error deleting item.");
    }
  };

  // Handle image input change with validation for a max of 4 images
  const handleUpdateFiles = (fileList) => {
    const fileArray = Array.from(fileList);
    setFiles(fileArray);
  };
  // Submit edited item along with images
  const handleEditSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("car_name", editItem.car_name);
      formData.append("rental_details", editItem.rental_details);
      formData.append("features", editItem.features);
      formData.append("drop_off_info", editItem.drop_off_info);

      // Append new images to FormData
      if (files.length === 0) {
        setError("Please upload at least one image.");
        return;
      }
      files.forEach((file) => {
        formData.append("images", file);
      });

      await axios.put(`https://quicktrustservices.vercel.app/api/rental_vehicles/${editItem.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update the data locally with the new item
      setData(data.map((item) => (item.id === editItem.id ? { ...editItem, image: selectedImages } : item)));
      alert("Item updated successfully.");
      setShowModal(false);
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Error updating item.");
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
    <div className="w-[94%] m-auto p-5 flex flex-wrap gap-[20px] justify-center h-screen overflow-scroll" id="rentals">
      {data.map((item) => (
        <div key={item.id} className="relative h-[250px] w-[350px] bg-cover bg-center bg-no-repeat flex flex-col gap-[2px] p-4" style={{ backgroundImage: `url(${item.image[0]})` }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
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
              <button onClick={() => handleViewDetails(item.id)} to="#" className="p-2 bg-button text-bg">
                View
              </button>
              <button onClick={() => handleEdit(item.id)} className="p-2 bg-yellow-500 text-white ml-2">
                Edit
              </button>
              <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500 text-white ml-2">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {showModal && selectedItem && (
        <div className="w-full h-screen fixed flex justify-center items-center inset-0 bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-[900px] h-auto xl:h-[90%] bg-white rounded-lg shadow-lg flex flex-col xl:flex-row overflow-hidden">
            {/* Left section for images */}
            <div className="xl:w-1/2 w-full flex flex-col items-center">
              <div className="w-full h-[70%] xl:h-[80%] flex justify-center items-center p-2">
                <img className="w-full max-h-[300px] h-full object-cover rounded-lg" src={selectedItem.image[selectedImageIndex]} alt="Selected" />
              </div>

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
              <h1 className="font-bold text-xl md:text-2xl text-text">
                <span className="text-button font-bold">Car Name: </span>{selectedItem.car_name}
              </h1>
              <p className="text-sm md:text-base"><span className="text-button font-bold">Details: </span>{selectedItem.rental_details}</p>
              <p className="text-sm md:text-base"><span className="text-button font-bold">Features: </span>{selectedItem.features}</p>
              <p className="text-sm md:text-base"><span className="text-button font-bold">Availability: </span>{selectedItem.drop_off_info}</p>

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

      {showUpdateModal && (
        <div className="w-full h-screen fixed top-[10px] flex justify-center items-center inset-0 bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-[400px] h-auto xl:h-[85%] flex flex-col bg-white rounded-lg shadow-lg p-6">
            <h2>Edit Rental Vehicle</h2>
            <div className="mb-4">
              <label className="text-sm font-semibold">Car Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={editItem.car_name}
                onChange={(e) => setEditItem({ ...editItem, car_name: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="text-sm font-semibold">Rental Details</label>
              <textarea
                className="w-full p-2 border rounded"
                value={editItem.rental_details}
                onChange={(e) => setEditItem({ ...editItem, rental_details: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="text-sm font-semibold">Features</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={editItem.features}
                onChange={(e) => setEditItem({ ...editItem, features: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="text-sm font-semibold">Drop Off Info</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={editItem.drop_off_info}
                onChange={(e) => setEditItem({ ...editItem, drop_off_info: e.target.value })}
              />
            </div>

            <div className="mt-4 w-full h-max overflow-x-auto">
                <div
                    className="border-2 h-full border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer"
                    onClick={() => document.getElementById("fileInputs").click()}
                >
                <p className="text-gray-500">Drag & Drop images here or click to select</p>
                <input
                type="file"
                id="fileInputs"
                className="hidden"
                multiple
                accept="image/*"
                onChange={(e) => handleUpdateFiles(e.target.files)}
                />
                </div>
            </div>
            <button onClick={handleEditSubmit} className="bg-button p-2 text-white rounded-md">
              Save Changes
            </button>
          </div>
            <button className="bg-button text-primary font-semibold p-2 rouded w-[100px] text-center fixed top-[12%] right-[15%] " onClick={()=>{setShowUpdateModal(false)}}>Close</button>
        </div>
        
      )}
    </div>
  );
}

export default RentalsAdmin;
