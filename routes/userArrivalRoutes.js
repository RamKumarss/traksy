import express from "express";
import { getAllUsersArrivalData, getDistance, saveUserArrivalDataApi, updateArrivalTimeWithScheduler } from "../controllers/userArrivalController.js";

const router = express.Router();

// Routes
router.post("/updateArrivalListData", saveUserArrivalDataApi);
router.get("/getArrivalListData", getAllUsersArrivalData);
router.get("/distance", getDistance);
router.post("/schedule-task", updateArrivalTimeWithScheduler)

export default router;
