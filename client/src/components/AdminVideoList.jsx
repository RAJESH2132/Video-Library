import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import editIcon from "../assets/edit.svg"; // Import edit icon
import deleteIcon from "../assets/delete.svg"; // Import delete icon

const AdminVideoList = () => {
  const [categories, setCategories] = useState([]);
  const { backendUrl } = useContext(AppContext);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  // Fetch categories
  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/admin/get-categories`
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch videos
  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/admin/get-videos`);
      setVideos(response.data.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  // Fetch categories and videos on mount
  useEffect(() => {
    fetchCategory();
    fetchVideos();
  }, []);

  // Edit video handler
  const handleEdit = (videoId) => {
    navigate(`/admin/edit-video/${videoId}`);
  };

  // Delete video handler
  const handleDelete = async (videoId) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        await axios.delete(`${backendUrl}/api/admin/delete-video/${videoId}`);
        setVideos((prevVideos) =>
          prevVideos.filter((video) => video.videoId !== videoId)
        );
      } catch (error) {
        console.error("Error deleting video:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-8">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        Admin Dashboard
      </h1>

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
              <th className="py-3 px-6 text-center text-lg font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr
                key={video._id}
                className="border-b hover:bg-indigo-50 transition duration-200"
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
                <td className="py-4 px-6 text-center">
                  <button
                    className="mr-4"
                    onClick={() => handleEdit(video.videoId)}
                  >
                    <img
                      src={editIcon}
                      alt="Edit"
                      className="w-6 h-6 inline-block"
                    />
                  </button>
                  <button onClick={() => handleDelete(video.videoId)}>
                    <img
                      src={deleteIcon}
                      alt="Delete"
                      className="w-6 h-6 inline-block"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVideoList;
