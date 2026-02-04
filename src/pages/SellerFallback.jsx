import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api";

const DUMMY_SELLER = {
  name: "sunil nissanka",
  email: "nsunul@gmail.com",
  location: "12/5,eheliyagoda,srilanka",
  contact: "+94 11 234 5678",
  profilePic: "https://via.placeholder.com/150",
};

export default function SellerFallback() {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const res = await API.get("/auth/users");
        const users = res.data?.users || res.data || [];
        
        const firstUser = users.find(u => u.role === "user") || users[0];
        
        if (firstUser) {
          setSeller({
            name: firstUser.name,
            email: firstUser.email,
            location: "Colombo, Sri Lanka",
            contact: "+94 11 234 5678",
            profilePic: firstUser.profilePic || firstUser.profileImage || "https://via.placeholder.com/150",
          });
        } else {
          setSeller(DUMMY_SELLER);
        }
      } catch (error) {
        console.error("Failed to fetch seller:", error);
        setSeller(DUMMY_SELLER);
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, []);

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
              <span className="font-medium">Location:</span> {seller.location}
            </p>
            <p>
              <span className="font-medium">Contact:</span> {seller.contact}
            </p>
          </div>

          <a
            href={`mailto:${seller.email}`}
            className="mt-5 inline-block w-full rounded-full bg-yellow-500 px-6 py-3 text-center font-semibold text-black hover:bg-yellow-400"
          >
            Contact Seller
          </a>
        </div>
      </div>
    </section>
  );
}
