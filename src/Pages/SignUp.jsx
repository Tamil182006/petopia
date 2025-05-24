import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Styles/SignUp.css";

export default function SignUp() {
  const navigate = useNavigate();

  // ✅ Create states for form fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword || !agreed) {
      alert("Please fill all fields and agree to terms.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // ✅ Redirect to home
    navigate("/mainpage");
  };

  return (
    <div>
      <div className="main-container1">
        <div className="registration-form">
          <div className="form-header">
            <h2>Create Your Account</h2>
            <p>Sign up to get started!</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                id="terms"
                required
              />
              <label className="form-check-label" htmlFor="terms">
                I agree to the{" "}
                <a href="#" className="text-primary">terms and conditions</a>
              </label>
            </div>

            <button type="submit" className="btn btn-custom w-100">
              Register
            </button>
          </form>

          <div className="text-muted">
            Already have an account?{" "}
            <a href="#" className="text-primary">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
}