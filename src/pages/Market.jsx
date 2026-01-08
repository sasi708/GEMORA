import ProductCard from "../components/ProductCard";

const gems = [
  { name: "Ceylon Sapphire", image: "/gems/ceylon-sapphire.jpg" },
  { name: "Burmese Ruby", image: "/gems/burmese-ruby.jpg" },
  { name: "Colombian Emerald", image: "/gems/colombian-emerald.jpg" },
  { name: "Tanzanite", image: "/gems/tanzanite.jpg" },
  { name: "Alexandrite", image: "/gems/aquamarine.jpg" },
  { name: "Spinel", image: "/gems/padparadscha.jpg" },
];

export default function Market() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      {/* PAGE HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gem Marketplace</h1>

        <button className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-500">
          Sell Your Gem
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* FILTER SIDEBAR */}
        <aside className="col-span-12 md:col-span-3 space-y-6 rounded-xl border bg-white p-5">
          <h3 className="font-semibold text-lg">Filters</h3>

          {/* TYPE */}
          <div>
            <p className="mb-2 text-sm font-medium">Select type</p>
            {["Sapphire", "Ruby", "Emerald", "Tanzanite"].map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm">
                <input type="radio" name="type" />
                {item}
              </label>
            ))}
          </div>

          {/* WEIGHT */}
          <div>
            <p className="mb-2 text-sm font-medium">Weight</p>
            <input type="range" className="w-full accent-yellow-500" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0.1ct</span>
              <span>1000ct</span>
            </div>
          </div>

          {/* COUNTRY */}
          <div>
            <p className="mb-2 text-sm font-medium">Select country</p>
            {["Worldwide", "North America", "Sri Lanka"].map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm">
                <input type="radio" name="country" />
                {item}
              </label>
            ))}
          </div>
        </aside>

        {/* PRODUCTS GRID */}
        <div className="col-span-12 md:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gems.map((gem) => (
              <ProductCard
                key={gem.name}
                name={gem.name}
                image={gem.image}
              />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="mt-10 flex justify-center gap-2 text-sm">
            <button className="rounded-full px-3 py-1 hover:bg-gray-100">
              ‹
            </button>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                className="rounded-full px-3 py-1 hover:bg-gray-100"
              >
                {n}
              </button>
            ))}
            <button className="rounded-full px-3 py-1 hover:bg-gray-100">
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

