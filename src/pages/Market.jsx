import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import API from "../api";

export default function Market() {
  const [gems, setGems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxWeight, setMaxWeight] = useState(100);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");

  useEffect(() => {
    const fetchGems = async () => {
      try {
        const res = await API.get("/gems");
        setGems(res.data);
      } catch (err) {
        console.error("Error fetching gems:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGems();
  }, []);

  const filteredGems = gems.filter((gem) => {
    return (
      gem.carat <= maxWeight &&
      (selectedType === "All" || gem.clarity === selectedType) &&
      (selectedCountry === "All" || gem.origin === selectedCountry)
    );
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gem Marketplace</h1>
        <Link
          to="/sell-gem"
          className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-500"
        >
          Sell Your Gem
        </Link>
      </div>

      {loading ? (
        <p className="text-center py-10">Loading gems...</p>
      ) : (
        <div className="grid grid-cols-12 gap-8">
        {/* FILTERS */}
        <aside className="col-span-12 md:col-span-3 rounded-xl border p-5 space-y-6">
          <h3 className="text-lg font-semibold">Filters</h3>

          {/* TYPE */}
          <div>
            <p className="mb-2 text-sm font-medium">Select type</p>
            {["All", "Sapphire", "Ruby", "Emerald", "Tanzanite"].map((t) => (
              <label key={t} className="flex gap-2 text-sm">
                <input
                  type="radio"
                  checked={selectedType === t}
                  onChange={() => setSelectedType(t)}
                />
                {t}
              </label>
            ))}
          </div>

          {/* WEIGHT */}
          <div>
            <p className="mb-2 text-sm font-medium">
              Weight (up to {maxWeight} ct)
            </p>
            <input
              type="range"
              min="0"
              max="100"
              value={maxWeight}
              onChange={(e) => setMaxWeight(Number(e.target.value))}
              className="w-full accent-yellow-500"
            />
          </div>

          {/* COUNTRY */}
          <div>
            <p className="mb-2 text-sm font-medium">Select country</p>
            {["All", "Sri Lanka", "Myanmar", "Colombia", "Tanzania", "Worldwide"].map(
              (c) => (
                <label key={c} className="flex gap-2 text-sm">
                  <input
                    type="radio"
                    checked={selectedCountry === c}
                    onChange={() => setSelectedCountry(c)}
                  />
                  {c}
                </label>
              )
            )}
          </div>
        </aside>

        {/* PRODUCTS */}
        <div className="col-span-12 md:col-span-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGems.length === 0 ? (
            <p className="col-span-full text-center py-10 text-gray-500">No gems found</p>
          ) : (
            filteredGems.map((gem) => (
              <ProductCard key={gem._id} {...gem} />
            ))
          )}
        </div>
      </div>
      )}
    </section>
  );
}
