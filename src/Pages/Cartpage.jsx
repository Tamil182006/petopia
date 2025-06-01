import { useContext } from "react";
import { CartContext } from "../components/cartContext";
import "../Styles/cartPage.css";
import Checkout from "./Checkout";

export default function Cartpage() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return (
      <div className="cart-container">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <ul className="cart-items">
        {cartItems.map(item => (
          <li key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price}</p>
              <div className="quantity-section">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <h2>Total: ₹{totalPrice}</h2>
        <button className="checkout-btn" onClick={() => navigate("/checkout", { state: pet })}>Checkout</button>
      </div>
    </div>
  );
}
