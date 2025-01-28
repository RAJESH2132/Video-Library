import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  adminid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const adminModel =
  mongoose.models.admin || mongoose.model("admin", adminSchema);
export default adminModel;
