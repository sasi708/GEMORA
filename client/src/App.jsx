import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Instruments from "./pages/Instruments";
import InstrumentDetails from "./pages/InstrumentDetails";
import ConfirmOrder from "./pages/ConfirmOrder";
import Contact from "./pages/Contact";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  // pages where footer should be hidden
  const hideFooterRoutes = ["/login", "/signup"];

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/instruments" element={<Instruments />} />
        <Route path="/instrument/:id" element={<InstrumentDetails />} />
        <Route path="/confirm-order" element={<ConfirmOrder />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* Footer only for allowed pages */}
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
