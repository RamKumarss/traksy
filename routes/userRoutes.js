import express from "express";
import { getUserByName, saveUser } from "../controllers/userController.js";

const router = express.Router();

// Routes
router.post("/addUser", saveUser);
router.get("/getUser/:name", getUserByName);

export default router;
