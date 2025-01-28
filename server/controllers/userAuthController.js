import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";

const registerSchema = Joi.object({
  userid: Joi.string().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
});

export const register = async (req, res) => {
  const { userid, username, email, password, mobile } = req.body;

  // Validate request body
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  try {
    // Check if the user already exists
    const [userById, userByEmail] = await Promise.all([
      userModel.findOne({ userid }),
      userModel.findOne({ email }),
    ]);

    if (userById || userByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user
    const user = new userModel({
      userid,
      username,
      email,
      password: hashedPassword,
      mobile,
    });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.USER_JWT_SECRET, {
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
  const { userid, email, password } = req.body;

  if ((!userid && !email) || !password) {
    return res.json({
      success: false,
      message: "Either Email or UserId, and password are required",
    });
  }

  try {
    // Find user by either userid or email
    const user = await userModel.findOne({
      $or: [{ userid }, { email }],
    });

    if (!user) {
      return res.json({ success: false, message: "Invalid UserId or Email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.USER_JWT_SECRET, {
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

export const isUserAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res
      .status(500)
      .json({ success: false, message: "An unexpected error occurred" });
  }
};
