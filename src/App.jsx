import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import Login from "./Pages/Login";
import Landingpage from './Pages/Landingpage';
import Mainpage from "./Pages/Mainpage";  
import Petdetail from "./components/Petdetai";
import Cartpage from './Pages/Cartpage';
import Checkout from "./Pages/Checkout";

import { CartProvider } from './components/cartContext';  // <-- import CartProvider

export default function App() {
  return (
    <CartProvider>        {/* <-- Wrap with CartProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mainpage" element={<Mainpage />} /> 
          <Route path="/pet/:id" element={<Petdetail />} />
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/checkout" element={< Checkout/>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
