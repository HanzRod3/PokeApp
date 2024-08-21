import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext.jsx";
import { Link } from "react-router-dom";

const Login = () => {
  const { setUser } = useContext(userContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:8004/user/login",
        { username, password },
        { withCredentials: true }
      );

      if (response.status === 200 && response.data.user) {
        const token = response.data.token;
        setUser({ ...response.data.user, token });
        setSuccess("Login successful! Redirecting...");
        console.log(response.data.user);

        setTimeout(() => {
          navigate("/home");
        }, 10000);
      } else {
        setError("Login failed");
      }
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
        {success && <p style={{ color: "green" }}>{success}</p>}
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
        <p>Don't have an account?</p>
        <Link to="/register">Sign up for free!</Link>
      </form>
    </div>
  );
};

export default Login;
