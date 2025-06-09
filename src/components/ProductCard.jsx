// components/ProductCard.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./cartContext";
import "../Styles/ProductCard.css";

export default function ProductCard({ item, type }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ ...item, type });
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart({ ...item, type });
    navigate("/checkout");
  };

  return (
    <div className="product-card" onClick={() => navigate(`/${type}/${item.id}`)}>
      <img src={item.image} alt={item.name || item.breed} className="product-image" />
      <h3>{item.name || item.breed}</h3>
      <p>{item.description}</p>
      <p className="price">
        ₹{typeof item.price === "number" ? item.price.toLocaleString() : item.price}
      </p>
      <div className="button-group">
        <button className="btn" onClick={handleAddToCart}>Add to Cart</button>
        <button className="btn" onClick={handleBuyNow}>Buy Now</button>
      </div>
    </div>
  );
}
