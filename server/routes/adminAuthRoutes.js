import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  register,
  login,
  addCategory,
  addVideo,
  logout,
  deleteVideoById,
  deleteCategoryById,
  editCategoryById,
  editVideoById,
  getUsers,
  getUserById,
  isAdminAuthenticated,
} from "../controllers/adminAuthController.js";
import {
  filterVideosByCategoryId,
  getCategories,
  getVideoById,
  getVideos,
} from "../controllers/commonController.js";

const adminRouter = express.Router();

adminRouter.post("/register", register);
adminRouter.post("/login", login);
adminRouter.post("/logout", logout);

adminRouter.get("/is-auth", adminAuth, isAdminAuthenticated);

adminRouter.post("/add-category", adminAuth, addCategory);
adminRouter.post("/add-video", adminAuth, addVideo);

adminRouter.get("/get-users", adminAuth, getUsers);
adminRouter.get("/get-user/:userId", adminAuth, getUserById);

adminRouter.get("/get-videos", adminAuth, getVideos);
adminRouter.get("/get-categories", adminAuth, getCategories);
adminRouter.get("/get-video/:videoId", adminAuth, getVideoById);
adminRouter.get(
  "/filter-videos/:categoryId",
  adminAuth,
  filterVideosByCategoryId
);

adminRouter.delete("/delete-video/:videoId", adminAuth, deleteVideoById);
adminRouter.delete(
  "/delete-category/:categoryId",
  adminAuth,
  deleteCategoryById
);

adminRouter.put("/edit-category/:categoryId", adminAuth, editCategoryById);
adminRouter.put("/edit-video/:videoId", adminAuth, editVideoById);

export default adminRouter;
