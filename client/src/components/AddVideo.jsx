// import { useContext, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AppContext } from "../context/AppContext";

// const AddVideo = () => {
//   const [videoId, setVideoId] = useState("");
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");
//   const [description, setDescription] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [likes, setLikes] = useState(0);
//   const [dislikes, setDislikes] = useState(0);
//   const [views, setViews] = useState(0); // Views field added
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { backendUrl } = useContext(AppContext);

//   // Categories for the dropdown (could be fetched from an API)
//   const categories = [
//     { id: 1, name: "Sports" },
//     { id: 2, name: "Music" },
//     { id: 3, name: "Education" },
//     { id: 4, name: "Movies" },
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!videoId || !title || !url || !description || !categoryId) {
//       toast.error(
//         "All fields except likes, dislikes, views, and comments are required!"
//       );
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         videoId: parseInt(videoId),
//         title,
//         url,
//         description,
//         likes: parseInt(likes) || 0,
//         dislikes: parseInt(dislikes) || 0,
//         views: parseInt(views) || 0, // Parse views as an integer
//         categoryId: parseInt(categoryId), // Ensure categoryId is a number
//         comments: comments.length ? comments.split(",") : [],
//       };

//       const { data } = await axios.post(
//         `${backendUrl}/api/admin/add-video`,
//         payload
//       );

//       if (data.success) {
//         toast.success("Video added successfully!");
//         setVideoId("");
//         setTitle("");
//         setUrl("");
//         setDescription("");
//         setCategoryId("");
//         setLikes(0);
//         setDislikes(0);
//         setViews(0); // Reset views field
//         setComments("");
//       } else {
//         toast.error(data.message || "Failed to add video");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md  border-2 border-gray-400 md:mx-40">
//       <h2 className="text-2xl font-semibold mb-4">Add Video</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Video ID */}
//         <div>
//           <label
//             htmlFor="videoId"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Video ID
//           </label>
//           <input
//             id="videoId"
//             type="number"
//             value={videoId}
//             onChange={(e) => setVideoId(e.target.value)}
//             required
//             className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Enter video ID"
//           />
//         </div>

//         {/* Title */}
//         <div>
//           <label
//             htmlFor="title"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Title
//           </label>
//           <input
//             id="title"
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Enter video title"
//           />
//         </div>

//         {/* URL */}
//         <div>
//           <label
//             htmlFor="url"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Video URL
//           </label>
//           <input
//             id="url"
//             type="url"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             required
//             className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Enter video URL"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Description
//           </label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//             className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Enter video description"
//           ></textarea>
//         </div>

//         {/* Category */}
//         <div>
//           <label
//             htmlFor="categoryId"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Category
//           </label>
//           <select
//             id="categoryId"
//             value={categoryId}
//             onChange={(e) => setCategoryId(e.target.value)}
//             required
//             className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//           >
//             <option value="">Select a category</option>
//             {categories.map((category) => (
//               <option key={category.id} value={category.id}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Likes */}
//         <div>
//           <label
//             htmlFor="likes"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Likes (optional)
//           </label>
//           <input
//             id="likes"
//             type="number"
//             value={likes}
//             onChange={(e) => setLikes(e.target.value)}
//             className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Enter initial likes count"
//           />
//         </div>

//         {/* Dislikes */}
//         <div>
//           <label
//             htmlFor="dislikes"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Dislikes (optional)
//           </label>
//           <input
//             id="dislikes"
//             type="number"
//             value={dislikes}
//             onChange={(e) => setDislikes(e.target.value)}
//             className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Enter initial dislikes count"
//           />
//         </div>

//         {/* Views */}
//         <div>
//           <label
//             htmlFor="views"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Views (optional)
//           </label>
//           <input
//             id="views"
//             type="number"
//             value={views}
//             onChange={(e) => setViews(e.target.value)}
//             className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Enter initial views count"
//           />
//         </div>

//         {/* Comments */}
//         <div>
//           <label
//             htmlFor="comments"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Comments (comma-separated, optional)
//           </label>
//           <input
//             id="comments"
//             type="text"
//             value={comments}
//             onChange={(e) => setComments(e.target.value)}
//             className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Enter initial comments, separated by commas"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-2.5 rounded-md bg-indigo-500 text-white font-medium flex justify-center items-center"
//         >
//           {loading ? (
//             <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
//           ) : (
//             "Add Video"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddVideo;

import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const AddVideo = () => {
  const [videoId, setVideoId] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [views, setViews] = useState(0); // Views field added
  const [comments, setComments] = useState([]);
  const [categories, setCategories] = useState([]); // State to store categories
  const [loading, setLoading] = useState(false);
  const { backendUrl } = useContext(AppContext);

  // Fetch categories dynamically
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoId || !title || !url || !description || !categoryId) {
      toast.error(
        "All fields except likes, dislikes, views, and comments are required!"
      );
      return;
    }

    try {
      setLoading(true);

      const payload = {
        videoId: parseInt(videoId),
        title,
        url,
        description,
        likes: parseInt(likes) || 0,
        dislikes: parseInt(dislikes) || 0,
        views: parseInt(views) || 0, // Parse views as an integer
        categoryId: parseInt(categoryId), // Ensure categoryId is a number
        comments: comments.length ? comments.split(",") : [],
      };

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-video`,
        payload
      );

      if (data.success) {
        toast.success("Video added successfully!");
        setVideoId("");
        setTitle("");
        setUrl("");
        setDescription("");
        setCategoryId("");
        setLikes(0);
        setDislikes(0);
        setViews(0); // Reset views field
        setComments("");
      } else {
        toast.error(data.message || "Failed to add video");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md  border-2 border-gray-400 md:mx-40">
      <h2 className="text-2xl font-semibold mb-4">Add Video</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Video ID */}
        <div>
          <label
            htmlFor="videoId"
            className="block text-sm font-medium text-gray-700"
          >
            Video ID
          </label>
          <input
            id="videoId"
            type="number"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter video ID"
          />
        </div>

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
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter video title"
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
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter video URL"
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter video description"
          ></textarea>
        </div>

        {/* Category
        <div>
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div> */}

        <div>
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Likes */}
        <div>
          <label
            htmlFor="likes"
            className="block text-sm font-medium text-gray-700"
          >
            Likes (optional)
          </label>
          <input
            id="likes"
            type="number"
            value={likes}
            onChange={(e) => setLikes(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter initial likes count"
          />
        </div>

        {/* Dislikes */}
        <div>
          <label
            htmlFor="dislikes"
            className="block text-sm font-medium text-gray-700"
          >
            Dislikes (optional)
          </label>
          <input
            id="dislikes"
            type="number"
            value={dislikes}
            onChange={(e) => setDislikes(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter initial dislikes count"
          />
        </div>

        {/* Views */}
        <div>
          <label
            htmlFor="views"
            className="block text-sm font-medium text-gray-700"
          >
            Views (optional)
          </label>
          <input
            id="views"
            type="number"
            value={views}
            onChange={(e) => setViews(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter initial views count"
          />
        </div>

        {/* Comments */}
        <div>
          <label
            htmlFor="comments"
            className="block text-sm font-medium text-gray-700"
          >
            Comments (comma-separated, optional)
          </label>
          <input
            id="comments"
            type="text"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter initial comments, separated by commas"
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
            "Add Video"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddVideo;
