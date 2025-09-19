import mongoose from "mongoose";

const UserArrivalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  age: Number,
});

export default mongoose.model("userarrivaldata", UserArrivalSchema);
