import express from "express";
import {
  addToActiveRoster,
  getActiveRoster,
} from "../controllers/activeRoster.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", authenticate, addToActiveRoster);
router.get("/", authenticate, getActiveRoster);

export default router;
