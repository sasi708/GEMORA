import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ name, image, premium }) {
  return (
    <div className="relative rounded-xl bg-white p-4 shadow hover:shadow-lg transition">
      {premium && (
        <span className="absolute left-3 top-3 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
          Premium
        </span>
      )}

      <img
        src={image}
        alt={name}
        className="h-40 w-full rounded-lg object-cover"
      />

      <h3 className="mt-4 text-center font-semibold">{name}</h3>

      <button className="mx-auto mt-4 block rounded-full bg-yellow-500 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-400">
        Contact Now
      </button>
    </div>
  );
}

