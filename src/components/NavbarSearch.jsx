import { useContext, useState } from "react";
import { CartContext } from "../components/cartContext";
import "../Styles/NavbarSearch.css";
import { Link, useNavigate } from 'react-router-dom';

export default function NavbarSearch() {
  const { cartItems } = useContext(CartContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const cartCount = cartItems.length;
  const user = JSON.parse(localStorage.getItem("user"));
  const firstLetter = user?.username?.charAt(0).toUpperCase() || "";

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const handleMyOrders = () => {
    setShowDropdown(false);
    navigate("/myorder");
  };

  return (
    <div>
      <nav>
        <div className="menu-icon">
          <span className="fas fa-bars" />
        </div>
        <div className="logo">Petopia</div>
        <ul className="nav-items">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/toypage">Toys</Link>
          </li>
          <li>
            <a href="#">Medicine</a>
          </li>
          <li>
            <a href="#">Value Packs</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <Link to="/cart">
              Cart 🛒
              {cartCount > 0 && (
                <span className="cart-count-badge">{cartCount}</span>
              )}
            </Link>
          </li>
        </ul>
        <div className="search-icon">
          <span className="fas fa-search" />
        </div>
        <div className="cancel-icon">
          <span className="fas fa-times" />
        </div>
        <form action="#">
          <input
            type="search"
            className="search-data"
            placeholder="Search"
            required=""
          />
          <button type="submit" className="fas fa-search" />
        </form>

        {/* Profile circle and dropdown container */}
        <div className="profile-dropdown-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
          <div
            className="small-circle"
            role="button"
            onClick={toggleDropdown}
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && toggleDropdown()}
          >
            {firstLetter}
          </div>

          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={handleMyOrders}>My Orders</button>
              
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
