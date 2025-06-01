import { useNavigate } from 'react-router-dom';
import '../Styles/Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };
  const handlelogin = () => {
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">Petopia</div>

        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="#toys">Toys</a></li>
          <li><a href="#food">Food</a></li>
          <li><a href="#medicines">Medicines</a></li>
          <li><a href="#cart">Cart 🛒</a></li>
          <button className='log' onClick={handlelogin}>Login</button>
          <button className='log' onClick={handleSignup}>Sign Up</button>
        </ul>
      </div>
    </nav>
  );
}
