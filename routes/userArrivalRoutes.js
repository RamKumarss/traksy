import express from "express";
import { getAllUsersArrivalData, saveUserArrivalData } from "../controllers/userArrivalController";

const router = express.Router();

// Routes
router.post("/updateArrivalListData", saveUserArrivalData);
router.get("/getArrivalListData", getAllUsersArrivalData);

export default router;
