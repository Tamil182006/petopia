import React from "react";
import "../Styles/ToyCard.css";

export default function ToyCard({ toy }) {
  return (
    <div className="toy-card">
      <img src={toy.image} alt={toy.name} />
      <h3>{toy.name}</h3>
      <p>₹{toy.price}</p>
      <button>Add to Cart</button>
    </div>
  );
}
