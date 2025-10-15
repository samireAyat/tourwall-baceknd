import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  id: Number,
  title: { type: String, required: true },
  description: String,
  images: String,
  coverImage: String,
  isOrganizational: Boolean,
  foodAndHome: String,
  String: String,
  otherServices: String,
  route: String,
});

export default mongoose.model("Tour", tourSchema);
