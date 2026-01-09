import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Market from "./pages/Market";
import GemDetails from "./pages/GemDetails";
import SellGem from "./pages/SellGem";
import SellerDetails from "./pages/SellerDetails";
import News from "./pages/News";
import Instruments from "./pages/Instruments";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market />} />
        <Route path="/market/:id" element={<GemDetails />} />
        <Route path="/sell-gem" element={<SellGem />} />
        <Route path="/seller/:sellerId" element={<SellerDetails />} />
        <Route path="/news" element={<News />} />
        <Route path="/instruments" element={<Instruments />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </>
  );
}
