import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddCategory = () => {
  const [categoryId, setCategoryId] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const { backendUrl } = useContext(AppContext);

  const SubmitClick = async (e) => {
    e.preventDefault();

    if (!categoryName || !categoryId) {
      toast.error(
        "All fields except likes, dislikes, views, and comments are required!"
      );
      return;
    }

    try {
      setLoading(true);

      const payload = {
        categoryId: parseInt(categoryId), // Ensure categoryId is a number
        categoryName,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-category`,
        payload
      );

      if (data.success) {
        toast.success("Category Added Successfully");
        setCategoryId(0);
        setCategoryName("");
      } else {
        toast.error(data.message || "Failed to add Category");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md  border-2 border-gray-400 md:mx-40">
      <h1 className="text-2xl font-semibold">Add Category</h1>
      <form onSubmit={SubmitClick} className="space-y-4 mt-4">
        <div>
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium text-gray-700"
          >
            Category ID
          </label>
          <input
            id="categoryId"
            type="number"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter Category ID"
          />
        </div>
        <div>
          <label
            htmlFor="categoryName"
            className="block text-sm font-medium text-gray-700"
          >
            Category Name
          </label>
          <input
            type="text"
            name="categoryName"
            id="categoryName"
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter Category Name"
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-md bg-indigo-500 text-white font-medium flex justify-center items-center"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
          ) : (
            "Add Category"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
