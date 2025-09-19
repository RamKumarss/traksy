import express from "express";
import { getAllUsersArrivalData, getDistance, saveUserArrivalData } from "../controllers/userArrivalController";

const router = express.Router();

// Routes
router.post("/updateArrivalListData", saveUserArrivalData);
router.get("/getArrivalListData", getAllUsersArrivalData);
router.get("/distance", getDistance);

export default router;
