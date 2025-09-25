import express from "express";
import { getAllUsersArrivalData, getDistance, saveUserArrivalDataApi } from "../controllers/userArrivalController.js";

const router = express.Router();

// Routes
router.post("/updateArrivalListData", saveUserArrivalDataApi);
router.get("/getArrivalListData", getAllUsersArrivalData);
router.get("/distance", getDistance);

export default router;
