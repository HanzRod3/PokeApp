import PokeContainer from "../models/pokeContainer.model.js";
import User from "../models/user.model.js";
import Pokemon from "../models/pokemon.model.js";
import { createPokemon } from "./pokemon.controller.js";

export const addToPokeContainer = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    let userData = await User.findOne({ _id: req.body.userId });
    if (!userData) {
      console.log("User not found with ID:", req.body.userId);
      return res.status(404).json({ message: "User not found." });
    }
    console.log("User data:", userData);

    let pokemon = await Pokemon.findOne({
      pokedexNumber: req.body.pokedexNumber,
    });
    if (!pokemon) {
      console.log(
        "Pokemon not found with Pokedex number:",
        req.body.pokedexNumber
      );
      pokemon = await createPokemon(req, res);
    }
    console.log("Pokemon data:", pokemon);

    let pokeContainer = await PokeContainer.findOne({ user: userData._id });
    if (!pokeContainer) {
      console.log("PokeContainer not found for user:", userData._id);
      pokeContainer = new PokeContainer({ user: userData._id, pokemons: [] });
    }
    console.log("PokeContainer data before adding pokemon:", pokeContainer);

    pokeContainer.pokemons.push(pokemon);
    await pokeContainer.save();

    console.log("PokeContainer data after adding pokemon:", pokeContainer);

    res
      .status(200)
      .json({ message: "Pokémon added to PokeContainer", pokeContainer });
  } catch (error) {
    console.error("Error adding Pokémon to PokeContainer:", error);
    res
      .status(500)
      .json({ message: "Failed to add Pokémon to PokeContainer", error });
  }
};

export const getPokeContainer = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const pokeContainer = await PokeContainer.findOne({
      user: user._id,
    }).populate("pokemons");

    if (!pokeContainer) {
      return res.status(404).json({ message: "PokeContainer not found." });
    }

    res.status(200).json({ pokeContainer });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve PokeContainer", error });
  }
};
