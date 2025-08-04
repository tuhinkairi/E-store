import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  altText: { type: String, required: true },
});
export default ImageSchema