import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext.jsx";
import { logout } from "../services/logoutUser.jsx";

const Home = () => {
  const { user, setUser } = useContext(userContext); // Destructure setUser from context
  const [pokeContainer, setPokeContainer] = useState(null);
  const [activeRoster, setActiveRoster] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use navigate for redirecting after logout

  useEffect(() => {
    const fetchPokeContainer = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8004/pokecontainer",
          {
            headers: {
              usertoken: user.token, // Ensure the token is sent in the headers
            }, // Include credentials to receive the cookie
            withCredentials: true,
          }
        );
        console.log(response);

        setPokeContainer(response.data.pokeContainer); // Set the fetched PokeContainer to state
        console.log(pokeContainer);
      } catch (error) {
        setError("Error fetching PokeContainer");
        console.error(error);
      }
    };

    const fetchActiveRoster = async () => {
      try {
        const response = await axios.get("http://localhost:8004/activeroster", {
          headers: {
            usertoken: user.token, // Ensure the token is sent in the headers
          }, //
          withCredentials: true,
        });
        setActiveRoster(response.data.activeRoster); // Set the fetched Active Roster to state
      } catch (error) {
        setError("Error fetching Active Roster");
        console.error(error);
      }
    };

    fetchPokeContainer();
    fetchActiveRoster();
  }, [user]);

  const handleLogout = async () => {
    // Create a function to handle logout
    try {
      //
      await logout(); // Call the logout function from services
      setUser(null); // Clear the user data from context
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed", error);
      setError("Logout failed, please try again.");
    }
  };

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      {error && <p>{error}</p>}
      {pokeContainer && (
        <div>
          <h2>Your PokeContainer:</h2>
          <ul>
            {pokeContainer.pokemons.map((pokemon) => (
              <li key={pokemon._id}>
                {pokemon.name} (#{pokemon.pokedexNumber})
              </li>
            ))}
          </ul>
        </div>
      )}
      {activeRoster && (
        <div>
          <h2>Your Active Roster:</h2>
          <ul>
            {activeRoster.activePokemons.map((pokemon) => (
              <li key={pokemon._id}>
                {pokemon.name} (#{pokemon.pokedexNumber})
              </li>
            ))}
          </ul>
        </div>
      )}
      <div style={{ marginTop: "20px" }}>
        <Link to="/search">Go to Search Pokémon</Link>
      </div>
      <button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Logout
      </button>
    </div>
  );
};

export default Home;
