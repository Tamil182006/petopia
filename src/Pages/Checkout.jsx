import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { CartContext } from "../components/cartContext";
import "../Styles/Checkout.css";

export default function Checkout() {
  const location = useLocation();
  const pet = location.state;
  const { cartItems } = useContext(CartContext);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");

  const displayItems = pet ? [{ ...pet, quantity: 1 }] : cartItems;
  const totalAmount = displayItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="maincontainer2">
      <div className="delivery">
        <form>
          <label>Full Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

          <label>Phone number:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />

          <label>Pincode</label>
          <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} />

          <label>State & City</label>
          <input type="text" />

          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </form>
      </div>

      <div className="imagearea">
        {displayItems.map((item) => (
          <img key={item.id} src={item.image} alt={item.name} style={{ width: "100px", margin: "10px" }} />
        ))}
      </div>

      <div className="petdetails">
        {displayItems.map((item) => (
          <div key={item.id}>
            <h4>{item.name}</h4>
            {item.age && <ul>
              <li>Age: {item.age}</li>
              <li>Weight: {item.weight}</li>
              <li>Vaccinated: {item.vaccinated}</li>
              <li>Breed Type: {item.breedType}</li>
            </ul>}
          </div>
        ))}
      </div>

      <div className="orderdetails">
        <ul>
          {displayItems.map((item) => (
            <li key={item.id}>
              {item.name} - ₹{item.price} × {item.quantity}
            </li>
          ))}
          <li>
            <strong>Total: ₹{totalAmount}</strong>
          </li>
          <li>
            Delivery Details:
            <ul>
              <li>Name: {name}</li>
              <li>Phone: {phone}</li>
              <li>Address: {address}</li>
              <li>Pincode: {pincode}</li>
            </ul>
          </li>
        </ul>
        <button
          onClick={() =>
            alert(`Order placed for ₹${totalAmount.toLocaleString()} for ${displayItems.length} item(s)`)
          }
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}
