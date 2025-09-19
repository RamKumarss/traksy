import express from "express";
import mongoose from "mongoose";
import userArrivalRoutes from "./routes/userArrivalRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import cors from "cors";   // ✅ Import cors

dotenv.config(); // Load environment variables from .env

const app = express();
// ✅ Allow CORS for all requests
app.use(cors());
app.use(express.json());

// 🔑 Use environment variable for MongoDB URI
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("❌ Error: MONGODB_URI is not defined in environment variables");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Use Routes
app.use("/api/locationData", userArrivalRoutes);
app.use("/api/user", userRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
