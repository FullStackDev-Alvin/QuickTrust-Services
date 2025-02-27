import { useState } from "react";
import axios from "axios";
import RentalsAdmin from "../Rentals/RentalsAdmin";

const AddCarRentalBlock = () => {
  const [files, setFiles] = useState([]);
  const [carName, setCarName] = useState("");
  const [rentalDetails, setRentalDetails] = useState("");
  const [features, setFeatures] = useState("");
  const [dropOffInfo, setDropOffInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFiles = (fileList) => {
    const fileArray = Array.from(fileList);
    setFiles(fileArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      setError("Please upload at least one image.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("car_name", carName);
    formData.append("rental_details", rentalDetails);
    formData.append("features", features);
    formData.append("drop_off_info", dropOffInfo);

    // Append all selected files to the FormData object
    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post("https://quicktrustservices-i6rr.vercel.app/api/rental_vehicles/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage("Rental vehicle added successfully!");
      setCarName("");
      setRentalDetails("");
      setFeatures("");
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
    <div className="w-full">
      <div className="max-w-lg w-full m-auto mt-10 p-6 bg-white shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-center">Add A New Block</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {successMessage && <div className="text-green-500 text-center">{successMessage}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Car Name</label>
            <input
              type="text"
              placeholder="Brand"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rental Details</label>
            <input
              type="text"
              placeholder="Price /Hour"
              value={rentalDetails}
              onChange={(e) => setRentalDetails(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Features</label>
            <textarea
              placeholder="Features"
              rows="3"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
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
              placeholder="Location for drop off and Pickup"
              rows="3"
              value={dropOffInfo}
              onChange={(e) => setDropOffInfo(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-button text-white py-2 rounded-lg hover:bg-primary hover:text-button hover:shadow-lg transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      <RentalsAdmin/>
    </div>
  );
};

export default AddCarRentalBlock;
