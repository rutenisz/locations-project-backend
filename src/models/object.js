import mongoose from "mongoose";

const objectSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  photo_url: { type: String, required: true },
  owner_id: { type: String, required: true },
});

export default mongoose.model("Object", objectSchema);
