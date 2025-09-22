import mongoose from "mongoose";

const UserArrivalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: String,
  distance: String,
  lastUpdateTime: {
    type: Date,   // ✅ Use Date, MongoDB automatically stores in UTC
    required: true
  },

});

export default mongoose.model("UserArrival", UserArrivalSchema, "userarrivaldata");

