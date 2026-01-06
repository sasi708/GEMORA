import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


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

      </Routes>

      {/* Footer only for allowed pages */}
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
