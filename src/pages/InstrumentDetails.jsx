import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function InstrumentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [moreFromStore, setMoreFromStore] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 ADD QUANTITY STATE
  const [qty, setQty] = useState(1);

  // 🔹 ADD MISSING ADDRESS STATES
  const [street, setStreet] = useState("");
  const [lane, setLane] = useState("");
  const [city, setCity] = useState(""); // 👈 New
  const [postalCode, setPostalCode] = useState(""); // 👈 New
  const [district, setDistrict] = useState("");
  const [country, setCountry] = useState("Sri Lanka");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/tools");
        const found = res.data.find((item) => item._id === id);
        setProduct(found);
        setMoreFromStore(res.data.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Error loading details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading Product...</div>;
  if (!product) return <div className="p-10 text-center">Product not found</div>;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 flex justify-end">
        <Link to="/instruments" className="rounded-full bg-red-500 px-5 py-2 text-xs text-white">Back To Shop</Link>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[340px_1fr]">
        <div className="space-y-4">
          <div className="rounded-xl border p-3 bg-white">
            <img src={product.imageUrl} alt={product.name} className="w-full object-contain h-64" />
          </div>

          <div>
            <p className="text-sm font-semibold">{product.name}</p>
            <p className="text-sm text-gray-600">Rs. {product.price.toLocaleString()}</p>
          </div>

          {/* 🔹 QUANTITY SELECTOR */}
          <div className="flex items-center gap-4 py-2 border-y">
            <p className="text-xs font-medium">Quantity:</p>
            <div className="flex items-center border rounded">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-2 py-1 bg-gray-100">-</button>
              <span className="px-4 text-sm">{qty}</span>
              <button onClick={() => setQty(Math.min(product.countInStock || 10, qty + 1))} className="px-2 py-1 bg-gray-100">+</button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium">Shipping Address</p>
            <input placeholder="Street" value={street} onChange={(e) => setStreet(e.target.value)} className="w-full rounded border px-3 py-2 text-xs" />
            <input placeholder="Lane" value={lane} onChange={(e) => setLane(e.target.value)} className="w-full rounded border px-3 py-2 text-xs" />
            <div className="grid grid-cols-2 gap-2">
               <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="w-full rounded border px-3 py-2 text-xs" />
               <input placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full rounded border px-3 py-2 text-xs" />
            </div>
            <input placeholder="District" value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full rounded border px-3 py-2 text-xs" />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium">Mobile Number</p>
            <input placeholder="Phone" value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full rounded border px-3 py-2 text-xs" />
          </div>

          <button
            onClick={() => {
              const orderData = {
                product,
                qty, // 👈 Send quantity
                address: { street, lane, city, postalCode, district, country }, // 👈 Send full address
                mobile,
              };
              sessionStorage.setItem("orderData", JSON.stringify(orderData));
              navigate("/confirm-order");
            }}
            className="w-full rounded-full bg-yellow-500 py-2 text-xs font-semibold text-white"
          >
            Order Now
          </button>
        </div>

        {/* Right side info remains the same... */}
      </div>
    </div>
  );
}