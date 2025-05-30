import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/mainpage");
  };
  const handlesignup = (e) => {
    e.preventDefault();
    navigate("/signup")
  }

  return (
    <div className="login-container">
      <form className="login-form">
        <h1>Login to Petopia</h1>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit" onClick={handleLogin}>Log In</button>
        <div className="links">
          <a href="#">Forgot Password?</a>
          <a href="#" onClick={handlesignup}>Sign Up</a>
        </div>
      </form>
    </div>
  );
}
