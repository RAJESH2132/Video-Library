import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    videoId: { type: Number, required: true, unique: true }, // Primary Key
    title: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    categoryId: { type: Number, required: true, ref: "Category" }, // Foreign Key linking to tblcategories
    comments: { type: [String], default: [] },
  },
  { timestamps: true }
);

const videoModel =
  mongoose.models.video || mongoose.model("video", videoSchema);
export default videoModel;
