import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../components/cartContext";
import "../Styles/Checkout.css";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const pet = location.state;
  const { cartItems, setCartItems } = useContext(CartContext);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const displayItems = pet ? [{ ...pet, quantity: 1 }] : cartItems;
  const totalAmount = displayItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  async function handleConfirmOrder() {
    if (!name || !phone || !pincode || !address) {
      alert("Please fill all delivery details");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          pincode,
          address,
          items: displayItems.map(({ id, name, price, quantity, image, type }) => ({
            id,
            name,
            price,
            quantity,
            image,
            type,
          })),
          total: totalAmount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const data = await response.json();
      alert("Order placed successfully!");

      // Clear cart if order was for multiple items (cart)
      if (!pet) setCartItems([]);

      // Navigate to "My Orders" or home
      navigate("/myorders");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

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
          <img
            key={item.id}
            src={item.image}
            alt={item.name}
            style={{ width: "100px", margin: "10px" }}
          />
        ))}
      </div>

      <div className="petdetails">
        {displayItems.map((item) => (
          <div key={item.id}>
            <h4>{item.name}</h4>
            {item.age && (
              <ul>
                <li>Age: {item.age}</li>
                <li>Weight: {item.weight}</li>
                <li>Vaccinated: {item.vaccinated}</li>
                <li>Breed Type: {item.breedType}</li>
              </ul>
            )}
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

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button onClick={handleConfirmOrder} disabled={loading}>
          {loading ? "Placing Order..." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
}
