import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Market() {
  const [gems, setGems] = useState([]);
  const [filteredGems, setFilteredGems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Filter States
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Sapphire", "Ruby", "Emerald", "Alexandrite", "Topaz", "Spinel"];

  useEffect(() => {
    const fetchGems = async () => {
      try {
        const res = await API.get("/gems");
        setGems(res.data);
        setFilteredGems(res.data);
      } catch (err) {
        console.error("Error fetching gems:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGems();
  }, []);

  // 🔹 Advanced Filter Logic
  useEffect(() => {
    const results = gems.filter((gem) => {
      const matchesSearch = gem.name.toLowerCase().includes(search.toLowerCase());
      const matchesPrice = gem.price <= maxPrice;
      // Checks if 'All' is selected, or if the gem name contains the category keyword
      const matchesCategory = 
        selectedCategory === "All" || 
        gem.name.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesPrice && matchesCategory;
    });
    setFilteredGems(results);
  }, [search, maxPrice, selectedCategory, gems]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gem Marketplace</h1>
          <p className="text-sm text-slate-500">Discover and list authentic gemstones.</p>
        </div>
        <button 
          onClick={() => navigate("/sell-gem")}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-full font-bold text-sm shadow-sm transition"
        >
          + Sell Your Gem
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* SIDEBAR FILTERS */}
        <aside className="w-full md:w-64 space-y-8">
          {/* Search */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Search</h3>
            <input 
              type="text" 
              placeholder="Search gems..." 
              className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-yellow-500 outline-none transition"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                    selectedCategory === cat 
                      ? "bg-yellow-500 text-black" 
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
              Max Price: Rs. {Number(maxPrice).toLocaleString()}
            </h3>
            <input 
              type="range" 
              min="1000" 
              max="1000000" 
              step="5000"
              value={maxPrice}
              className="w-full accent-yellow-500"
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </aside>

        {/* GEM GRID */}
        <main className="flex-1">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGems.map((gem) => (
                  <div 
                    key={gem._id} 
                    onClick={() => navigate(`/gems/${gem._id}`)}
                    className="group bg-white border rounded-2xl p-4 hover:shadow-xl transition cursor-pointer"
                  >
                    <div className="overflow-hidden rounded-xl mb-4 aspect-square">
                      <img 
                        src={gem.images && gem.images.length > 0 ? gem.images[0] : 'https://via.placeholder.com/400'}
                        alt={gem.name} 
                        className="h-full w-full object-cover group-hover:scale-110 transition duration-500" 
                      />
                    </div>
                    <h2 className="font-bold text-slate-800 group-hover:text-yellow-600 transition">{gem.name}</h2>
                    <p className="text-xs text-slate-400 mt-1">{gem.carat} ct · {gem.origin}</p>
                    <p className="text-orange-600 font-bold mt-3 text-lg">Rs. {gem.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>

              {filteredGems.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-slate-400">No gems match your current filters.</p>
                  <button 
                    onClick={() => {setSearch(""); setMaxPrice(1000000); setSelectedCategory("All");}}
                    className="mt-4 text-sm font-bold text-yellow-600 hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}