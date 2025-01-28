import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categoryId: { type: Number, required: true, unique: true }, // Primary Key
    categoryName: { type: String, required: true },
  },
  { timestamps: true }
);

const categoryModel =
  mongoose.models.Category || mongoose.model("category", categorySchema);
export default categoryModel;
