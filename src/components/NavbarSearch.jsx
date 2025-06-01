import { useContext } from "react";
import { CartContext } from "../components/cartContext"
import "../Styles/NavbarSearch.css";
import { Link } from 'react-router-dom';

export default function NavbarSearch() {
  const { cartItems } = useContext(CartContext);

  const cartCount = cartItems.length;
   const user = JSON.parse(localStorage.getItem("user"));
  const firstLetter = user ? user.username.charAt(0).toUpperCase() : "";


  return (
    <div>
      <nav>
        <div className="menu-icon">
          <span className="fas fa-bars" />
        </div>
        <div className="logo">Petopia</div>
        <ul className="nav-items">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Toys/Accessories</a>
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
        <div className="small-circle">{firstLetter}</div>
      </nav>
    </div>
  );
}
