import { Link } from "react-router-dom";

export default function ProductCard({ id, name, image, weight, price }) {
  return (
    <div className="flex flex-col rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition">
      <img
        src={image}
        alt={name}
        className="mx-auto h-40 w-full object-contain"
      />

      <h3 className="mt-3 text-sm font-semibold text-center">{name}</h3>
      <p className="text-xs text-gray-500 text-center">{weight} ct</p>

      <p className="mt-1 text-sm font-bold text-orange-600 text-center">
        Rs. {price}
      </p>

      {/* 🔥 FORCE BUTTON VISIBILITY */}
      <Link
        to={`/instruments/${id}`}
        className="mt-4 block w-full rounded-full bg-yellow-500 py-2 text-center text-xs font-semibold text-black hover:bg-yellow-400"
      >
        Contact Now
      </Link>
    </div>
  );
}
