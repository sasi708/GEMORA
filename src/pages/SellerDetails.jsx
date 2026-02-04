import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api";

export default function SellerDetails() {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);
  const [sellerGems, setSellerGems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        // Get all gems and filter by seller
        const res = await API.get("/gems");
        const gems = res.data;

        // Find gems by seller ID
        const userGems = gems.filter(
          (g) => g.seller === sellerId || g.seller?._id === sellerId
        );

        if (userGems.length === 0) {
          // No gems found for seller; fallback page will handle display
        }

        setSellerGems(userGems);

        // Extract seller info from first gem
        if (userGems.length > 0 && userGems[0].sellerInfo) {
          setSeller(userGems[0].sellerInfo);
        }
      } catch (error) {
        console.error("Failed to fetch seller details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerDetails();
  }, [sellerId]);

  if (loading) return <p className="p-10 text-center">Loading seller details...</p>;

  if (!seller || sellerGems.length === 0) {
    return <Navigate to="/seller/default" replace />;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      {/* BACK */}
      <Link
        to="/market"
        className="mb-6 inline-block rounded-full bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
      >
        ← Back to Market
      </Link>

      <div className="grid grid-cols-12 gap-10">
        {/* LEFT – SELLER DETAILS */}
        <div className="col-span-12 md:col-span-4">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">Seller Details</h2>

            <p className="mb-2">
              <b>Name:</b> {seller.name || "N/A"}
            </p>
            <p className="mb-2">
              <b>Email:</b> {seller.email || "N/A"}
            </p>
            <p className="mb-6">
              <b>Seller ID:</b> {sellerId}
            </p>

            <a
              href={`mailto:${seller.email || ""}`}
              className="inline-block rounded-full bg-yellow-500 px-6 py-3 font-semibold text-black hover:bg-yellow-400 disabled:opacity-50"
            >
              Send Email
            </a>
          </div>
        </div>

        {/* RIGHT – SELLER GEMS */}
        <div className="col-span-12 md:col-span-8">
          <h3 className="mb-6 text-xl font-bold">Gems From This Seller</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sellerGems.map((gem) => (
              <div
                key={gem._id}
                onClick={() => navigate(`/gems/${gem._id}`)}
                className="bg-white border rounded-lg p-3 hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={gem.images?.[0] || "https://via.placeholder.com/400"}
                  alt={gem.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h4 className="font-semibold text-sm">{gem.name}</h4>
                <p className="text-xs text-gray-500">
                  {gem.carat} ct · {gem.origin}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
