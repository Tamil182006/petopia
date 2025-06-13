import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/cartContext";
import NavbarSearch from "../components/NavbarSearch";
import "../Styles/Mainpage.css";

export default function Mainpage() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
       const res = await fetch("http://localhost:5000/api/seller/pets");

        const data = await res.json();
        if (res.ok) {
          setPets(data.pets);
        } else {
          console.error(data.message || "Failed to fetch pets");
        }
      } catch (err) {
        console.error("Error fetching pets:", err);
      }
    };

    fetchPets();
  }, []);

  return (
    <div>
      <NavbarSearch />
      <div className="main-page">
        <h2 className="section-title">Available Pets</h2>

        <div className="product-grid">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="product-card"
              onClick={() => navigate(`/pet/${pet._id}`)}
            >
              <img
                src={pet.imageUrl}
                alt={pet.name}
                className="product-image"
              />
              <h5>{pet.name}</h5>
              <p>{pet.description}</p>
              <p className="price">
                {typeof pet.price === "number"
                  ? `₹${pet.price.toLocaleString()}`
                  : pet.price}
              </p>

              <div className="button-group">
                <button
                  className="btn"
                  onClick={(e) => {
                    e.stopPropagation();
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
