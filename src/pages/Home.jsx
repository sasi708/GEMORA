import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import API from "../api";

export default function Home() {
  const [gems, setGems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/gems");
        setGems(res.data.slice(0, 8)); // Show latest 8 gems
      } catch (error) {
        console.error("Failed to load gems", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Hero />

      {/* Featured Gems Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-tighter">
                New Arrivals
              </h2>
              <p className="text-slate-500 mt-2">
                The latest additions to our exclusive collection.
              </p>
            </div>
            <button
              onClick={() => navigate("/market")}
              className="text-sm font-bold text-yellow-600 hover:underline"
            >
              View All Gems →
            </button>
          </div>

          {loading ? (
            <p className="text-center text-gray-500 py-10">Loading gems...</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {gems.map((gem) => (
                <div
                  key={gem._id}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/gems/${gem._id}`)}
                >
                  <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-gray-100 shadow-sm border border-gray-100">
                    <img
                      src={gem.images && gem.images.length > 0 ? gem.images[0] : 'https://via.placeholder.com/400'}
                      alt={gem.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-[10px] font-bold uppercase shadow-sm">
                      {gem.origin}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-bold text-slate-800">{gem.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {gem.carat} Carats · {gem.clarity}
                    </p>
                    <p className="mt-2 text-sm font-bold text-orange-600">
                      Rs. {gem.price?.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}