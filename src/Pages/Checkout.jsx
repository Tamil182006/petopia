import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../Styles/Checkout.css";

export default function Checkout() {
  const location = useLocation();
  const pet = location.state;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <div className="maincontainer2">
        <div className="delivery">
          <form action="delivery">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="number">Phone number:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label htmlFor="pincode">Pincode</label>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />

            <label htmlFor="state">State & City</label>
            <input type="text" />
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </form>
        </div>
        <div className="imagearea">
          <img src={pet.image} alt={pet.name} />
        </div>
        <div className="petdetails">
          <h4>{pet.name}</h4>
          <ul>
            <li>Age:{pet.age}</li>
            <li>Weight: {pet.weight}</li>
            <li>Vaccinated: {pet.vaccinated}</li>
            <li>Breed type: {pet.breedType}</li>
          </ul>
        </div>
        <div className="orderdetails">
          <ul>
            <li>
              Quantity:{quantity}{" "}
              <span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </span>{" "}
            </li>
            <li>Price: {pet.price.toLocaleString()}</li>
            <li>
              Delivery details:
              <ul>
                <li>Name:{name}</li>
                <li>Phne : {phone}</li>
                <li>Address: {address}</li>
                <li>Pincode:{pincode}</li>
              </ul>
            </li>
          </ul>
          <button
            onClick={() => alert(`Order placed for ${quantity} x ${pet.name}`)}
          >
            Confirm order
          </button>
        </div>
      </div>
    </div>
  );
}
