import { useNavigate } from "react-router-dom";
import NavbarSearch from "../components/NavbarSearch";
import {pets} from "../productsData.js";

import "../Styles/Mainpage.css"

export default function Mainpage() {
    const navigate = useNavigate();
  return (
    <div>
      <NavbarSearch />
     <div className="main-page">
      <h2 className="section-title">Available Pets</h2>
      <div className="product-grid">
        {pets.map(pet => (
          <div key={pet.id} className="product-card"
           onClick={() => navigate(`/pet/${pet.id}`)} >
            <img src={pet.image} alt={pet.name} className="product-image" />
            <h5>{pet.name}</h5>
            <p>{pet.description}</p>
            <p className="price">{pet.price}</p>
            <button className="btn" onClick={() => addToCart(pet)}>Add cart</button>
            <button className="btn">Buy Now</button>
          </div>
        ))}
      </div>

    </div>

    </div>
  );
}
