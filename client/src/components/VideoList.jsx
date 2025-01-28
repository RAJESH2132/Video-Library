import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const VideoList = () => {
  const [categories, setCategories] = useState([]); // Initialize as an array
  const { backendUrl } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState(""); // Default to no category selected
  const [videos, setVideos] = useState([]); // State to store videos
  const navigate = useNavigate(); // Used for navigation

  // Fetch categories from the API
  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/get-categories`);
      setCategories(response.data.data); // Access the `data` array in the response
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch videos from the API
  const fetchVideos = async () => {
    try {
      const videosResponse = await axios.get(
        `${backendUrl}/api/user/get-videos`
      );
      setVideos(videosResponse.data.data); // Store videos in the state
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  // Fetch categories and videos on component mount
  useEffect(() => {
    fetchCategory();
    fetchVideos();
  }, []);

  // Filter videos based on selected category
  const filteredVideos = selectedCategory
    ? videos.filter((video) =>
        categories
          .filter((category) => category.categoryName === selectedCategory)
          .some((category) => category.categoryId === video.categoryId)
      )
    : videos; // If no category is selected, show all videos

  // Navigate to the video details page
  const handleRowClick = (videoId) => {
    navigate(`/user/video/${videoId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-8">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        User Dashboard
      </h1>
      <p className="mb-4 text-gray-600">Filter By Category</p>

      <div className="mb-6">
        <select
          className="w-full sm:w-72 p-3 bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          name="category"
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="" disabled>
            Choose Category
          </option>
          <option value="">All Videos</option>{" "}
          {/* Option for showing all videos */}
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryName}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full table-auto">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left text-lg font-semibold">
                Title
              </th>
              <th className="py-3 px-6 text-left text-lg font-semibold">
                Preview
              </th>
              <th className="py-3 px-6 text-left text-lg font-semibold">
                Info
              </th>
              <th className="py-3 px-6 text-left text-lg font-semibold">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredVideos.map((video) => (
              <tr
                key={video._id}
                className="border-b hover:bg-indigo-50 transition duration-200 cursor-pointer"
                onClick={() => handleRowClick(video.videoId)} // Add onClick handler here
              >
                <td className="py-4 px-6 text-sm text-gray-700">
                  {video.title}
                </td>
                <td className="py-4 px-6">
                  <iframe
                    src={video.url}
                    title={video.title}
                    width="200"
                    height="113"
                    className="border-0"
                  />
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  <div className="flex flex-col space-y-1">
                    <span>Likes: {video.likes || 0}</span>
                    <span>Dislikes: {video.dislikes || 0}</span>
                    <span>Views: {video.views || 0}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {categories
                    .filter(
                      (category) => category.categoryId === video.categoryId
                    )
                    .map((matchedCategory) => (
                      <span key={matchedCategory.categoryId}>
                        {matchedCategory.categoryName}
                      </span>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VideoList;
