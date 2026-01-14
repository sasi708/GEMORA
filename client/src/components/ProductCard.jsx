import React from "react";

export default function ProductCard({ name, image, premium }) {
  return (
    <div className="group relative rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-lg">
      
      {/* PREMIUM BADGE */}
      {premium && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
          Premium
        </span>
      )}

      {/* IMAGE WRAPPER (IMPORTANT FIX) */}
      <div className="flex h-48 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
        <img
          src={image}
          alt={name}
          className="
            h-full
            w-full
            object-contain
            transition
            duration-300
            group-hover:scale-105
          "
          onError={(e) => {
            e.target.src = "/gems/emerald-diamond.jpg";
          }}
        />
      </div>

      {/* TITLE */}
      <h3 className="mt-4 text-center text-sm font-semibold text-gray-900">
        {name}
      </h3>

      {/* CTA */}
      <button className="mx-auto mt-4 block rounded-full bg-yellow-500 px-5 py-2 text-sm font-semibold text-black transition hover:bg-yellow-400">
        Contact Now
      </button>
    </div>
  );
}
