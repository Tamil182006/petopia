import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import NavbarSearch from "./NavbarSearch";
import { CartContext } from "../components/cartContext";
import "../Styles/Petdetail.css";
import axios from "axios";

export default function Petdetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  axios.get(`http://localhost:5000/api/seller/pets/${id}`)
    .then((res) => {
      setPet(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching pet:", err);
      setLoading(false);
    });
}, [id]);

  if (loading) return <div>Loading...</div>;
  if (!pet) return <div style={{ textAlign: "center" }}>Pet not found!</div>;

  return (
    <div>
      <NavbarSearch />
      <div className="pet-detail-container">
        <div className="pet-image-section">
          <img src={pet.image} alt={pet.name} className="pet-image" />
          <div className="pet-buttons">
            <button className="btn add-cart" onClick={() => addToCart(pet)}>
              Add to Cart
            </button>
            <button className="btn buy-now" onClick={() => navigate("/checkout", { state: pet })}>
              Buy Now
            </button>
          </div>
        </div>

        <div className="pet-info-section">
          <h1 className="pet-name">{pet.name}</h1>
          <p className="pet-description">{pet.description}</p>

          <ul className="pet-details-list">
            <li><strong>Age:</strong> {pet.age}</li>
            <li><strong>Weight:</strong> {pet.weight}</li>
            <li><strong>Breed Type:</strong> {pet.breedType}</li>
            <li><strong>Vaccinated:</strong> {pet.vaccinated ? "Yes" : "No"}</li>
            <li><strong>Trained:</strong> {pet.trained}</li>
            <li><strong>Temperament:</strong> {pet.temperament}</li>
            <li><strong>Energy Level:</strong> {pet.energyLevel}</li>
            <li><strong>Registration:</strong> {pet.registration}</li>
          </ul>

          {pet.diet && pet.diet.length > 0 && (
            <>
              <h2>Diet</h2>
              <ul>{pet.diet.map((item, i) => <li key={i}>{item}</li>)}</ul>
            </>
          )}

          {pet.careInstructions && pet.careInstructions.length > 0 && (
            <>
              <h2>Care Instructions</h2>
              <ul>{pet.careInstructions.map((item, i) => <li key={i}>{item}</li>)}</ul>
            </>
          )}

          {pet.inclusions && pet.inclusions.length > 0 && (
            <>
              <h2>Inclusions</h2>
              <ul>{pet.inclusions.map((item, i) => <li key={i}>{item}</li>)}</ul>
            </>
          )}

          <div className="pet-price-section">
            <span className="price">₹{pet.price.toLocaleString()}</span>
            {pet.originalPrice && (
              <span className="original-price">
                ₹{pet.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
