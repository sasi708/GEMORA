import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; // 👈 Import API connection

export default function Instruments() {
  const navigate = useNavigate();

  // STATES
  const [products, setProducts] = useState([]); // 👈 Store real data here
  const [loading, setLoading] = useState(true);
  
  const [price, setPrice] = useState(300000);
  const [selectedType, setSelectedType] = useState("All");

  // 1. FETCH REAL DATA FROM BACKEND
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await API.get("/tools");
        
        // Transform DB data to match your existing UI structure
        const formattedTools = res.data
          .filter(item => item.status === "Approved") // Only show Approved
          .map(item => ({
            id: item._id,          // DB uses '_id'
            name: item.name,
            price: item.price,
            type: item.category,   // DB uses 'category', your UI uses 'type'
            images: item.images || []  // DB uses 'images' array
          }));

        setProducts(formattedTools);
      } catch (error) {
        console.error("Failed to load instruments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  // 2. GET UNIQUE CATEGORIES DYNAMICALLY
  // This ensures filters match exactly what is in your database
  const categories = useMemo(() => {
    const uniqueTypes = new Set(products.map(p => p.type));
    return ["All", ...uniqueTypes];
  }, [products]);

  // FILTER LOGIC
  const filteredProducts = products.filter((item) => {
    const matchPrice = item.price <= price;
    const matchType = selectedType === "All" || item.type === selectedType;
    return matchPrice && matchType;
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">

      {/* PAGE TITLE */}
      <h1 className="mb-6 text-xl font-semibold">
        Find What You Want to...
      </h1>

      <div className="flex flex-col md:flex-row gap-8">

        {/* ================= LEFT FILTERS ================= */}
        <aside className="w-full md:w-64 border-r pr-6">

          <h2 className="mb-6 text-lg font-semibold">
            Filters
          </h2>

          {/* Select Type (Dynamic) */}
          <div className="mb-8">
            <p className="mb-3 text-sm font-medium text-gray-700">
              Select Type
            </p>

            <div className="space-y-3 text-sm">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-3 rounded-lg border px-3 py-2 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="type"
                    checked={selectedType === cat}
                    onChange={() => setSelectedType(cat)}
                    className="accent-yellow-500"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <p className="mb-3 text-sm font-medium text-gray-700">
              Price Range
            </p>

            <input
              type="range"
              min="0"
              max="300000"
              step="1000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-yellow-500"
            />

            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>$0</span>
              <span>${price.toLocaleString()}</span>
            </div>
          </div>

        </aside>

        {/* ================= RIGHT PRODUCTS ================= */}
        <section className="flex-1">

          {loading ? (
             <p className="text-center text-gray-500 mt-10">Loading Instruments...</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border p-4 text-center hover:shadow-lg transition bg-white"
                >
                  <div className="h-40 w-full flex items-center justify-center overflow-hidden mb-4">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="text-gray-300 text-xs">No Image</div>
                    )}
                  </div>
                  
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-1">{item.type}</p>
                  
                  <p className="text-sm font-bold text-gray-900">
                    ${item.price.toLocaleString()}
                  </p>
                  
                  <button
                    onClick={() => navigate(`/instruments/${item.id}`)} // Goes to Detail Page
                    className="mt-3 w-full cursor-pointer rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-600 transition"
                  >
                    Buy Now
                  </button>
                </div>
              ))}

              {filteredProducts.length === 0 && (
                <div className="col-span-full py-10 text-center text-gray-500 bg-gray-50 rounded-lg border border-dashed">
                  <p>No instruments found matching these filters.</p>
                </div>
              )}

            </div>
          )}

        </section>
      </div>
    </div>
  );
}