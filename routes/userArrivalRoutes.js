import express from "express";
import { saveUser, getAllUsers } from "../controllers/userArrivalController.js";

const router = express.Router();

// Routes
router.post("/save", saveUser);
router.get("/data", getAllUsers);

export default router;
