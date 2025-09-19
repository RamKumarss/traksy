import express from "express";
import mongoose from "mongoose";
import userArrivalRoutes from "./routes/userArrivalRoutes.js";

const app = express();
app.use(express.json());

// 🔑 Replace with your actual MongoDB URI
const MONGO_URI = "mongodb+srv://ramssss467_db_user:zJj0U2IPmYeLZ9eo@cluster0.dlfwrq2.mongodb.net/";

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Use Routes
app.use("/api", userArrivalRoutes);

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
