import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api";

export default function SellerFallback() {
  const [seller, setSeller] = useState(null);
  const [gem, setGem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { sellerId, gemId } = useParams();
  const location = useLocation();

  useEffect(() => {
    const fetchGem = async () => {
      try {
        const res = await API.get(`/gems/${gemId}`);
        const gemData = res.data;
        setGem(gemData);
        setSeller(gemData.seller);
      } catch (error) {
        console.error("Failed to fetch gem:", error);
        // Fallback
        const fallbackGem = location.state?.gem;
        if (fallbackGem) {
          setGem(fallbackGem);
          setSeller(fallbackGem.seller);
        } else {
          setSeller({
            name: "Demo Seller",
            email: "demo@gemora.com",
            location: "Colombo, Sri Lanka",
            phone: "+94 11 234 5678",
            profilePic: "https://via.placeholder.com/150",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    if (gemId) {
      fetchGem();
    } else {
      setLoading(false);
    }
  }, [gemId, location.state]);

  if (loading) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-10">
        <p className="text-center text-gray-500">Loading...</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-6">
        <Link
          to="/market"
          className="inline-block rounded-full bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
        >
           Back to Market
        </Link>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={seller.profilePic}
                alt="seller"
                className="h-16 w-16 rounded-full border object-cover"
              />
              <div className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 border-2 border-white">
                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">
                {seller.name}
              </p>
              <p className="text-sm text-slate-500">Verified Seller</p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-sm text-slate-700">
            <p>
              <span className="font-medium">Email:</span> {seller.email}
            </p>
            <p>
              <span className="font-medium">Mobile:</span> {seller.phone || seller.contact}
            </p>
          </div>


        </div>
      </div>
    </section>
  );
}
