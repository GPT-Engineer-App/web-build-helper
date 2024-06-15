import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import CreateMemorial from "./pages/CreateMemorial.jsx";
import Memorial from "./pages/Memorial.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/create-memorial" element={<CreateMemorial />} />
        <Route exact path="/memorial/:id" element={<Memorial />} />
      </Routes>
    </Router>
  );
}

export default App;