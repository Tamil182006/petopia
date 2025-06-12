import { useState } from "react";
import "../Styles/sellerDashboard.css";

export default function SellerDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  const [petData, setPetData] = useState({
    name: "",
    breed: "",
    age: "",
    price: "",
    description: "",
    imageUrl: "",
    category: "dog",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/seller/listpet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(petData),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      setProductCount((prev) => prev + 1);
      setShowForm(false);
      setPetData({
        name: "",
        breed: "",
        age: "",
        price: "",
        description: "",
        imageUrl: "",
        category: "dog",
      });
    } else {
      alert(data.message || "Something went wrong");
    }
  } catch (err) {
    console.error("Error submitting pet:", err);
    alert("Error submitting pet. Try again.");
  }
};


  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="box">
          <h4>Products Listed</h4>
          <p>{productCount}</p>
        </div>
        <div className="box">
          <h4>Orders Placed</h4>
          <p>{orderCount}</p>
        </div>
      </div>

      <div className="main-content">
        <h2>Welcome Seller 👋</h2>
        <button className="list-button" onClick={() => setShowForm(true)}>
          List Product +
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>List New Pet</h2>
            <form onSubmit={handleSubmit} className="listing-form">
              <input
                name="name"
                value={petData.name}
                onChange={handleChange}
                placeholder="Pet Name"
                required
              />
              <input
                name="breed"
                value={petData.breed}
                onChange={handleChange}
                placeholder="Breed"
                required
              />
              <input
                name="age"
                type="number"
                value={petData.age}
                onChange={handleChange}
                placeholder="Age (in years)"
                required
              />
              <input
                name="price"
                type="number"
                value={petData.price}
                onChange={handleChange}
                placeholder="Price (₹)"
                required
              />
              <input
                name="imageUrl"
                value={petData.imageUrl}
                onChange={handleChange}
                placeholder="Image URL"
                required
              />
              <textarea
                name="description"
                value={petData.description}
                onChange={handleChange}
                placeholder="Description"
                required
              />
              <select
                name="category"
                value={petData.category}
                onChange={handleChange}
              >
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="bird">Bird</option>
                <option value="other">Other</option>
              </select>

              <div className="modal-buttons">
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
