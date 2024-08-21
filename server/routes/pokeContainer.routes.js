import express from "express";
import {
  addToPokeContainer,
  getPokeContainer,
} from "../controllers/pokeContainer.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticate, getPokeContainer);
router.post("/add", authenticate, addToPokeContainer);

export default router;
