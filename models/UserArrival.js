import mongoose from "mongoose";

const UserArrivalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: string,
  distance: string,

});

export default mongoose.model("userarrivaldata", UserArrivalSchema);
