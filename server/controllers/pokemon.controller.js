import Pokemon from "../models/pokemon.model.js";

export const createPokemon = async (req, res) => {
  try {
    const newPokemon = await Pokemon.create(req.body);
    return newPokemon;
  } catch (error) {
    res.status(400).json({ message: "Failed to create Pokémon", error });
    throw error;
  }
};

export const savePokemon = async (req, res) => {
  const { name, pokedexNumber, types, moves, sprite } = req.body;

  try {
    const newPokemon = new Pokemon({
      name,
      pokedexNumber,
      types,
      moves,
      sprite,
    });

    await newPokemon.save();
    res.status(201).send("Pokémon saved successfully");
  } catch (err) {
    res.status(500).send("Error saving Pokémon");
  }
};

// Controller function to get all Pokémon in the PokeContainer
export const getPokeContainer = async (req, res) => {
  try {
    const pokeContainer = await Pokemon.find(); // Fetch all Pokémon from the database
    res.status(200).json({ pokeContainer }); // Send the fetched Pokémon as a response
    console.log(pokeContainer); // Log the fetched Pokémon to the console
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch PokeContainer", error });
  } // Send an error message if the request fails
};

export const getActiveRoster = async (req, res) => {
  try {
    const activeRoster = await Pokemon.find({ isActive: true }); // Example query
    res.status(200).json({ activeRoster });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Active Roster", error });
  }
};
