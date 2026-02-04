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
      <section className="py-24 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-6">
          {/* SECTION HEADER */}
          <div className="mb-16 text-center">
            <p className="text-yellow-600 text-sm font-semibold tracking-widest uppercase mb-2">✨ Our Collection</p>
            <h2 className="text-5xl font-bold text-slate-900 mb-4">
              New Arrivals
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Discover the latest additions to our exclusive collection of authenticated precious gemstones sourced from around the world.
            </p>
            <button
              onClick={() => navigate("/market")}
              className="mt-8 inline-block text-sm font-bold text-white bg-yellow-500 hover:bg-yellow-600 px-8 py-3 rounded-full transition duration-300 shadow-lg hover:shadow-xl"
            >
              View Complete Marketplace →
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-500/20 border-t-yellow-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {gems.map((gem) => (
                <div
                  key={gem._id}
                  className="group cursor-pointer transform transition duration-500 hover:-translate-y-2"
                  onClick={() => navigate(`/gems/${gem._id}`)}
                >
                  {/* CARD CONTAINER */}
                  <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-gray-100 shadow-xl group-hover:shadow-2xl transition duration-300">
                    {/* GRADIENT BACKGROUND */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/5 z-5"></div>
                    
                    {/* IMAGE */}
                    <img
                      src={gem.images && gem.images.length > 0 ? gem.images[0] : 'https://via.placeholder.com/400'}
                      alt={gem.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-115"
                    />
                    
                    {/* LUXURY BADGE */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg backdrop-blur-sm">
                      {gem.origin}
                    </div>
                    
                    {/* OVERLAY ON HOVER */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300"></div>
                  </div>

                  {/* INFO SECTION */}
                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-yellow-600 transition duration-300">{gem.name}</h3>
                    <p className="text-sm text-slate-500 mt-2 space-x-2">
                      <span>💎 {gem.carat} Carats</span>
                      <span>•</span>
                      <span>{gem.clarity}</span>
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xl font-bold text-yellow-600">
                        {gem.price?.toLocaleString()}
                      </p>
                      <span className="text-yellow-500 text-lg group-hover:translate-x-1 transition duration-300">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">
            <div className="space-y-3">
              <div className="text-4xl">🔒</div>
              <h4 className="font-bold text-lg">Certified Authentic</h4>
              <p className="text-slate-400 text-sm">All gemstones are independently verified and certified for authenticity.</p>
            </div>
            <div className="space-y-3">
              <div className="text-4xl">🌍</div>
              <h4 className="font-bold text-lg">Global Sourcing</h4>
              <p className="text-slate-400 text-sm">Ethically sourced gems from the finest locations worldwide.</p>
            </div>
            <div className="space-y-3">
              <div className="text-4xl">💼</div>
              <h4 className="font-bold text-lg">Expert Support</h4>
              <p className="text-slate-400 text-sm">24/7 dedicated support from our team of certified gemologists.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}