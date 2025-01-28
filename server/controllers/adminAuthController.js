import adminModel from "../models/adminModel.js";
import categoryModel from "../models/categoryModel.js";
import jwt from "jsonwebtoken";
import Joi from "joi";
import bcrypt from "bcryptjs";
import videoModel from "../models/videosModel.js";
import userModel from "../models/userModel.js";

const registerSchema = Joi.object({
  adminid: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const register = async (req, res) => {
  const { adminid, email, password } = req.body;

  // Validate request body
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  try {
    // Check if the user already exists
    const [adminById, adminByEmail] = await Promise.all([
      adminModel.findOne({ adminid }),
      adminModel.findOne({ email }),
    ]);

    if (adminById || adminByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user
    const admin = new adminModel({
      adminid,
      email,
      password: hashedPassword,
    });
    await admin.save();

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.ADMIN_JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({ success: true, message: "Registration Successful" });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res
      .status(500)
      .json({ success: false, message: "An unexpected error occurred" });
  }
};

export const login = async (req, res) => {
  const { adminid, email, password } = req.body;

  if ((!adminid && !email) || !password) {
    return res.json({
      success: false,
      message: "Either Email or AdminId, and password are required",
    });
  }

  try {
    // Find user by either userid or email
    const admin = await adminModel.findOne({
      $or: [{ adminid }, { email }],
    });

    if (!admin) {
      return res.json({ success: false, message: "Invalid AdminId or Email" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.ADMIN_JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "Login Successfull" });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res
      .status(500)
      .json({ success: false, message: "An unexpected error occurred" });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred during logout",
    });
  }
};

export const addCategory = async (req, res) => {
  const { categoryId, categoryName } = req.body;

  if (!categoryId || !categoryName) {
    return res.json({ success: false, message: "All fields are required" });
  }

  // Convert categoryId to a number
  const numericCategoryId = Number(categoryId);

  // Validate if categoryId is a valid number
  if (isNaN(numericCategoryId)) {
    return res.json({ success: false, message: "Invalid categoryId" });
  }

  try {
    // Check if the categoryId already exists in the database
    const existingCategory = await categoryModel.findOne({
      categoryId: numericCategoryId,
    });

    if (existingCategory) {
      return res.json({
        success: false,
        message: "Category ID already exists",
      });
    }

    // Create and save the new category
    const category = new categoryModel({
      categoryId: numericCategoryId,
      categoryName,
    });
    await category.save();

    return res.json({ success: true, message: "Category Added Successfully" });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res
      .status(500)
      .json({ success: false, message: "An unexpected error occurred" });
  }
};

export const addVideo = async (req, res) => {
  const {
    videoId,
    title,
    url,
    description,
    likes,
    dislikes,
    views,
    categoryId,
    comments,
  } = req.body;

  const numericVideoId = Number(videoId);
  const numericLikes = Number(likes);
  const numericDiLikes = Number(dislikes);
  const numericViews = Number(views);
  const numericCategoryId = Number(categoryId);

  if (!videoId || !title || !url || !description || !categoryId) {
    return res.json({ success: false, message: "Fill all the Fields" });
  }

  if (
    isNaN(numericVideoId) &&
    isNaN(numericLikes) &&
    isNaN(numericDiLikes) &&
    isNaN(numericViews) &&
    isNaN(numericCategoryId)
  ) {
    return res.json({ success: false, message: "Invalid Input" });
  }

  try {
    const existingVideo = await videoModel.findOne({
      videoId: numericVideoId,
    });

    if (existingVideo) {
      return res.json({
        success: false,
        message: "Video ID already exists",
      });
    }

    const video = new videoModel({
      videoId: numericVideoId,
      title,
      url,
      description,
      likes: numericLikes,
      dislikes: numericDiLikes,
      views: numericViews,
      categoryId: numericCategoryId,
      comments,
    });

    await video.save();
    return res.json({ success: true, message: "Video Added Successfully" });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res
      .status(500)
      .json({ success: false, message: "An unexpected error occurred" });
  }
};

export const deleteVideoById = async (req, res) => {
  try {
    // Extract videoId from request parameters
    const { videoId } = req.params;

    // Validate videoId
    if (!videoId || isNaN(Number(videoId))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid video ID" });
    }

    // Find and delete the video by videoId
    const deletedVideo = await videoModel.findOneAndDelete({
      videoId: Number(videoId),
    });

    // If no video is found, return a 404 response
    if (!deletedVideo) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    // Return success message
    return res
      .status(200)
      .json({ success: true, message: "Video deleted successfully" });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res
      .status(500)
      .json({ success: false, message: "An unexpected error occurred" });
  }
};

export const deleteCategoryById = async (req, res) => {
  try {
    // Extract categoryId from request parameters
    const { categoryId } = req.params;

    // Validate categoryId
    if (!categoryId || isNaN(Number(categoryId))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category ID" });
    }

    // Find and delete the category by categoryId
    const deletedCategory = await categoryModel.findOneAndDelete({
      categoryId: Number(categoryId),
    });

    // If no category is found, return a 404 response
    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // Return success message
    return res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res
      .status(500)
      .json({ success: false, message: "An unexpected error occurred" });
  }
};

export const editCategoryById = async (req, res) => {
  const { categoryId } = req.params; // Extract categoryId from the URL parameters
  const { categoryName } = req.body; // Extract categoryName (and any other fields) from the request body

  // Validate if categoryId is provided and is a valid number
  if (!categoryId || isNaN(Number(categoryId))) {
    return res.json({ success: false, message: "Invalid categoryId" });
  }

  // Validate if categoryName is provided
  if (!categoryName) {
    return res.json({ success: false, message: "Category name is required" });
  }

  try {
    // Find the category by categoryId and update it
    const updatedCategory = await categoryModel.findOneAndUpdate(
      { categoryId: Number(categoryId) }, // Find by categoryId
      { categoryName }, // Update fields: categoryName, description (you can add more fields here)
      { new: true } // Return the updated category
    );

    // If no category is found, return a 404 response
    if (!updatedCategory) {
      return res.json({ success: false, message: "Category not found" });
    }

    // Return success message with the updated category
    return res.json({
      success: true,
      message: "Category updated successfully",
      updatedCategory,
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res
      .status(500)
      .json({ success: false, message: "An unexpected error occurred" });
  }
};

export const editVideoById = async (req, res) => {
  const { videoId } = req.params; // Extract videoId from the URL parameters
  const {
    title,
    url,
    description,
    likes,
    dislikes,
    views,
    categoryId,
    comments,
  } = req.body; // Extract video details from the request body

  // Convert the fields to numbers where applicable
  const numericLikes = Number(likes);
  const numericDislikes = Number(dislikes);
  const numericViews = Number(views);
  const numericCategoryId = Number(categoryId);

  // Validate that all required fields are provided
  if (!title || !url || !description || !categoryId) {
    return res.json({ success: false, message: "Fill all the Fields" });
  }

  // Validate if the videoId is a valid number
  if (isNaN(Number(videoId)) || isNaN(numericCategoryId)) {
    return res.json({ success: false, message: "Invalid Input" });
  }

  try {
    // Find the video by videoId and update its details
    const updatedVideo = await videoModel.findOneAndUpdate(
      { videoId: Number(videoId) }, // Find by videoId
      {
        title,
        url,
        description,
        likes: numericLikes,
        dislikes: numericDislikes,
        views: numericViews,
        categoryId: numericCategoryId,
        comments,
      }, // Fields to update
      { new: true } // Return the updated video document
    );

    // If no video is found, return a 404 response
    if (!updatedVideo) {
      return res.json({ success: false, message: "Video not found" });
    }

    // Return success message and the updated video details
    return res.json({
      success: true,
      message: "Video updated successfully",
      updatedVideo,
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res
      .status(500)
      .json({ success: false, message: "An unexpected error occurred" });
  }
};

export const getUsers = async (req, res) => {
  try {
    // Retrieve all users with selected fields (userid, username, email, mobile)
    const users = await userModel.find(
      {},
      { userid: 1, username: 1, email: 1, mobile: 1 } // 1 to include the field, 0 to exclude it
    );

    // If no users are found
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    // Return the list of users
    return res.json({
      success: true,
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
    });
  }
};

export const getUserById = async (req, res) => {
  const { userId } = req.params; // Extract userId from the URL parameters

  // Validate if userId is provided (check if it's a valid non-empty string)
  if (!userId || typeof userId !== "string") {
    return res.json({ success: false, message: "Invalid userId" });
  }

  try {
    // Find the user by userId and exclude the password field
    const user = await userModel.findOne(
      { userid: userId }, // Query by userId (as a string)
      { password: 0 } // Exclude the password field
    );

    // If the user is not found, return a 404 response
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return the found user, excluding the password field
    return res.json({
      success: true,
      message: "User retrieved successfully",
      user, // The user object no longer includes the password
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
    });
  }
};

export const isAdminAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res
      .status(500)
      .json({ success: false, message: "An unexpected error occurred" });
  }
};
