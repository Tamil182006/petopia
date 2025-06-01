import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { dogDetails } from "../dogDetails.js";
import "../Styles/Petdetail.css";
import NavbarSearch from "./NavbarSearch.jsx";
import { useContext } from "react";
import { CartContext } from "../components/cartContext";

export default function PetDetail() {
  const navigate = useNavigate();

  const { id } = useParams();
  const pet = dogDetails.find((p) => p.id === parseInt(id));

  if (!pet)
    return (
      <div
        style={{ textAlign: "center", fontSize: "1.25rem", padding: "2rem" }}
      >
        Pet not found!
      </div>
    );

  const { addToCart } = useContext(CartContext);
    
return (
    <div>
      <NavbarSearch />
      <div className="pet-detail-container">
        {/* Left Section */}
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

        {/* Right Section */}
        <div className="pet-info-section">
          <h1 className="pet-name">{pet.name}</h1>
          <p className="pet-description">{pet.description}</p>

          <ul className="pet-details-list">
            <li>
              <strong>Age:</strong> {pet.age}
            </li>
            <li>
              <strong>Weight:</strong> {pet.weight}
            </li>
            <li>
              <strong>Breed Type:</strong> {pet.breedType}
            </li>
            <li>
              <strong>Vaccinated:</strong> {pet.vaccinated ? "Yes" : "No"}
            </li>
            <li>
              <strong>Trained:</strong> {pet.trained}
            </li>
            <li>
              <strong>Temperament:</strong> {pet.temperament}
            </li>
            <li>
              <strong>Energy Level:</strong> {pet.energyLevel}
            </li>
            <li>
              <strong>Registration:</strong> {pet.registration}
            </li>
          </ul>

          <div className="pet-diet-section">
            <h2>Diet</h2>
            <ul>
              {pet.diet.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="pet-care-section">
            <h2>Care Instructions</h2>
            <ul>
              {pet.careInstructions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="pet-inclusions-section">
            <h2>Inclusions</h2>
            <ul>
              {pet.inclusions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

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
