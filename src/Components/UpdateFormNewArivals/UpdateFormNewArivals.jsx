import { useState } from "react";
import axios from "axios";

const UpdateFormNewArrivals = ({ title, selectedBlock }) => {
  const [formData, setFormData] = useState({
    1: { title: "", description: "", image: null },
    2: { title: "", description: "", image: null },
    3: { title: "", description: "", image: null },
  });

  const [imagePreview, setImagePreview] = useState(null); // Store image preview

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!selectedBlock) return;

    setFormData((prev) => ({
      ...prev,
      [selectedBlock]: { ...prev[selectedBlock], [name]: value },
    }));
  };

  const handleImageChange = (e) => {
    if (!selectedBlock) return;

    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Create a preview
    }

    setFormData((prev) => ({
      ...prev,
      [selectedBlock]: { ...prev[selectedBlock], image: file },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBlock) {
      alert("Please select a block before updating.");
      return;
    }

    const selectedData = formData[selectedBlock];

    if (!selectedData.title || !selectedData.description) {
      alert("Please fill in all fields.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", selectedData.title);
    formDataToSend.append("description", selectedData.description);
    if (selectedData.image) {
      formDataToSend.append("image", selectedData.image);
    }

    try {
      const response = await axios.put(
        `https://quicktrustservices.vercel.app/api/new_arrivals/${selectedBlock}`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Data updated successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update data.");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-center">Update {title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            name="title"
            type="text"
            value={formData[selectedBlock]?.title || ""}
            placeholder="Enter title"
            className="mt-1 block w-full text-black p-2 border border-gray-300 rounded-lg"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData[selectedBlock]?.description || ""}
            placeholder="Enter description"
            rows="3"
            className="mt-1 block w-full text-black p-2 border border-gray-300 rounded-lg"
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input type="file" accept="image/*" className="mt-1 block w-full" onChange={handleImageChange} />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />
          )}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateFormNewArrivals;
