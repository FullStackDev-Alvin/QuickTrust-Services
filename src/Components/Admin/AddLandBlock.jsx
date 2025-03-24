import { useState } from "react";
import axios from "axios";
import LandAquisationAdmin from "../LandAcquisition/LandAcquisationAdmin";

const AddLandBlock = () => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [priceDetails, setPriceDetails] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [dropOffInfo, setDropOffInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Added error state to handle validation
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  const handleFiles = (fileList) => {
    const fileArray = Array.from(fileList);
    setFiles(fileArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation to check if required fields are filled
    if (!title || !priceDetails || !location) {
      setError("Please fill out all required fields.");
      return;
    }

    if (files.length === 0) {
      setError("Please upload at least one image.");
      return;
    }

    setLoading(true);
    setError(""); // Clear any previous error messages

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price_details", priceDetails);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("drop_off_info", dropOffInfo);

    // Append all selected files to the FormData object
    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post(
        "https://quicktrustservices.vercel.app/api/land_aquisition/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMessage("Land block added successfully!");
      // Reset form fields
      setTitle("");
      setPriceDetails("");
      setLocation("");
      setDescription("");
      setDropOffInfo("");
      setFiles([]);
    } catch (error) {
      console.error("Error submitting data:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-row gap-[10px]">
      <div className="max-w-lg w-full m-auto mt-10 p-6 bg-white shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-center">Add A New Block</h2>
        {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>} {/* Display success message */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Land Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price Details</label>
            <input
              type="text"
              value={priceDetails}
              onChange={(e) => setPriceDetails(e.target.value)}
              placeholder="Price"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Land Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows="3"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div
            className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <p className="text-gray-500">Drag & Drop images here or click to select</p>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              multiple
              accept="image/*"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
          <div className="mt-4 w-full overflow-x-auto">
            <div className="flex space-x-2 p-2 bg-white shadow rounded-lg w-full">
              {files.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  className="w-20 h-20 object-cover rounded-lg border"
                  alt="preview"
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Drop Off Info</label>
            <textarea
              value={dropOffInfo}
              onChange={(e) => setDropOffInfo(e.target.value)}
              placeholder="Location for drop off and Pickup"
              rows="3"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-button text-white py-2 rounded-lg hover:bg-primary hover:text-button hover:shadow-lg transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      <LandAquisationAdmin />
    </div>
  );
};

export default AddLandBlock;
