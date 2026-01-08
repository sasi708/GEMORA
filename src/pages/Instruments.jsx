import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Instruments() {
  const navigate = useNavigate();

  // STATES
  const [price, setPrice] = useState(300000);
  const [selectedType, setSelectedType] = useState("All");

  // PRODUCTS DATA
  const products = [
    {
      id: 1,
      name: "Gem Cutting Machine",
      price: 50000,
      type: "Cutting Machine",
      image: "/instrument/Gem cutting Machine.jpeg",
    },
    {
      id: 2,
      name: "Gem Cutting Machine",
      price: 50000,
      type: "Cutting Machine",
      image: "/instrument/Gem cutting Machine 02.jpeg",
    },
    {
      id: 3,
      name: "Torch",
      price: 7500,
      type: "Torch",
      image: "/instrument/Torch.jpeg",
    },
    {
      id: 4,
      name: "Torch",
      price: 9500,
      type: "Torch",
      image: "/instrument/Torch 02.jpeg",
    },
    {
      id: 5,
      name: "Scale",
      price: 6500,
      type: "Scales",
      image: "/instrument/Scale.jpeg",
    },
    {
      id: 6,
      name: "Scale",
      price: 18500,
      type: "Scales",
      image: "/instrument/Scale 02.jpeg",
    },
  ];

  // FILTER LOGIC
  const filteredProducts = products.filter((item) => {
    const matchPrice = item.price <= price;
    const matchType =
      selectedType === "All" || item.type === selectedType;

    return matchPrice && matchType;
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">

      {/* PAGE TITLE */}
      <h1 className="mb-6 text-xl font-semibold">
        Find What You Want to...
      </h1>

      <div className="flex gap-8">

        {/* ================= LEFT FILTERS ================= */}
        <aside className="w-64 border-r pr-6">

          <h2 className="mb-6 text-lg font-semibold">
            Filters
          </h2>

          {/* Select Type */}
          <div className="mb-8">
            <p className="mb-3 text-sm font-medium text-gray-700">
              Select Type
            </p>

            <div className="space-y-3 text-sm">

              <label className="flex items-center gap-3 rounded-lg border px-3 py-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  checked={selectedType === "Cutting Machine"}
                  onChange={() => setSelectedType("Cutting Machine")}
                  className="accent-yellow-500"
                />
                Cutting Machine
              </label>

              <label className="flex items-center gap-3 rounded-lg border px-3 py-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  checked={selectedType === "Torch"}
                  onChange={() => setSelectedType("Torch")}
                  className="accent-yellow-500"
                />
                Torch
              </label>

              <label className="flex items-center gap-3 rounded-lg border px-3 py-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  checked={selectedType === "Loupes"}
                  onChange={() => setSelectedType("Loupes")}
                  className="accent-yellow-500"
                />
                Loupes
              </label>

              <label className="flex items-center gap-3 rounded-lg border px-3 py-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  checked={selectedType === "Scales"}
                  onChange={() => setSelectedType("Scales")}
                  className="accent-yellow-500"
                />
                Scales
              </label>

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
              <span>Rs. 0</span>
              <span>Rs. {price.toLocaleString()}</span>
            </div>
          </div>

          {/* Select Country (UI only – logic later) */}
          <div>
            <p className="mb-3 text-sm font-medium text-gray-700">
              Select Country
            </p>

            <div className="space-y-3 text-sm">
              <label className="flex items-center gap-3 rounded-lg border px-3 py-2 cursor-pointer">
                <input type="radio" name="country" defaultChecked className="accent-yellow-500" />
                Sri Lanka
              </label>

              <label className="flex items-center gap-3 rounded-lg border px-3 py-2 cursor-pointer">
                <input type="radio" name="country" className="accent-yellow-500" />
                North America
              </label>
            </div>
          </div>

        </aside>

        {/* ================= RIGHT PRODUCTS ================= */}
        <section className="flex-1">

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {filteredProducts.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border p-4 text-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="mx-auto h-40 object-contain"
                />
                <h3 className="mt-4 text-sm font-medium">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Rs. {item.price.toLocaleString()}
                </p>
                <button
                  onClick={() => navigate(`/instrument/${item.id}`)}
                  className="mt-3 cursor-pointer rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-white"
              >
                   Buy Now
              </button>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <p className="col-span-full text-center text-sm text-gray-500">
                No items found for this filter
              </p>
            )}

          </div>

        </section>
      </div>
    </div>
  );
}
