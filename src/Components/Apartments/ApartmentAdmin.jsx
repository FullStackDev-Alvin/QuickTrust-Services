import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ApartmentAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [editItem, setEditItem] = useState({
    id: "",
    title: "",
    location: "",
    price_details: "",
    description: "",
    amenities: "",
    images: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/apartments");
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
      const response = await axios.get(`http://localhost:5000/api/apartments/${id}`);
      const item = response.data;
      const parsedImages = Array.isArray(item.images) ? item.images : JSON.parse(item.images);
      setSelectedItem({ ...item, images: parsedImages });
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching apartment details:", error);
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.id === id);
    if (itemToEdit) {
      setEditItem({ ...itemToEdit, images: JSON.parse(itemToEdit.images) });
      setShowUpdateModal(true);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", editItem.title);
      formData.append("location", editItem.location);
      formData.append("price_details", editItem.price_details);
      formData.append("description", editItem.description);
      formData.append("amenities", editItem.amenities);
      files.forEach((file) => formData.append("images", file));

      await axios.put(`http://localhost:5000/api/apartments/${editItem.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setData((prevData) =>
        prevData.map((item) => (item.id === editItem.id ? { ...editItem } : item))
      );
      alert("Apartment updated successfully.");
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating apartment:", error);
      alert("Error updating apartment.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/apartments/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
      alert("Apartment deleted successfully.");
    } catch (error) {
      console.error("Error deleting apartment:", error);
      alert("Error deleting apartment.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-[94%] m-auto p-5 flex flex-wrap gap-[20px] h-screen overflow-scroll justify-center">
      {data.map((item) => (
        <div key={item.id} className="w-[300px] max-h-[450px] bg-text p-2 flex flex-col gap-2 justify-center items-center">
          <img src={JSON.parse(item.images)[0]} className="h-1/2 w-full object-cover" alt={item.title} />
          <h1 className="text-button font-semibold text-lg">{item.title}</h1>
          <p className="text-white">{item.location}</p>
          <p className="text-white">{item.price_details}</p>
          <button onClick={() => handleEdit(item.id)} className="bg-button p-2 text-white w-[95%]">Edit</button>
          <button onClick={() => handleDelete(item.id)} className="bg-red-500 p-2 text-white w-[95%]">Delete</button>
        </div>
      ))}

      {showUpdateModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-[400px] bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold">Edit Apartment</h2>
            <input type="text" className="w-full p-2 border rounded" value={editItem.title} onChange={(e) => setEditItem({ ...editItem, title: e.target.value })} />
            <input type="text" className="w-full p-2 border rounded" value={editItem.location} onChange={(e) => setEditItem({ ...editItem, location: e.target.value })} />
            <textarea className="w-full p-2 border rounded" value={editItem.price_details} onChange={(e) => setEditItem({ ...editItem, price_details: e.target.value })} />
            <textarea className="w-full p-2 border rounded" value={editItem.description} onChange={(e) => setEditItem({ ...editItem, description: e.target.value })} />
            <textarea className="w-full p-2 border rounded" value={editItem.amenities} onChange={(e) => setEditItem({ ...editItem, amenities: e.target.value })} />
            <input type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files))} className="w-full p-2 border rounded" />
            <button onClick={handleEditSubmit} className="bg-green-500 p-2 text-white mt-2 w-full">Save Changes</button>
            <button className="bg-gray-500 p-2 text-white mt-2 w-full" onClick={() => setShowUpdateModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApartmentAdmin;
