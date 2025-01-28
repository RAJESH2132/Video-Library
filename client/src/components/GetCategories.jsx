import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify"; // Notifications
import { AppContext } from "../context/AppContext";

const GetCategories = () => {
  const [categories, setCategories] = useState([]); // Categories state
  const [editMode, setEditMode] = useState(null); // Track which category is being edited
  const [editedCategory, setEditedCategory] = useState({}); // Track edited category
  const { backendUrl } = useContext(AppContext);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/admin/get-categories`
        );
        if (response.data.success) {
          setCategories(response.data.data); // Set categories in state
        } else {
          toast.error("Failed to fetch categories!");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories!");
      }
    };

    fetchCategories();
  }, [backendUrl]);

  // Handle Edit Button Click
  const handleEdit = (category) => {
    setEditMode(category.categoryId); // Set edit mode for the category
    setEditedCategory(category); // Set the current category to edit
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Save Button Click
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/admin/edit-category/${editedCategory.categoryId}`,
        editedCategory
      );
      if (response.data.success) {
        toast.success("Category updated successfully!");
        // Update the categories list with the updated category
        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat.categoryId === editedCategory.categoryId
              ? { ...editedCategory }
              : cat
          )
        );
        setEditMode(null); // Exit edit mode
      } else {
        toast.error("Failed to update category!");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Error updating category!");
    }
  };

  // Handle Delete Button Click
  const handleDelete = async (categoryId) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this category? This action cannot be undone."
    );

    if (!isConfirmed) {
      return; // Cancel deletion if user clicks "Cancel"
    }

    // Proceed with deletion if confirmed
    try {
      const response = await axios.delete(
        `${backendUrl}/api/admin/delete-category/${categoryId}`
      );
      if (response.data.success) {
        toast.success("Category deleted successfully!");
        // Remove the deleted category from the state
        setCategories((prevCategories) =>
          prevCategories.filter((cat) => cat.categoryId !== categoryId)
        );
      } else {
        toast.error("Failed to delete category!");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Error deleting category!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
        Manage Categories
      </h1>
      <div className="max-w-[90vw] mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4">
        {categories.map((category) => (
          <div
            key={category.categoryId}
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md"
          >
            {/* Editable Fields */}
            <div className="flex-1 space-y-2">
              <div>
                <span className="font-bold">Category ID: </span>
                <span>{category.categoryId}</span>{" "}
                {/* Static and non-editable */}
              </div>
              <div>
                <span className="font-bold">Category Name: </span>
                {editMode === category.categoryId ? (
                  <input
                    type="text"
                    name="categoryName"
                    value={editedCategory.categoryName || ""}
                    onChange={handleInputChange}
                    className="bg-white p-2 rounded-lg border border-gray-300 w-full"
                  />
                ) : (
                  <span>{category.categoryName}</span>
                )}
              </div>
            </div>

            {/* Actions: Edit / Save / Delete */}
            <div className="ml-4 flex space-x-4">
              {editMode === category.categoryId ? (
                <>
                  <button
                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
                    onClick={() => setEditMode(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
                    onClick={() => handleDelete(category.categoryId)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetCategories;
