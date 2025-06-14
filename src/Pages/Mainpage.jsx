import { useEffect, useState, useContext } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import NavbarSearch from "../components/NavbarSearch";
import "../Styles/MainPage.css";
import { CartContext } from "../components/cartContext";

export default function MainPage() {
  const [allPets, setAllPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get("http://localhost:5000/api/seller/pets")
      .then((res) => {
        setAllPets(res.data.pets);
        setFilteredPets(res.data.pets);
      })
      .catch((err) => console.error("Failed to fetch pets", err));
  }, []);

  const handleFilter = (category) => {
    if (category === "all") {
      setFilteredPets(allPets);
    } else {
      const filtered = allPets.filter(
        (pet) => pet.category?.toLowerCase() === category.toLowerCase()
      );
      setFilteredPets(filtered);
    }
  };

  return (
    <div>
      <NavbarSearch />

      <div className="filter-buttons">
        <button onClick={() => handleFilter("all")}>All</button>
        <button onClick={() => handleFilter("dog")}>Dogs</button>
        <button onClick={() => handleFilter("cat")}>Cats</button>
        <button onClick={() => handleFilter("bird")}>Birds</button>
      </div>

      <div className="product-grid">
        {filteredPets.length > 0 ? (
          filteredPets.map((item) => (
            <ProductCard key={item._id} item={item} type="pet" />
          ))
        ) : (
          <p style={{ textAlign: "center", padding: "1rem" }}>No pets found in this category.</p>
        )}
      </div>
    </div>
  );
}
