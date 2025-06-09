import ProductCard from "../components/ProductCard";
import {medicines} from "../productsData";
import NavbarSearch from "../components/NavbarSearch";
import "../Styles/Medicine.css";

export default function Medicine() {
  return (
    <div>
      <NavbarSearch />
      <div className="medicine-page">
        <h1 className="medicine-title">Medicinal Products</h1>
        <div className="medicine-grid">
          {medicines.map((med) => (
            <ProductCard key={med.id} item={med} type="medicine" />
          ))}
        </div>
      </div>
    </div>
  );
}
