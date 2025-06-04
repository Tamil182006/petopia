import React, { useContext } from "react";
import "../Styles/ToyCard.css";
import { CartContext } from "./cartContext";
import { useNavigate } from "react-router-dom";

export default function ToyCard({ toy }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  function handleAddToCart() {
    addToCart({ ...toy, type: "toy" });
    navigate("/cart");
  }

  return (
    <div className="toy-card">
      <img src={toy.image} alt={toy.name} />
      <h3>{toy.name}</h3>
      <p>₹{toy.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
