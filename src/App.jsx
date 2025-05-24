import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import Landingpage from './Pages/Landingpage';
import Mainpage from "./Pages/Mainpage";  

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mainpage" element={<Mainpage />} /> 
      </Routes>
    </Router>
  );
}
