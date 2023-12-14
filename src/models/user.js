import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true }, //When you create an index on a field, the database can quickly locate and retrieve documents based on that field.
  password: { type: String, required: true },
});

export default mongoose.model("User", UserSchema);
