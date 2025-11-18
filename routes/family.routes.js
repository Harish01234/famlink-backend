// routes/family.routes.js
import { Router } from "express";
import {
  createFamily,
  joinFamilyByCode,
  getFamilyMembers
} from "../controllers/family.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/create", protect, createFamily);
router.post("/join", protect, joinFamilyByCode);
router.post("/members",  getFamilyMembers);

export default router;
