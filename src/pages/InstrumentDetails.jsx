import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../api"; // 👈 Connect to Backend

export default function InstrumentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔹 DATA STATES
  const [product, setProduct] = useState(null);
  const [moreFromStore, setMoreFromStore] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 FORM STATES (Kept exactly as you had them)
  const [street, setStreet] = useState("");
  const [lane, setLane] = useState("");
  const [district, setDistrict] = useState("");
  const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");

  // 1. FETCH REAL DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/tools"); // Fetch all tools
        const allTools = res.data;

        // Find current product by MongoDB ID (String)
        const found = allTools.find((item) => item._id === id);
        setProduct(found);

        // Filter "More from store" (Exclude current one)
        const others = allTools.filter((item) => item._id !== id);
        setMoreFromStore(others);
      } catch (error) {
        console.error("Error loading details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="p-10 text-center text-gray-500">Loading Product...</div>;
  if (!product) return <div className="p-10 text-center text-gray-500">Product not found</div>;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      {/* BACK BUTTON */}
      <div className="mb-6 flex justify-end">
        <Link
          to="/shop" // Updated to point to your Shop page
          className="rounded-full bg-red-500 px-5 py-2 text-xs font-semibold text-white hover:bg-red-600 transition"
        >
          Back To Shop
        </Link>
      </div>

      {/* TOP DETAILS */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[340px_1fr]">

        {/* ================= LEFT SIDE (Image + Form) ================= */}
        <div className="space-y-4">

          {/* IMAGE */}
          <div className="rounded-xl border p-3 bg-white">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full object-contain h-64"
              />
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-300 bg-gray-50">No Image</div>
            )}
          </div>

          {/* NAME & PRICE */}
          <div>
            <p className="text-sm font-semibold">{product.name}</p>
            <p className="text-sm text-gray-600">
              Rs. {product.price.toLocaleString()}
            </p>
            <p className={`text-xs mt-1 font-bold ${product.countInStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
               {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>

          {/* ADDRESS FORM */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-700">
              Enter your Address
            </p>
            <input placeholder="Street" value={street} onChange={(e) => setStreet(e.target.value)} className="w-full rounded-md border px-3 py-2 text-xs" />
            <input placeholder="Lane" value={lane} onChange={(e) => setLane(e.target.value)} className="w-full rounded-md border px-3 py-2 text-xs" />
            <input placeholder="District" value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full rounded-md border px-3 py-2 text-xs" />
            <input placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full rounded-md border px-3 py-2 text-xs" />
          </div>

          {/* MOBILE */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-700">
              Enter your Mobile Number
            </p>
            <input placeholder="Phone Number" value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full rounded-md border px-3 py-2 text-xs" />
          </div>

          {/* WARNING */}
          <p className="text-xs text-red-500">
            Dear customer, COD only available
          </p>

          {/* ORDER BUTTON */}
          <button
            onClick={() => {
              const orderData = {
                product,
                address: { street, lane, district, country },
                mobile,
              };
              console.log("📦 Order clicked - storing data:", orderData);
              // Store in sessionStorage to preserve across navigation
              sessionStorage.setItem("orderData", JSON.stringify(orderData));
              navigate("/confirm-order");
            }}
            className="w-full cursor-pointer rounded-full bg-yellow-500 py-2 text-xs font-semibold text-white transition hover:bg-yellow-600 active:scale-95"
          >
            Order Now
          </button>
        </div>

        {/* ================= RIGHT SIDE (Info + More Products) ================= */}
        <div className="border-l border-gray-200 pl-10">

          <h2 className="mb-2 text-sm font-semibold">
            {product.name}
          </h2>

          <p className="mb-4 text-xs text-gray-600 leading-relaxed whitespace-pre-line">
            {product.description || "No description available for this instrument."}
          </p>

          <h3 className="mb-2 text-xs font-semibold">
            Product Details
          </h3>

          <ul className="list-disc space-y-1 pl-4 text-xs text-gray-600 mb-8">
            <li>Brand: {product.brand || "Generic"}</li>
            <li>Category: {product.category}</li>
            <li>Stock: {product.countInStock} units</li>
          </ul>

          {/* MORE FROM STORE (Real Data) */}
          <div className="mt-14 border-t pt-8">
            <h3 className="mb-6 text-lg font-semibold">
              More From Store
            </h3>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {moreFromStore.slice(0, 4).map((item) => (
                <div
                  key={item._id}
                  className="rounded-xl border p-4 text-center hover:shadow-md transition bg-white"
                >
                  <div className="h-24 flex items-center justify-center overflow-hidden">
                     {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="max-h-full object-contain" />
                     ) : <span className="text-xs text-gray-300">No Image</span>}
                  </div>
                  
                  <p className="mt-2 text-xs font-medium truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    Rs. {item.price.toLocaleString()}
                  </p>
                  
                  <button
                    onClick={() => navigate(`/instruments/${item._id}`)}
                    className="mt-2 text-xs text-blue-600 hover:underline"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}