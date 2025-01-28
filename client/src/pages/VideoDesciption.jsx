import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"; // To access the URL parameters
import { toast } from "react-toastify"; // Assuming you use react-toastify for notifications
import { AppContext } from "../context/AppContext";
import UserLogout from "../components/UserLogout";

const VideoDescription = () => {
  const { videoId } = useParams(); // Get the videoId from the URL
  const [video, setVideo] = useState(null); // State to store the video data
  const { backendUrl, isUserLoggedin } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to "/user" if the user is not logged in
    if (!isUserLoggedin) {
      navigate("/user");
      return;
    }

    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/user/get-video/${videoId}`
        );
        if (response.data.success) {
          setVideo(response.data.data); // Set the video details in the state
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
        toast.error("Error fetching video details!");
      }
    };

    fetchVideoDetails();
  }, [videoId, isUserLoggedin, backendUrl, navigate]);

  if (!video) {
    return <div className="text-center p-6">Loading video details...</div>; // Show loading state while fetching data
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-8 ">
      <UserLogout />
      <div className="max-w-[90vw] mx-auto bg-white shadow-lg rounded-lg p-6 flex flex-col mt-10 md:flex-row space-y-6 md:space-y-0 md:space-x-16">
        {/* Video Player (Left side) */}
        <div className="w-full md:w-3/5 flex justify-center">
          <iframe
            src={video.url}
            title={video.title}
            width="100%"
            height="500"
            className="rounded-lg shadow-md"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {/* <div className="w-full md:w-1/5"></div> */}
        {/* Video Details (Right side) */}
        <div className="w-full md:w-2/5 space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-800">
            {video.title}
          </h1>

          {/* Video Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Description
            </h2>
            <p className="text-gray-600">{video.description}</p>
          </div>

          {/* Stats: Likes, Dislikes, Views */}
          <div className="flex justify-between text-gray-700 font-semibold">
            <div>Likes: {video.likes}</div>
            <div>Dislikes: {video.dislikes}</div>
            <div>Views: {video.views}</div>
          </div>

          {/* Actions (Like, Dislike, Share) */}
          <div className="flex space-x-4">
            <button
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
              onClick={() => toast.success("Liked the video")}
            >
              Like
            </button>
            <button
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
              onClick={() => toast.error("Disliked the video")}
            >
              Dislike
            </button>
            <button
              className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition"
              onClick={() => toast.info("Shared the video")}
            >
              Share
            </button>
          </div>

          {/* Comments Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Comments
            </h2>
            {video.comments.length > 0 ? (
              <ul className="space-y-4">
                {video.comments.map((comment, index) => (
                  <li
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg shadow-sm"
                  >
                    <p className="text-gray-600">{comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDescription;
