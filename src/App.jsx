import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>

      
    </>
  );
}

export default App;
