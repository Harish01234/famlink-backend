// routes/location.routes.js
import { Router } from "express";
import { updateLocation, getLatestLocation } from "../controllers/location.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// child sending location (you can skip `protect` if using device token later)
router.post("/update", updateLocation);

// parent fetching latest location
router.get("/latest/:childId", protect, getLatestLocation);

export default router;
