import { Link } from "react-router-dom";

export default function ProductCard({ id, name, image, weight }) {
  return (
    <div className="rounded-xl border bg-white p-4 text-center shadow-sm hover:shadow-md transition">
      
      {/* IMAGE ONLY – NO EXTRA FRAME */}
      <img
        src={image}
        alt={name}
        className="mx-auto h-40 w-full object-contain"
      />

      <h3 className="mt-3 text-sm font-semibold">{name}</h3>
      <p className="text-xs text-gray-500">{weight} ct</p>

      <Link
        to={`/market/${id}`}
        className="mt-3 inline-block rounded-full bg-yellow-500 px-4 py-2 text-xs font-semibold hover:bg-yellow-400"
      >
        Contact Now
      </Link>
    </div>
  );
}
