// SellerSignup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/SellerSignup.css";

export default function SellerSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");

 const [formData, setFormData] = useState({
  email: "",
  mobile: "",
  otp: "",
  category: "All",
  gstin: "",
  password: "",
  confirmPassword: "",
  fullName: "",
  displayName: "",
  description: "",

  pickupName: "",
  pickupPhone: "",
  pickupPincode: "",
  pickupStateCity: "",
  pickupAddress: "",
});


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = () => {
    if (!formData.mobile || formData.mobile.length < 10) {
      alert("Enter a valid mobile number");
      return;
    }

    const dummyOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(dummyOtp);
    setOtpSent(true);
    alert(`OTP sent: ${dummyOtp}`);
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.email || !formData.mobile) {
        alert("Email and Mobile Number are required");
        return;
      }
      if (!otpSent) {
        alert("Please send OTP first");
        return;
      }
      if (formData.otp !== generatedOtp) {
        alert("Incorrect OTP");
        return;
      }
    }

    if (step === 2 && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setStep(step + 1);
  };

  const handleSubmit = async () => {
    if (!formData.gstin) {
      alert("GSTIN is required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/seller/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Seller registration successful");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during seller registration:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="seller-signup-form p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Seller Registration - Step {step}
      </h2>

      {step === 1 && (
        <div className="flex flex-col gap-4">
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email ID"
            className="form-input"
          />

          <div className="flex gap-2">
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="form-input flex-grow"
            />
            <button type="button" className="btn" onClick={handleSendOtp}>
              Send OTP
            </button>
          </div>

          <input
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            className="form-input"
            disabled={!otpSent}
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-select"
          >
            <option value="All">All Categories</option>
            <option value="Books">Only Books</option>
          </select>

          <input
            name="gstin"
            value={formData.gstin}
            onChange={handleChange}
            placeholder="GSTIN (optional now)"
            className="form-input"
          />
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4">
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="form-input"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="form-input"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="form-input"
          />
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col gap-4">
          <input
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            placeholder="Display Name"
            className="form-input"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Store Description"
            className="form-textarea"
          />

          {/* Split Pickup Address Fields */}
          <input
            name="pickupName"
            value={formData.pickupName}
            onChange={handleChange}
            placeholder="Full Name (Pickup Contact)"
            className="form-input"
          />
          <input
            name="pickupPhone"
            value={formData.pickupPhone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="form-input"
          />
          <input
            name="pickupPincode"
            value={formData.pickupPincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="form-input"
          />
          <input
            name="pickupStateCity"
            value={formData.pickupStateCity}
            onChange={handleChange}
            placeholder="State & City"
            className="form-input"
          />
          <input
            name="pickupAddress"
            value={formData.pickupAddress}
            onChange={handleChange}
            placeholder="Full Address"
            className="form-input"
          />

          {!formData.gstin && (
            <input
              name="gstin"
              value={formData.gstin}
              onChange={handleChange}
              placeholder="GSTIN (required now)"
              className="form-input"
            />
          )}
        </div>
      )}

      <div className="mt-4 flex justify-between">
        {step > 1 && (
          <button onClick={() => setStep(step - 1)} className="btn">
            Back
          </button>
        )}
        {step < 3 && (
          <button onClick={handleNext} className="btn">
            Next
          </button>
        )}
        {step === 3 && (
          <button onClick={handleSubmit} className="btn btn-primary">
            Register & Continue
          </button>
        )}
      </div>
    </div>
  );
}
