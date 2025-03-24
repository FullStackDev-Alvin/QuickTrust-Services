import { useState } from "react";
import axios from "axios";
import ApartmentAdmin from "../Apartments/ApartmentAdmin";

const AddApartment = () => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [priceDetails, setPriceDetails] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFiles = (fileList) => setFiles(Array.from(fileList));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (files.length === 0) return alert("Please upload at least one image.");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("priceDetails", priceDetails);
    formData.append("description", description);
    formData.append("amenities", amenities);
    files.forEach((file) => formData.append("images", file));

    try {
      await axios.post("https://quicktrustservices.vercel.app/api/apartments/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Apartment added successfully!");
    } catch (error) {
      alert("Error adding apartment!");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="flex flex-row gap-[10px]">
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
              <h2 className="text-2xl font-bold mb-4 text-center">Add Apartment</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={priceDetails}
                  onChange={(e) => setPriceDetails(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                />
                <textarea
                  placeholder="Amenities"
                  value={amenities}
                  onChange={(e) => setAmenities(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFiles(e.target.files)}
                  className="w-full border rounded-lg px-4 py-2 bg-gray-100 cursor-pointer"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
          </div>
      <ApartmentAdmin/>
      </div>
  );
};

export default AddApartment;
