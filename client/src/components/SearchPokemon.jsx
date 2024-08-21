import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext.jsx";

const SearchPokemon = () => {
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");
  const [pokeData, setPokeData] = useState({
    name: "",
    pokedexNumber: "",
    types: [],
    moves: [],
    sprite: "",
  });

  const searchPokemon = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
      );
      const typesData = response.data.types.map((pokemon) => pokemon.type.name);
      const movesData = response.data.moves
        .slice(0, 4)
        .map((pokemonMove) => pokemonMove.move.name);

      setPokemon(response.data);
      setPokeData({
        name: response.data.name,
        pokedexNumber: response.data.id,
        types: typesData,
        moves: movesData,
        sprite: response.data.sprites.front_default,
      });
    } catch (err) {
      setError("Pokémon not found");
      setPokemon(null);
    }
  };

  const savePokemon = async () => {
    try {
      await axios.post(
        "http://localhost:8004/pokemon/save",
        {
          name: pokeData.name,
          pokedexNumber: pokeData.pokedexNumber,
          types: pokeData.types,
          moves: pokeData.moves,
          sprite: pokeData.sprite,
        },
        { withCredentials: true }
      );
      alert("Pokémon saved successfully!");
    } catch (err) {
      setError("Failed to save Pokémon");
      console.log(pokeData);
    }
  };

  const goToHome = () => {
    navigate("/home");
  };

  return (
    <div>
      <h2>Search and Add Pokémon</h2>
      <form onSubmit={searchPokemon}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter Pokémon name or number"
          required
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {pokemon && (
        <div>
          <h3>
            {pokemon.name} (#{pokemon.id})
          </h3>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Types: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
          <p>
            Moves:{" "}
            {pokemon.moves
              .slice(0, 4)
              .map((move) => move.move.name)
              .join(", ")}
          </p>
          <button onClick={savePokemon}>Save to Database</button>
        </div>
      )}

      <button onClick={goToHome} style={{ marginTop: "20px" }}>
        Back to Home
      </button>
    </div>
  );
};

export default SearchPokemon;
