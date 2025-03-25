import { useState } from "react";
import axios from "axios";
import SecuritySolutionsAdmin from "../SecuritySolutions/SecuritySolutionsAdmin";


const AddSecurityBlock = () => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [priceDetails, setPriceDetails] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFiles = (fileList) => {
    const fileArray = Array.from(fileList);
    setFiles(fileArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (files.length === 0) {
      setError("Please upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("priceDetails", priceDetails);
    formData.append("description", description);
    formData.append("features", features);

    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await axios.post(
        "https://quicktrustservices.vercel.app/api/security_solutions/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Block added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error adding block!");
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-row gap-[10px]">
      <div className="max-w-lg w-full m-auto mt-10 p-6 bg-white shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-center">Add A New Block</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Product Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price Details</label>
            <input
              type="text"
              placeholder="Price"
              value={priceDetails}
              onChange={(e) => setPriceDetails(e.target.value)}
              className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Short Description</label>
            <textarea
              placeholder="Description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Key Features</label>
            <textarea
              placeholder="Features"
              rows="3"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
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
          <button
            type="submit"
            className="w-full bg-button text-white py-2 rounded-lg hover:bg-primary hover:text-button hover:shadow-lg transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      <SecuritySolutionsAdmin/>
    </div>
  );
};

export default AddSecurityBlock;
