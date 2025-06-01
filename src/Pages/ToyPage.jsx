import React from "react";
import ToyCard from "../components/ToyCard";
import toys from "../toysData";
import "../Styles/ToyPage.css";
import NavbarSearch from "../components/NavbarSearch";

export default function ToyPage() {
  return (
    <div>
      <NavbarSearch />
      <div className="toy-page">
        <h1>Pet Toys</h1>
        <div className="toy-grid">
          {toys.map((toy) => (
            <ToyCard key={toy.id} toy={toy} />
          ))}
        </div>
      </div>
    </div>
  );
}
