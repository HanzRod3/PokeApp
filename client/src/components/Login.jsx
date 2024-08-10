import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8004/user/login",
        { username, password },
        { withCredentials: true }
      );
      console.log(response.data);
      navigate("/home"); // Redirect to the homepage or any other route on successful login
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>Dont Have an account?</p>
        <Link to={"/register"}> Sign up for free!</Link>
      </form>
    </div>
  );
};

export default Login;
