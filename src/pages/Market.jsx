import { useState } from "react";
import ProductCard from "../components/ProductCard";

const gems = [
  {
    name: "Ceylon Sapphire",
    image: "/gems/ceylon-sapphire.jpg",
    weight: 5.2,
    type: "Sapphire",
    country: "Sri Lanka",
  },
  {
    name: "Burmese Ruby",
    image: "/gems/burmese-ruby.jpg",
    weight: 10.21,
    type: "Ruby",
    country: "Worldwide",
  },
  {
    name: "Colombian Emerald",
    image: "/gems/colombian-emerald.jpg",
    weight: 8.6,
    type: "Emerald",
    country: "North America",
  },
  {
    name: "Tanzanite",
    image: "/gems/tanzanite.jpg",
    weight: 3.9,
    type: "Tanzanite",
    country: "Worldwide",
  },
  {
    name: "Alexandrite",
    image: "/gems/aquamarine.jpg",
    weight: 12.4,
    type: "Emerald",
    country: "Sri Lanka",
  },
  {
    name: "Spinel",
    image: "/gems/padparadscha.jpg",
    weight: 6.1,
    type: "Ruby",
    country: "North America",
  },
];

export default function Market() {
  const [maxWeight, setMaxWeight] = useState(100);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");

  // ✅ FINAL FILTER LOGIC (TYPE + WEIGHT + COUNTRY)
  const filteredGems = gems
    .filter((gem) =>
      selectedType === "All" ? true : gem.type === selectedType
    )
    .filter((gem) => gem.weight <= maxWeight)
    .filter((gem) =>
      selectedCountry === "All" ? true : gem.country === selectedCountry
    );

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gem Marketplace</h1>

        <button className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-500">
          Sell Your Gem
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* FILTER SIDEBAR */}
        <aside className="col-span-12 md:col-span-3 space-y-6 rounded-xl border bg-white p-5">
          <h3 className="text-lg font-semibold">Filters</h3>

          {/* TYPE */}
          <div>
            <p className="mb-2 text-sm font-medium">Select type</p>
            {["All", "Sapphire", "Ruby", "Emerald", "Tanzanite"].map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="type"
                  value={item}
                  checked={selectedType === item}
                  onChange={(e) => setSelectedType(e.target.value)}
                />
                {item}
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
              step="0.1"
              value={maxWeight}
              onChange={(e) => setMaxWeight(Number(e.target.value))}
              className="w-full accent-yellow-500"
            />

            <div className="flex justify-between text-xs text-gray-500">
              <span>0.1ct</span>
              <span>100ct</span>
            </div>
          </div>

          {/* COUNTRY */}
          <div>
            <p className="mb-2 text-sm font-medium">Select country</p>
            {["All", "Worldwide", "North America", "Sri Lanka"].map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="country"
                  value={item}
                  checked={selectedCountry === item}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                />
                {item}
              </label>
            ))}
          </div>
        </aside>

        {/* PRODUCTS GRID */}
        <div className="col-span-12 md:col-span-9">
          {filteredGems.length === 0 ? (
            <p className="text-sm text-gray-500">
              No gems match your filters.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredGems.map((gem) => (
                <ProductCard
                  key={gem.name}
                  name={gem.name}
                  image={gem.image}
                  weight={gem.weight}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
