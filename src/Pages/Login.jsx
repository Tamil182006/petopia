import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Login successful
        // Optionally save user info in localStorage or context here
        // e.g., localStorage.setItem('user', JSON.stringify(data.user));
        navigate("/mainpage");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during login.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Login to Petopia</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
        <div className="links">
          <a href="#" onClick={handleSignup}>
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
}
