import { useParams, Link } from "react-router-dom";
import gems from "../data/gems";

export default function GemDetails() {
  const { id } = useParams();
  const gem = gems.find((g) => g.id === id);

  if (!gem) {
    return <p className="p-10">Gem not found</p>;
  }

  const { seller } = gem;

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      {/* BACK */}
      <Link
        to="/market"
        className="mb-6 inline-block rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-500"
      >
        Back To Market
      </Link>

      <div className="grid grid-cols-12 gap-10">
        {/* IMAGE */}
        <div className="col-span-12 md:col-span-5">
          <img
            src={gem.image}
            alt={gem.name}
            className="w-full max-w-md rounded-xl object-contain"
          />
        </div>

        {/* DETAILS */}
        <div className="col-span-12 md:col-span-7 space-y-6">
          {/* GEM INFO */}
          <div>
            <h1 className="text-3xl font-bold">{gem.name}</h1>

            <p className="mt-3 text-gray-600">
              This premium gemstone is sourced from {gem.country} and features
              excellent color and clarity.
            </p>

            <div className="mt-4 space-y-1 text-sm">
              <p>
                <b>Type:</b> {gem.type}
              </p>
              <p>
                <b>Weight:</b> {gem.weight} ct
              </p>
              <p>
                <b>Country:</b> {gem.country}
              </p>
            </div>
          </div>

          {/* SELLER DETAILS (INLINE) */}
          <div className="rounded-xl border bg-gray-50 p-5">
            <h3 className="mb-3 text-lg font-semibold">
              Seller Details
            </h3>

            <p className="text-sm">
              <b>Name:</b> {seller.name}
            </p>
            <p className="text-sm">
              <b>Location:</b> {seller.location}
            </p>
            <p className="text-sm">
              <b>Phone:</b> {seller.phone}
            </p>
            <p className="text-sm">
              <b>Email:</b> {seller.email}
            </p>

            <a
              href={`mailto:${seller.email}`}
              className="mt-4 inline-block rounded-full bg-yellow-500 px-6 py-2 font-semibold text-black hover:bg-yellow-400"
            >
              Contact Seller
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
