import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const EditVideo = () => {
  const { videoId } = useParams(); // Get videoId from the route
  const { backendUrl } = useContext(AppContext);
  const [videoDetails, setVideoDetails] = useState(null); // State to store video details
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch video details by ID
  const fetchVideoDetails = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/admin/get-video/${videoId}`
      );
      setVideoDetails(response.data.data); // Store the video details
    } catch {
      toast.error("Error fetching video details!");
    }
  };

  // Fetch video details on component mount
  useEffect(() => {
    fetchVideoDetails();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const payload = {
        title: videoDetails.title,
        url: videoDetails.url,
        description: videoDetails.description,
        categoryId: parseInt(videoDetails.categoryId), // Ensure it's a number
        likes: parseInt(videoDetails.likes) || 0,
        dislikes: parseInt(videoDetails.dislikes) || 0,
        views: parseInt(videoDetails.views) || 0,
        comments: videoDetails.comments || [],
      };

      const response = await axios.put(
        `${backendUrl}/api/admin/edit-video/${videoId}`,
        payload
      );

      if (response.data.success) {
        toast.success("Video updated successfully!");
        navigate("/admin/dashboard"); // Navigate back to the video list
      } else {
        toast.error(response.data.message || "Failed to update video!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoDetails({ ...videoDetails, [name]: value });
  };

  if (!videoDetails) {
    return <div>Loading video details...</div>;
  }

  return (
    <div className="flex justify-center bg-gray-50">
      <div className="min-h-screen  py-6 px-8 w-2xl">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          Edit Video
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-lg shadow-md"
        >
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={videoDetails.title}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* URL */}
          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700"
            >
              Video URL
            </label>
            <input
              id="url"
              name="url"
              type="url"
              value={videoDetails.url}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={videoDetails.description}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
          <div className="flex space-x-14">
            {/* Category */}
            <div>
              <label
                htmlFor="categoryId"
                className="block text-sm font-medium text-gray-700"
              >
                Category ID
              </label>
              <input
                id="categoryId"
                name="categoryId"
                type="number"
                value={videoDetails.categoryId}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {/* Views */}
            <div>
              <label
                htmlFor="views"
                className="block text-sm font-medium text-gray-700"
              >
                Views
              </label>
              <input
                id="views"
                name="views"
                type="number"
                value={videoDetails.views}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex space-x-14 ">
            {/* Likes */}
            <div>
              <label
                htmlFor="likes"
                className="block text-sm font-medium text-gray-700"
              >
                Likes
              </label>
              <input
                id="likes"
                name="likes"
                type="number"
                value={videoDetails.likes}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Dislikes */}
            <div>
              <label
                htmlFor="dislikes"
                className="block text-sm font-medium text-gray-700"
              >
                Dislikes
              </label>
              <input
                id="dislikes"
                name="dislikes"
                type="number"
                value={videoDetails.dislikes}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Comments */}
          <div>
            <label
              htmlFor="comments"
              className="block text-sm font-medium text-gray-700"
            >
              Comments (comma-separated)
            </label>
            <input
              id="comments"
              name="comments"
              type="text"
              value={videoDetails.comments.join(",")}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "comments",
                    value: e.target.value.split(","),
                  },
                })
              }
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
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
              "Update Video"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditVideo;
