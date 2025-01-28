import categoryModel from "../models/categoryModel.js";
import videoModel from "../models/videosModel.js";

export const getVideos = async (req, res) => {
  try {
    const videos = await videoModel.find({});

    if (!videos || videos.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No videos found" });
    }

    return res.status(200).json({ success: true, data: videos });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "An unexpected error occured" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({});

    if (!categories || categories.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Categories found" });
    }
    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "An unexpected error occured" });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!videoId || isNaN(Number(videoId))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid video ID" });
    }

    const video = await videoModel.findOne({ videoId: parseInt(videoId) });

    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    // Return the video
    return res.status(200).json({ success: true, data: video });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "An unexpected error occurred" });
  }
};

export const filterVideosByCategoryId = async (req, res) => {
  try {
    // Extract categoryId from request parameters
    const { categoryId } = req.params;

    // Validate categoryId
    if (!categoryId || isNaN(Number(categoryId))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category ID" });
    }

    // Find videos by categoryId
    const videos = await videoModel.find({ categoryId: Number(categoryId) });

    // If no videos are found, return a 404 response
    if (!videos || videos.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No videos found for this category" });
    }

    // Return the filtered videos
    return res.status(200).json({ success: true, data: videos });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res
      .status(500)
      .json({ success: false, message: "An unexpected error occurred" });
  }
};
