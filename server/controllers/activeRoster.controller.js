import ActiveRoster from "../models/activeRoster.model.js";
import Pokemon from "../models/pokemon.model.js";

export const addToActiveRoster = async (req, res) => {
  try {
    const { user } = req;
    const { pokemon } = req.body;

    let activeRoster = await ActiveRoster.findOne({ user: req.body.userId });
    if (!activeRoster) {
      activeRoster = new ActiveRoster({
        user: req.body.userId,
        activePokemons: [],
      });
    }

    if (activeRoster.activePokemons.length >= 6) {
      return res.status(400).json({ message: "Active Roster is full" });
    }

    const newPokemon = new Pokemon({
      name: pokemon.name,
      pokedexNumber: pokemon.pokedexNumber,
      types: pokemon.types,
      moves: pokemon.moves,
      sprite: pokemon.sprite,
    });

    await newPokemon.save();
    activeRoster.activePokemons.push(newPokemon);
    await activeRoster.save();

    res.status(200).json({ message: "Pokémon added to Active Roster" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add Pokémon to Active Roster", error });
  }
};

export const getActiveRoster = async (req, res) => {
  try {
    const activeRoster = await ActiveRoster.findOne({
      user: req.body.userId,
    }).populate("activePokemons");
    if (!activeRoster) {
      return res.status(404).json({ message: "Active Roster not found" });
    }
    res.status(200).json({ activeRoster });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve Active Roster", error });
  }
};
