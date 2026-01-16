import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Market from "./pages/Market";
import GemDetails from "./pages/GemDetails";
import SellGem from "./pages/SellGem";
import SellerDetails from "./pages/SellerDetails";
import News from "./pages/News";
import Instruments from "./pages/Instruments";
import InstrumentDetails from "./pages/InstrumentDetails";
import ConfirmOrder from "./pages/ConfirmOrder";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* ✅ Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Protected */}
        <Route
          path="/market"
          element={
            <ProtectedRoute>
              <Market />
            </ProtectedRoute>
          }
        />
        <Route
          path="/market/:id"
          element={
            <ProtectedRoute>
              <GemDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sell-gem"
          element={
            <ProtectedRoute>
              <SellGem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/:sellerId"
          element={
            <ProtectedRoute>
              <SellerDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/news"
          element={
            <ProtectedRoute>
              <News />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instruments"
          element={
            <ProtectedRoute>
              <Instruments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instrument/:id"
          element={
            <ProtectedRoute>
              <InstrumentDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/confirm-order"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

        {/* optional */}
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </>
  );
}
