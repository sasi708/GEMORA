import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Instruments() {
      const [price, setPrice] = useState(0);
      const navigate = useNavigate();

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
          defaultChecked
          className="accent-yellow-500"
        />
        Cutting Machine
      </label>

      <label className="flex items-center gap-3 rounded-lg border px-3 py-2 cursor-pointer">
        <input type="radio" name="type" className="accent-yellow-500" />
        Torch
      </label>

      <label className="flex items-center gap-3 rounded-lg border px-3 py-2 cursor-pointer">
        <input type="radio" name="type" className="accent-yellow-500" />
        Loupes
      </label>

      <label className="flex items-center gap-3 rounded-lg border px-3 py-2 cursor-pointer">
        <input type="radio" name="type" className="accent-yellow-500" />
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
  onChange={(e) => setPrice(e.target.value)}
  className="w-full accent-yellow-500"
/>

<div className="mt-2 flex justify-between text-xs text-gray-500">
  <span>Rs. {Number(price).toLocaleString()}</span>
  <span>Rs. 300,000.00</span>
</div>
</div>
  {/* Select Country */}
  <div>
    <p className="mb-3 text-sm font-medium text-gray-700">
      Select Country
    </p>

    <div className="space-y-3 text-sm">
      <label className="flex items-center gap-3 rounded-lg border px-3 py-2 cursor-pointer">
        <input
          type="radio"
          name="country"
          defaultChecked
          className="accent-yellow-500"
        />
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

            {/* CARD 1 */}
            <div className="rounded-xl border p-4 text-center">
              <img
                src="/instrument/Gem cutting Machine.jpeg"
                alt="Gem Cutting Machine"
                className="mx-auto h-40 object-contain"
              />
              <h3 className="mt-4 text-sm font-medium">
                Gem Cutting Machine
              </h3>
              <p className="text-sm text-gray-600">Rs. 50,000.00</p>
              <button
                onClick={() => navigate("/instrument/1")}
                 className="mt-3 rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-white">
                      Buy Now
              </button>
            </div>

            {/* CARD 2 */}
            <div className="rounded-xl border p-4 text-center">
              <img
                src="/instrument/Gem cutting Machine 02.jpeg"
                alt="Gem Cutting Machine"
                className="mx-auto h-40 object-contain"
              />
              <h3 className="mt-4 text-sm font-medium">
                Gem Cutting Machine
              </h3>
              <p className="text-sm text-gray-600">Rs. 50,000.00</p>
              <button className="mt-3 rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-white">
                Buy Now
              </button>
            </div>

            {/* CARD 3 */}
            <div className="rounded-xl border p-4 text-center">
              <img
                src="/instrument/Torch.jpeg"
                alt="Torch"
                className="mx-auto h-40 object-contain"
              />
              <h3 className="mt-4 text-sm font-medium">Torch</h3>
              <p className="text-sm text-gray-600">Rs. 7,500.00</p>
              <button className="mt-3 rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-white">
                Buy Now
              </button>
            </div>

            {/* CARD 4 */}
            <div className="rounded-xl border p-4 text-center">
              <img
                src="/instrument/Torch 02.jpeg"
                alt="Torch"
                className="mx-auto h-40 object-contain"
              />
              <h3 className="mt-4 text-sm font-medium">Torch</h3>
              <p className="text-sm text-gray-600">Rs. 9,500.00</p>
              <button className="mt-3 rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-white">
                Buy Now
              </button>
            </div>

            {/* CARD 5 */}
            <div className="rounded-xl border p-4 text-center">
              <img
                src="/instrument/Scale.jpeg"
                alt="Scale"
                className="mx-auto h-40 object-contain"
              />
              <h3 className="mt-4 text-sm font-medium">Scale</h3>
              <p className="text-sm text-gray-600">Rs. 6,500.00</p>
              <button className="mt-3 rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-white">
                Buy Now
              </button>
            </div>

            {/* CARD 6 */}
            <div className="rounded-xl border p-4 text-center">
              <img
                src="/instrument/Scale 02.jpeg"
                alt="Scale"
                className="mx-auto h-40 object-contain"
              />
              <h3 className="mt-4 text-sm font-medium">Scale</h3>
              <p className="text-sm text-gray-600">Rs. 18,500.00</p>
              <button className="mt-3 rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-white">
                Buy Now
              </button>
            </div>

          </div>

          {/* PAGINATION */}
          <div className="mt-8 flex items-center justify-center gap-4 text-sm">
            <button>◀</button>
            <span className="rounded-full bg-yellow-500 px-3 py-1 text-white">
              1
            </span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <button>▶</button>
          </div>

        </section>
      </div>
    </div>
  );
}
