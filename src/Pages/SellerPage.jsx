import { useState } from "react";
import "../Styles/sellerDashboard.css";

export default function SellerDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);
  const [petId, setPetId] = useState(null);
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

  const [details, setDetails] = useState({
    weight: "",
    vaccinated: false,
    trained: "",
    temperament: "",
    diet: "",
    careInstructions: "",
    inclusions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitStep1 = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/seller/listpet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(petData),
      });

      const data = await res.json();
      console.log("🔍 Step 1 Response:", data);

      if (res.ok && data.petId) {
        alert("Step 1 completed!");
        setPetId(data.petId);
        setProductCount((prev) => prev + 1);
        setStep(2);
      } else {
        alert("Failed to list pet in Step 1. Try again.");
      }
    } catch (err) {
      console.error("Network error Step 1:", err);
      alert("Server error. Try again later.");
    }
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    if (!petId) {
      alert("Step 1 didn't complete. Cannot update.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/seller/updatepet/${petId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...details,
          diet: details.diet.split(",").map((d) => d.trim()),
          careInstructions: details.careInstructions.split(",").map((d) => d.trim()),
          inclusions: details.inclusions.split(",").map((d) => d.trim()),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Step 2 completed!");
        setStep(1);
        setShowForm(false);
        setPetId(null);
        setPetData({
          name: "", breed: "", age: "", price: "", description: "", imageUrl: "", category: "dog"
        });
        setDetails({
          weight: "", vaccinated: false, trained: "", temperament: "", diet: "", careInstructions: "", inclusions: ""
        });
      } else {
        alert(data.message || "Update failed.");
      }
    } catch (err) {
      console.error("Network error Step 2:", err);
      alert("Server error. Try again later.");
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
            {step === 1 ? (
              <>
                <h2>Step 1: Basic Pet Info</h2>
                <form onSubmit={handleSubmitStep1} className="listing-form">
                  <input name="name" value={petData.name} onChange={handleChange} placeholder="Pet Name" required />
                  <input name="breed" value={petData.breed} onChange={handleChange} placeholder="Breed" required />
                  <input name="age" type="number" value={petData.age} onChange={handleChange} placeholder="Age" required />
                  <input name="price" type="number" value={petData.price} onChange={handleChange} placeholder="Price ₹" required />
                  <input name="imageUrl" value={petData.imageUrl} onChange={handleChange} placeholder="Image URL" required />
                  <textarea name="description" value={petData.description} onChange={handleChange} placeholder="Short Description" required />
                  <select name="category" value={petData.category} onChange={handleChange}>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="modal-buttons">
                    <button type="submit">Next ➝</button>
                    <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                  </div>
                </form>
              </>
            ) : petId ? (
              <>
                <h2>Step 2: Detailed Info</h2>
                <form onSubmit={handleSubmitStep2} className="listing-form">
                  <input name="weight" value={details.weight} onChange={handleDetailChange} placeholder="Weight (kg)" />
                  <label>
                    <input type="checkbox" name="vaccinated" checked={details.vaccinated} onChange={handleDetailChange} />
                    Vaccinated
                  </label>
                  <input name="trained" value={details.trained} onChange={handleDetailChange} placeholder="Trained Info" />
                  <input name="temperament" value={details.temperament} onChange={handleDetailChange} placeholder="Temperament" />
                  <input name="diet" value={details.diet} onChange={handleDetailChange} placeholder="Diet (comma separated)" />
                  <input name="careInstructions" value={details.careInstructions} onChange={handleDetailChange} placeholder="Care Instructions (comma separated)" />
                  <input name="inclusions" value={details.inclusions} onChange={handleDetailChange} placeholder="Inclusions (comma separated)" />
                  <div className="modal-buttons">
                    <button type="submit">Finish ✅</button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <p>⚠️ Step 1 failed or incomplete. Please try again.</p>
                <button onClick={() => setStep(1)}>Back to Step 1</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
