import { Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatWidget from "./components/ChatWidget";


// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import News from "./pages/News";
import ConfirmOrder from "./pages/ConfirmOrder";


// Market Pages
import Market from "./pages/Market";
import GemDetails from "./pages/GemDetails";
import AddGem from "./pages/AddGem";
import SellerDetails from "./pages/SellerDetails";
import SellerFallback from "./pages/SellerFallback";

// 🔴 UPDATED: Tools Pages (formerly Instruments)
import Instruments from "./pages/Instruments"; 
import InstrumentDetails from "./pages/InstrumentDetails";

// Admin
import AdminDashboard from "./pages/AdminDashboard";
import AdminNews from "./pages/AdminNews";
import AdminInstruments from "./pages/AdminInstruments";
import AdminGems from "./pages/AdminGems";
import AdminSettings from "./pages/AdminSettings";
import AdminCertificates from "./pages/AdminCertificates";
import AdminOrders from "./pages/AdminOrders";
import Profile from "./pages/Profile";



export default function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Protected Routes */}
        
        {/* Market Section */}
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
  path="/seller/:sellerId"
  element={<SellerDetails />}
/>

        <Route
          path="/sell-gem"
          element={
            <ProtectedRoute>
              <AddGem />
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
          path="/seller/default"
          element={
            <ProtectedRoute>
              <SellerFallback />
            </ProtectedRoute>
          }
        />

        {/* News Section */}
        <Route
          path="/news"
          element={
            <ProtectedRoute>
              <News />
            </ProtectedRoute>
          }
        />

        {/* 🔴 UPDATED: Tools Section */}
        <Route
          path="/instruments"
          element={
            <ProtectedRoute>
              <Instruments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instruments/:id"
          element={
            <ProtectedRoute>
              <InstrumentDetails />
            </ProtectedRoute>
          }
        />

        {/* Orders & Contact */}
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
        <Route
  path="/instruments/:id"
  element={<InstrumentDetails />}
/>


        {/* 🔴 Admin Dashboard */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/news" 
          element={
            <ProtectedRoute role="admin">
              <AdminNews />
            </ProtectedRoute>
          } 
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute role="admin">
              <AdminOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/gems"
          element={
            <ProtectedRoute role="admin">
              <AdminGems />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/instruments"
          element={
            <ProtectedRoute role="admin">
              <AdminInstruments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute role="admin">
              <AdminSettings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/certificates"
          element={
            <ProtectedRoute role="admin">
              <AdminCertificates />
            </ProtectedRoute>
          }
        />

        <Route path="/profile" element={<Profile />} />




        {/* Fallback Route */}
        <Route path="*" element={<Home />} />
      </Routes>

      <ChatWidget />
      <Footer />
    </>
  );
}