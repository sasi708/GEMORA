export default function ProductCard({ name, image, weight, premium }) {
  return (
    <div className="group relative rounded-xl border bg-white p-3 shadow-sm transition hover:shadow-md">
      
      {/* PREMIUM BADGE */}
      {premium && (
        <span className="absolute left-2 top-2 z-10 rounded-full bg-yellow-500 px-2 py-0.5 text-[10px] font-bold text-black">
          Premium
        </span>
      )}

      {/* IMAGE */}
      <div className="flex h-32 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "/gems/emerald-diamond.jpg";
          }}
        />
      </div>

      {/* NAME */}
      <h3 className="mt-2 text-center text-sm font-semibold text-gray-900">
        {name}
      </h3>

      {/* WEIGHT */}
      {weight && (
        <p className="mt-1 text-center text-xs text-gray-500">
          {weight} ct
        </p>
      )}

      {/* BUTTON */}
      <button className="mx-auto mt-3 block rounded-full bg-yellow-500 px-4 py-1.5 text-xs font-semibold text-black hover:bg-yellow-400">
        Contact Now
      </button>
    </div>
  );
}
