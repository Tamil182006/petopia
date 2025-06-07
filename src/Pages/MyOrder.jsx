import "../Styles/MyOrder.css";
import { useEffect, useState } from "react";

export default function MyOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("http://localhost:5000/api/orders");
        if (!res.ok) throw new Error("Failed to fetch orders: " + res.status);
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!orders || orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="my-order-container">
      <h2 className="my-order-title">My Orders</h2>
      {orders.map(order => (
        <div key={order._id} className="order-card">
          <h3>Order ID: {order._id}</h3>
          <p><strong>Name:</strong> {order.name}</p>
          <p><strong>Phone:</strong> {order.phone}</p>
          <p><strong>Address:</strong> {order.address}, {order.pincode}</p>
          <p><strong>Total:</strong> ₹{order.total.toFixed(2)}</p>
          <p><strong>Ordered on:</strong> {new Date(order.createdAt).toLocaleString()}</p>

          <div className="order-items">
            <h4>Items:</h4>
            <ul>
              {order.items.map(item => (
                <li key={item.id}>
                  {item.name} - ₹{item.price} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
