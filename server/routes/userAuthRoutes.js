import express from "express";
import {
  isUserAuthenticated,
  login,
  logout,
  register,
} from "../controllers/userAuthController.js";
import userAuth from "../middleware/userAuth.js";
import {
  filterVideosByCategoryId,
  getCategories,
  getVideoById,
  getVideos,
} from "../controllers/commonController.js";

const userAuthRouter = express.Router();

userAuthRouter.post("/register", register);
userAuthRouter.post("/login", login);
userAuthRouter.post("/logout", logout);
userAuthRouter.get("/is-auth", userAuth, isUserAuthenticated);

userAuthRouter.get("/get-videos", userAuth, getVideos);
userAuthRouter.get("/get-categories", userAuth, getCategories);
userAuthRouter.get("/get-video/:videoId", userAuth, getVideoById);
userAuthRouter.get(
  "/filter-videos/:categoryId",
  userAuth,
  filterVideosByCategoryId
);

export default userAuthRouter;
