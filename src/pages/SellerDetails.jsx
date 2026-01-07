import { Link, useParams } from "react-router-dom";
import gems from "../data/gems";
import ProductCard from "../components/ProductCard";

export default function SellerDetails() {
  const { sellerId } = useParams();

  // 🔹 find gems by this seller
  const sellerGems = gems.filter(
    (g) => g.seller.id === sellerId
  );

  if (sellerGems.length === 0) {
    return <p className="p-10">Seller not found</p>;
  }

  const seller = sellerGems[0].seller;

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      {/* BACK */}
      <Link
        to={`/market/${sellerGems[0].id}`}
        className="mb-6 inline-block rounded-full bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
      >
        ← Back to Gem
      </Link>

      <div className="grid grid-cols-12 gap-10">
        {/* LEFT – SELLER DETAILS */}
        <div className="col-span-12 md:col-span-4">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">
              Seller Details
            </h2>

            <p className="mb-2">
              <b>Name:</b> {seller.name}
            </p>
            <p className="mb-2">
              <b>Location:</b> {seller.location}
            </p>
            <p className="mb-2">
              <b>Phone:</b> {seller.phone}
            </p>
            <p className="mb-6">
              <b>Email:</b> {seller.email}
            </p>

            <a
              href={`mailto:${seller.email}`}
              className="inline-block rounded-full bg-yellow-500 px-6 py-3 font-semibold text-black hover:bg-yellow-400"
            >
              Send Email
            </a>
          </div>
        </div>

        {/* RIGHT – SELLER GEMS */}
        <div className="col-span-12 md:col-span-8">
          <h3 className="mb-6 text-xl font-bold">
            More Gems From {seller.name}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {sellerGems.slice(0, 4).map((gem) => (
              <ProductCard
                key={gem.id}
                id={gem.id}
                name={gem.name}
                image={gem.image}
                weight={gem.weight}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
