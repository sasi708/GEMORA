import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api"; // 👈 Added API import

export default function ConfirmOrder() {
  const { state } = useLocation();
  const navigate = useNavigate(); // 👈 Added navigate

  // 🔹 Initialize ALL hooks BEFORE any conditional logic
  const [street, setStreet] = useState("");
  const [lane, setLane] = useState("");
  const [district, setDistrict] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Try to get data from location state OR sessionStorage
  let orderData = state;
  if (!orderData) {
    const stored = sessionStorage.getItem("orderData");
    if (stored) {
      try {
        orderData = JSON.parse(stored);
        console.log("📍 Retrieved order from sessionStorage:", orderData);
      } catch (e) {
        console.error("Failed to parse sessionStorage", e);
      }
    }
  }

  if (!orderData) {
    return (
      <div className="p-10 text-center">
        <p className="mb-4">❌ No order data found</p>
        <button onClick={() => navigate("/instruments")} className="text-blue-600 underline">
          Go back to Instruments
        </button>
      </div>
    );
  }

  const { product, address, mobile } = orderData;

  // Update states from orderData if available
  if (street === "" && address) {
    setStreet(address.street);
    setLane(address.lane);
    setDistrict(address.district);
    setCountry(address.country);
    setPhone(mobile);
  }

  // 🔴 REAL ORDER HANDLER
  const handleConfirm = async () => {
    setError("");
    setSuccess("");

    // Validation
    if (!street.trim() || !lane.trim() || !district.trim() || !country.trim()) {
      setError("All address fields are required");
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setError("Valid phone number is required (min 10 digits)");
      return;
    }

    try {
      setLoading(true);
      console.log("📤 Placing order...", { product: product._id, quantity: 1 });

      const orderData = {
        orderItems: [
          {
            name: product.name,
            qty: 1,
            image: product.imageUrl,
            price: product.price,
            product: product._id, // MongoDB _id
          },
        ],
        shippingAddress: {
          street,
          lane,
          district,
          country,
          mobile: phone,
        },
        totalPrice: product.price,
        paymentMethod: "COD", // Cash On Delivery
      };

      const res = await API.post("/orders", orderData);
      console.log("✅ Order placed:", res.data);
      
      setSuccess("🎉 Order Placed Successfully! Redirecting...");
      setTimeout(() => {
        navigate("/instruments");
      }, 2000);
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || "Failed to place order";
      console.error("❌ Order error:", error.response?.status, error.response?.data);
      setError(`Failed to place order: ${errMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl py-12 px-4">
      <div className="rounded-xl border border-yellow-400 p-8">
        <h2 className="mb-8 text-center text-xl font-semibold text-yellow-600">
          Confirm Your Order
        </h2>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className="mb-6 rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* MODEL */}
        <Row label="Model">
          <input readOnly value={product.name} className="w-full rounded-md border px-3 py-2 text-sm bg-gray-100" />
        </Row>

        {/* PRICE */}
        <Row label="Price">
          <input readOnly value={`Rs. ${product.price.toLocaleString()}`} className="w-full rounded-md border px-3 py-2 text-sm bg-gray-100" />
        </Row>

        {/* ADDRESS (EDITABLE) */}
        <Row label="Street">
          <input value={street} onChange={(e) => setStreet(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Enter street" />
        </Row>
        <Row label="Lane">
          <input value={lane} onChange={(e) => setLane(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Enter lane" />
        </Row>
        <Row label="District">
          <input value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Enter district" />
        </Row>
        <Row label="Country">
          <input value={country} onChange={(e) => setCountry(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Enter country" />
        </Row>

        {/* MOBILE */}
        <Row label="Mobile Number">
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Enter mobile" />
        </Row>

        {/* PAYMENT */}
        <Row label="Payment">
          <input readOnly value="Cash On Delivery" className="w-full rounded-md border px-3 py-2 text-sm bg-gray-100" />
        </Row>

        {/* ACTIONS */}
        <div className="mt-8 flex justify-center gap-6">
          <Link to="/instruments" className="text-sm underline hover:text-gray-700">
            Cancel
          </Link>

          <button
            onClick={handleConfirm} // 👈 Using the real handler
            disabled={loading || success !== ""}
            className={`rounded-md px-8 py-2 text-sm font-semibold text-white transition ${
              loading || success !== "" ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            {loading ? "Processing..." : "Confirm Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🔹 Reusable row layout (Kept identical) */
function Row({ label, children }) {
  return (
    <div className="mb-4 grid grid-cols-[140px_1fr] items-center gap-3">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </div>
  );
}