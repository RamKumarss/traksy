import mongoose from "mongoose";

const UserArrivalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: String,
  distance: String,

});

export default mongoose.model("userarrivaldata", UserArrivalSchema);
