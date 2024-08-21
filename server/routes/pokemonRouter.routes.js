import express from "express";
import {
  savePokemon,
  getPokeContainer,
} from "../controllers/pokemon.controller.js";

const router = express.Router();

// Route to save a new Pokémon
router.post("/save", savePokemon);
router.get("/pokeContainer", getPokeContainer);

export default router;
