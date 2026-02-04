import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const DUMMY_SELLER = {
  name: "Gemora Certified Partner",
  email: "support@gemora.com",
  location: "Colombo, Sri Lanka",
  contact: "+94 11 234 5678",
  profilePic: "https://via.placeholder.com/150",
};

export default function Market() {
  const [gems, setGems] = useState([]);
  const [filteredGems, setFilteredGems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Filters
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Sapphire",
    "Emerald",
    "Alexandrite",
    "Topaz",
    "Spinel",
  ];

  // Fetch gems
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

  // Apply filters
  useEffect(() => {
    const results = gems.filter((gem) => {
      const matchesSearch = gem.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        gem.name.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });

    setFilteredGems(results);
  }, [search, selectedCategory, gems]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Gem Marketplace
          </h1>
          <p className="text-sm text-slate-500">
            Discover and list authentic gemstones.
          </p>
        </div>

        <button
          onClick={() => navigate("/sell-gem")}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-full font-bold text-sm shadow-sm transition"
        >
          + Sell Your Gem
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* FILTER SIDEBAR */}
        <aside className="w-full md:w-64 space-y-8">
          {/* Search */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
              Search
            </h3>
            <input
              type="text"
              placeholder="Search gems..."
              className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-yellow-500 outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
              Categories
            </h3>
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
                {filteredGems.map((gem) => {
                  const seller = gem.seller || DUMMY_SELLER;
                  const sellerId = seller?._id || seller?.id || "demo-seller";

                  return (
                  <div
                    key={gem._id}
                    className="bg-white border rounded-2xl p-4 hover:shadow-xl transition"
                  >
                    {/* IMAGE */}
                    <div className="overflow-hidden rounded-xl mb-4 aspect-square">
                      <img
                        src={
                          gem.images && gem.images.length > 0
                            ? gem.images[0]
                            : "https://via.placeholder.com/400"
                        }
                        alt={gem.name}
                        className="h-full w-full object-cover hover:scale-110 transition duration-500"
                      />
                    </div>

                    {/* SELLER INFO */}
                    <div className="mt-3 mb-2">
                      <p className="text-xs font-bold text-slate-800">
                        Seller: {seller?.name || "Verified Seller"}
                      </p>
                    </div>

                    {/* INFO */}
                    <h2 className="font-bold text-slate-800">
                      {gem.name}
                    </h2>

                    <p className="text-xs text-slate-400 mt-1">
                      {gem.carat} ct · {gem.origin}
                    </p>

                    {/* CONTACT NOW */}
                    <button
                      onClick={() => {
                        navigate(`/seller/${sellerId}`);
                      }}
                      className="mt-4 w-full rounded-full bg-yellow-500 py-2 text-xs font-bold hover:bg-yellow-600 transition"
                    >
                      Contact Now
                    </button>

                  </div>
                );
                })}
              </div>

              {filteredGems.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-slate-400">
                    No gems match your filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setSelectedCategory("All");
                    }}
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
