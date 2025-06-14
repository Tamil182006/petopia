import { useNavigate } from "react-router-dom";
import "../Styles/sellerNavbar.css";

export default function SellerNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("seller"); // or your auth token key
    navigate("/sellerlogin");
  };

  return (
    <nav className="seller-navbar">
      <h2 className="logo" onClick={() => navigate("/sellerdashboard")}>Petopia Seller</h2>
      <div className="nav-links">
        <button onClick={() => navigate("/sellerdashboard")}>Dashboard</button>
        <button onClick={() => navigate("/listsellerproduct")}>List Product</button>
        <button onClick={() => navigate("/myproducts")}>My Products</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
