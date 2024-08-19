import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link from react-router-dom
import { userContext } from "../context/userContext.jsx";
import { logout } from "../services/logoutUser.jsx";

const Home = () => {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirect to login if user is not authenticated
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log("Error logging out", error);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-blue-500 text-white p-4">
      <h1>Welcome {user.username}</h1>
      <button onClick={handleLogout}>Logout</button>
      {/* Add a Link component to navigate to the search page */}
      <div>
        <Link to="/search" className="text-white underline">
          Go to Search Pokémon
        </Link>
      </div>
    </div>
  );
};

export default Home;
