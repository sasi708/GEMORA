import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import instruments from "../data/instrumentsData";

export default function InstrumentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔹 FORM STATES
  const [street, setStreet] = useState("");
  const [lane, setLane] = useState("");
  const [district, setDistrict] = useState("");
  const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");

  const product = instruments.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="p-10 text-center text-gray-500">
        Product not found
      </div>
    );
  }

  // 🔹 remove current product from more-from-store
  const moreFromStore = instruments.filter(
    (item) => item.id !== product.id
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      {/* BACK BUTTON */}
      <div className="mb-6 flex justify-end">
        <Link
          to="/instruments"
          className="rounded-full bg-red-500 px-5 py-2 text-xs font-semibold text-white"
        >
          Back To Market
        </Link>
      </div>

      {/* TOP DETAILS */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[340px_1fr]">

        {/* ================= LEFT SIDE ================= */}
        <div className="space-y-4">

          {/* IMAGE */}
          <div className="rounded-xl border p-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-full object-contain"
            />
          </div>

          {/* NAME & PRICE */}
          <div>
            <p className="text-sm font-semibold">{product.name}</p>
            <p className="text-sm text-gray-600">
              Rs. {product.price.toLocaleString()}
            </p>
          </div>

          {/* ADDRESS FORM */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-700">
              Enter your Address
            </p>

            <input
              placeholder="Street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-xs"
            />

            <input
              placeholder="Lane"
              value={lane}
              onChange={(e) => setLane(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-xs"
            />

            <input
              placeholder="District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-xs"
            />

            <input
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-xs"
            />
          </div>

          {/* MOBILE */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-700">
              Enter your Mobile Number
            </p>

            <input
              placeholder="Phone Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-xs"
            />
          </div>

          {/* WARNING */}
          <p className="text-xs text-red-500">
            Dear customer, COD only available
          </p>

          {/* ORDER BUTTON */}
          <button
            onClick={() =>
              navigate("/confirm-order", {
                state: {
                  product,
                  address: {
                    street,
                    lane,
                    district,
                    country,
                  },
                  mobile,
                },
              })
            }
            className="
              w-full
              cursor-pointer
              rounded-full
              bg-yellow-500
              py-2
              text-xs
              font-semibold
              text-white
              transition
              hover:bg-yellow-600
              active:scale-95
            "
          >
            Order Now
          </button>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="border-l border-gray-200 pl-10">

          <h2 className="mb-2 text-sm font-semibold">
            {product.name}
          </h2>

          <p className="mb-4 text-xs text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <h3 className="mb-2 text-xs font-semibold">
            Key Features
          </h3>

          <ul className="list-disc space-y-1 pl-4 text-xs text-gray-600">
            {product.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          {/* MORE FROM STORE */}
          <div className="mt-14 border-t pt-8">
            <h3 className="mb-6 text-lg font-semibold">
              More From Store
            </h3>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {moreFromStore.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border p-4 text-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="mx-auto h-24 object-contain"
                  />
                  <p className="mt-2 text-xs font-medium">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    Rs. {item.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => navigate(`/instrument/${item.id}`)}
                    className="
                      mt-2
                      cursor-pointer
                      rounded-full
                      bg-yellow-500
                      px-4
                      py-1
                      text-xs
                      font-semibold
                      text-white
                      transition
                      hover:bg-yellow-600
                      hover:scale-105
                      active:scale-95
                    "
                  >
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
