import { useNavigate } from "react-router-dom";
import { useContext, useMemo } from "react";
import { CartContext } from "../components/cartContext";
import NavbarSearch from "../components/NavbarSearch";
import { pets } from "../productsData";

import "../Styles/Mainpage.css";

export default function Mainpage() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // Since pets already contains both dogs and cats, just shuffle pets array
  const shuffledPets = useMemo(() => {
    return pets
      .map((pet) => ({ pet, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ pet }) => pet);
  }, []);

  return (
    <div>
      <NavbarSearch />
      <div className="main-page">
        <h2 className="section-title">Available Pets</h2>

        <div className="product-grid">
          {shuffledPets.map((pet) => (
            <div
              key={pet.id}
              className="product-card"
              onClick={() => navigate(`/pet/${pet.id}`)}
            >
              <img src={pet.image} alt={pet.name} className="product-image" />
              <h5>{pet.name}</h5>
              <p>{pet.description}</p>
              {/* Handle price as string or number gracefully */}
              <p className="price">
                {typeof pet.price === "number" ? `₹${pet.price.toLocaleString()}` : pet.price}
              </p>

              <div className="button-group">
                <button
                  className="btn"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent parent click
                    addToCart(pet);
                  }}
                >
                  Add to Cart
                </button>

                <button
                  className="btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(pet);
                    navigate("/checkout");
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
