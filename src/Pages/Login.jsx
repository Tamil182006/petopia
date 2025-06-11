import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSeller, setIsSeller] = useState(false); // 🔥 Add this toggle

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    const url = isSeller
      ? "http://localhost:5000/api/seller/login" // 👈 seller login route
      : "http://localhost:5000/api/login"; // 👈 user login route

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

    if (response.ok) {
  alert(data.message);
  
  const loggedUser = data.user || data.seller;
  if (!loggedUser) {
    alert("Login successful, but no user data returned.");
    return;
  }

  localStorage.setItem(isSeller ? "seller" : "user", JSON.stringify(loggedUser));

  if (isSeller) {
    navigate("/sellerdashboard");
  } else {
    navigate("/mainpage");
  }
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
    navigate(isSeller ? "/sellersignup" : "/signup");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>{isSeller ? "Seller Login" : "Login to Petopia"}</h1>

        <input
          type="text"
          placeholder={isSeller ? "Email or Mobile" : "Username"}
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

        <button type="submit">{isSeller ? "Login as Seller" : "Log In"}</button>

        <div className="links">
          <a href="#" onClick={handleSignup}>
            {isSeller ? "Seller Sign Up" : "User Sign Up"}
          </a>
          <br />
          <button
            type="button"
            onClick={() => setIsSeller(!isSeller)}
            style={{ marginTop: "10px" }}
          >
            {isSeller ? "Switch to User Login" : "Switch to Seller Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
