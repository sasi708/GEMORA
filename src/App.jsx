
import { Routes, Route } from "react-router-dom";

import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Instruments from "./pages/Instruments";
import InstrumentDetails from "./pages/InstrumentDetails";

import ConfirmOrder from "./pages/ConfirmOrder";

import Header from "./components/Header";
import Footer from "./components/Footer";
import News from "./pages/News";  

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Market from "./pages/Market";
import GemDetails from "./pages/GemDetails";
import SellerDetails from "./pages/SellerDetails"; 
import SellGem from "./pages/SellGem";


export default function App() {
  return (
    <>
      <Header />

      <Routes>

        {/* HOME */}
        <Route path="/News" element={<News />} />


        <Route path="/" element={<Home />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* MARKET */}
        <Route path="/market" element={<Market />} />
        <Route path="/market/:id" element={<GemDetails />} />

        {/* SELLER DETAILS */}
        <Route path="/seller/:sellerId" element={<SellerDetails />} />

        {/* SELL GEM DETAILS */}
        <Route path="/sell" element={<SellGem />} />


        <Route path="/signup" element={<Register />} />
        <Route path="/instruments" element={<Instruments />} />
        <Route path="/instrument/:id" element={<InstrumentDetails />} />
        <Route path="/confirm-order" element={<ConfirmOrder />} />
        <Route
          path="/instrument/:id" element={
          <div className="min-h-screen bg-white">
           <InstrumentDetails />
          </div>
          

        }
/>

      </Routes>

      <Footer />
    </>
  );
}
