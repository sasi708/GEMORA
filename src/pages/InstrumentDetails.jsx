import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function InstrumentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [moreFromStore, setMoreFromStore] = useState([]);
  const [loading, setLoading] = useState(true);

  // Order states
  const [qty, setQty] = useState(1);
  const [street, setStreet] = useState("");
  const [lane, setLane] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [district, setDistrict] = useState("");
  const [country] = useState("Sri Lanka");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/tools");
        const found = res.data.find((item) => item._id === id);
        setProduct(found);
        setMoreFromStore(res.data.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Error loading details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!product) return <div className="p-10 text-center">Product not found</div>;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Back button */}
      <div className="mb-6 flex justify-end">
        <Link
          to="/instruments"
          className="rounded-full bg-red-500 px-5 py-2 text-xs text-white"
        >
          Back To Market
        </Link>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* LEFT COLUMN – IMAGE + ORDER */}
        <div className="space-y-8">
          {/* Image */}
          <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-black p-6">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="mx-auto h-72 object-contain"
            />
          </div>

          {/* ORDER BOX */}
          <div className="rounded-xl border p-5 space-y-4">
            {/* Quantity */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium">Quantity</p>
              <div className="flex items-center border rounded">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-2 py-1 bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 text-sm">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-2 py-1 bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <p className="text-xs font-medium">Shipping Address</p>
              <input
                placeholder="Street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full rounded border px-3 py-2 text-xs"
              />
              <input
                placeholder="Lane"
                value={lane}
                onChange={(e) => setLane(e.target.value)}
                className="w-full rounded border px-3 py-2 text-xs"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded border px-3 py-2 text-xs"
                />
                <input
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full rounded border px-3 py-2 text-xs"
                />
              </div>
              <input
                placeholder="District"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full rounded border px-3 py-2 text-xs"
              />
            </div>

            {/* Mobile */}
            <div className="space-y-2">
              <p className="text-xs font-medium">Mobile Number</p>
              <input
                placeholder="Phone"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full rounded border px-3 py-2 text-xs"
              />
            </div>

            {/* Order Button */}
            <button
              onClick={() => {
                const orderData = {
                  product,
                  qty,
                  address: {
                    street,
                    lane,
                    city,
                    postalCode,
                    district,
                    country,
                  },
                  mobile,
                };
                sessionStorage.setItem(
                  "orderData",
                  JSON.stringify(orderData)
                );
                navigate("/confirm-order");
              }}
              className="w-full rounded-full bg-yellow-500 py-2 text-xs font-semibold text-white"
            >
              Order Now
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN – DETAILS + MORE FROM STORE */}
        <div className="space-y-8">
          {/* Details */}
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold">{product.name}</h1>

            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description ||
                "This gemstone features exceptional clarity, vibrant color, and a refined cut."}
            </p>

            <div className="border-t pt-4 space-y-1">
              <p className="text-sm font-medium">
                Seller – {product.sellerName || "Kasun Ranathunga"}
              </p>
              <p className="text-xs text-gray-500">
                Location – {product.location || "Colombo, Sri Lanka"}
              </p>
              <p className="text-xs text-gray-500">
                Contact – {product.contact || "071XXXXXXX"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>
                <span className="font-medium">Gem Type:</span>{" "}
                {product.type || "Yellow Sapphire"}
              </p>
              <p>
                <span className="font-medium">Weight:</span>{" "}
                {product.weight || "8.23ct"}
              </p>
            </div>

            <p className="text-lg font-semibold">
              Rs. {product.price?.toLocaleString()}
            </p>
          </div>

          {/* MORE FROM STORE – EXACTLY IN EMPTY SPACE */}
          <div className="border-t pt-6">
            <h2 className="mb-4 text-sm font-semibold text-gray-700">
              More From Store
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {moreFromStore.slice(0, 4).map((item) => (
                <Link
                  key={item._id}
                  to={`/instruments/${item._id}`}
                  className="rounded-lg border p-3 hover:shadow transition"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-24 w-full object-contain"
                  />
                  <p className="mt-1 text-xs font-medium truncate">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Rs. {item.price?.toLocaleString()}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
