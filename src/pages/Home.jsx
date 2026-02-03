import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";        // 👈 Keeping your Hero
import ProductGrid from "../components/ProductGrid"; // 👈 Keeping your Grid
import API from "../api"; 

export default function Home() {
  const [featuredGems, setFeaturedGems] = useState([]);
  const [premiumGems, setPremiumGems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/tools"); // Fetching from DB
        
        // Transform DB data to match what ProductGrid expects
        // (DB uses '_id' and 'imageUrl', your UI uses 'id' and 'image')
        const formattedData = res.data.map(item => ({
          id: item._id,
          name: item.name,
          image: item.imageUrl, // 👈 Mapping DB image to UI prop
          price: item.price,    // Passing price
          category: item.category,
          // If your grid expects 'weight', we can mock it or use price
          weight: item.price + " USD" 
        }));

        // Split data for the two sections (just as an example)
        setFeaturedGems(formattedData.slice(0, 4)); // First 4
        setPremiumGems(formattedData.slice(4, 8));  // Next 4 (or empty if not enough)
        
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* 1. KEEPING YOUR HERO */}
      <Hero />

      {/* 2. FEATURED SECTION (Dynamic Data) */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="mb-8 text-center text-2xl font-bold">
          Featured Gems
        </h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <ProductGrid gems={featuredGems} />
        )}
      </section>

      {/* 3. PREMIUM SECTION (Dynamic Data) */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="mb-8 text-center text-2xl font-bold">
          Premium Listings
        </h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <ProductGrid gems={premiumGems} />
        )}
      </section>
    </>
  );
}