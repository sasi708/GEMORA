import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api";

export default function ConfirmOrder() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Initialize all address states
  const [street, setStreet] = useState("");
  const [lane, setLane] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [district, setDistrict] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [productData, setProductData] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const data = state || JSON.parse(sessionStorage.getItem("orderData"));
    if (data) {
      setProductData(data.product);
      setQty(data.qty || 1);
      setStreet(data.address?.street || "");
      setLane(data.address?.lane || "");
      setCity(data.address?.city || "");
      setPostalCode(data.address?.postalCode || "");
      setDistrict(data.address?.district || "");
      setCountry(data.address?.country || "");
      setPhone(data.mobile || "");
    }
  }, [state]);

  if (!productData) return <div className="p-10 text-center">No order data found</div>;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        orderItems: [{
          name: productData.name,
          qty: qty,
          quantity: qty,
          image: productData.imageUrl,
          price: productData.price,
          product: productData._id,
          productId: productData._id,
          // 🔴 UPDATE THIS LINE 🔴
          // Change "instrument" to "Instrument" (Capital 'I')
          productType: "Instrument" 
        }],
        shippingAddress: {
          street,
          lane,
          city,
          postalCode,
          district,
          country,
          mobile: phone,
          address: `${street}, ${lane}, ${city}`
        },
        totalPrice: productData.price * qty,
        paymentMethod: "COD"
      };

      console.log("Payload being sent:", payload); // Debug to see exact values
      await API.post("/orders", payload);
      
      setSuccess("🎉 Order Placed Successfully!");
      setTimeout(() => navigate("/instruments"), 2000);
    } catch (err) {
      // Log the specific error from the backend to see allowed values
      console.error("Validation Error Details:", err.response?.data);
      setError(err.response?.data?.message || "Validation failed. Please check the console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl py-12 px-4">
      <div className="rounded-xl border border-yellow-400 p-8">
        <h2 className="mb-8 text-center text-xl font-semibold text-yellow-600">Confirm Your Order</h2>
        
        {error && <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded text-sm">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded text-sm">{success}</div>}

        <Row label="Model"><input readOnly value={productData.name} className="w-full rounded border px-3 py-2 text-sm bg-gray-100" /></Row>
        <Row label="Total Price"><input readOnly value={`Rs. ${(productData.price * qty).toLocaleString()}`} className="w-full rounded border px-3 py-2 text-sm bg-gray-100 font-bold" /></Row>
        
        <div className="space-y-4 my-6 pt-4 border-t">
          <p className="text-xs font-bold text-gray-500 uppercase">Verify Shipping Info</p>
          <Row label="Street"><input value={street} onChange={e => setStreet(e.target.value)} className="w-full rounded border px-3 py-2 text-sm" /></Row>
          <Row label="City"><input value={city} onChange={e => setCity(e.target.value)} className="w-full rounded border px-3 py-2 text-sm" placeholder="Required" /></Row>
          <Row label="Postal Code"><input value={postalCode} onChange={e => setPostalCode(e.target.value)} className="w-full rounded border px-3 py-2 text-sm" placeholder="Required" /></Row>
          <Row label="Mobile"><input value={phone} onChange={e => setPhone(e.target.value)} className="w-full rounded border px-3 py-2 text-sm" /></Row>
        </div>

        <div className="mt-8 flex justify-center gap-6">
          <Link to="/instruments" className="text-sm underline">Cancel</Link>
          <button onClick={handleConfirm} disabled={loading} className="rounded bg-yellow-500 px-8 py-2 text-sm font-semibold text-white">
            {loading ? "Processing..." : "Confirm Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="mb-4 grid grid-cols-[140px_1fr] items-center gap-3">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </div>
  );
}