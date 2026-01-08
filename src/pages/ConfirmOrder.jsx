import { useLocation, Link } from "react-router-dom";
import { useState } from "react";

export default function ConfirmOrder() {
  const { state } = useLocation();

  if (!state) {
    return <div className="p-10 text-center">No order data</div>;
  }

  const { product, address, mobile } = state;

  // 🔹 Editable states
  const [street, setStreet] = useState(address.street);
  const [lane, setLane] = useState(address.lane);
  const [district, setDistrict] = useState(address.district);
  const [country, setCountry] = useState(address.country);
  const [phone, setPhone] = useState(mobile);

  return (
    <div className="mx-auto max-w-xl py-12">

      <div className="rounded-xl border border-yellow-400 p-8">

        <h2 className="mb-8 text-center text-xl font-semibold text-yellow-600">
          Confirm Your Order
        </h2>

        {/* MODEL */}
        <Row label="Model">
          <input
            readOnly
            value={product.name}
            className="w-full rounded-md border px-3 py-2 text-sm bg-gray-100"
          />
        </Row>

        {/* PRICE */}
        <Row label="Price">
          <input
            readOnly
            value={`Rs. ${product.price.toLocaleString()}`}
            className="w-full rounded-md border px-3 py-2 text-sm bg-gray-100"
          />
        </Row>

        {/* ADDRESS (EDITABLE) */}
        <Row label="Street">
          <input
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </Row>

        <Row label="Lane">
          <input
            value={lane}
            onChange={(e) => setLane(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </Row>

        <Row label="District">
          <input
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </Row>

        <Row label="Country">
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </Row>

        {/* MOBILE */}
        <Row label="Mobile Number">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </Row>

        {/* PAYMENT */}
        <Row label="Payment">
          <input
            readOnly
            value="Cash On Delivery"
            className="w-full rounded-md border px-3 py-2 text-sm bg-gray-100"
          />
        </Row>

        {/* ACTIONS */}
        <div className="mt-8 flex justify-center gap-6">
          <Link
            to="/instruments"
            className="text-sm underline"
          >
            Cancel
          </Link>

          <button
            onClick={() => {
              console.log({
                product,
                street,
                lane,
                district,
                country,
                phone,
              });
              alert("Order confirmed (demo)");
            }}
            className="rounded-md bg-yellow-500 px-8 py-2 text-sm font-semibold text-white hover:bg-yellow-600"
          >
            Confirm Now
          </button>
        </div>

      </div>
    </div>
  );
}

/* 🔹 Reusable row layout */
function Row({ label, children }) {
  return (
    <div className="mb-4 grid grid-cols-[140px_1fr] items-center gap-3">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </div>
  );
}
