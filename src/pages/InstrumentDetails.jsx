import { Link } from "react-router-dom";

export default function InstrumentDetails() {
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

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[340px_1fr]">

        {/* LEFT IMAGE + FORM */}
        <div className="space-y-4">
          <img
            src="/instrument/Gem cutting Machine.jpeg"
            alt="Gem Cutting Machine"
            className="w-full rounded-xl border bg-gray-100 p-3 object-contain"
          />

          <h3 className="text-xs font-semibold">Gem Cutting Machine</h3>
          <p className="text-xs text-gray-600">Rs. 50,000.00</p>

          <p className="mt-4 text-xs font-medium text-gray-700">
            Enter your Address
          </p>

          <input
            className="w-full rounded-md border px-3 py-1.5 text-xs"
            placeholder="Street"
          />
          <input
            className="w-full rounded-md border px-3 py-1.5 text-xs"
            placeholder="Lane"
          />
          <input
            className="w-full rounded-md border px-3 py-1.5 text-xs"
            placeholder="District"
          />
          <input
            className="w-full rounded-md border px-3 py-1.5 text-xs"
            placeholder="Country"
          />

          <p className="mt-3 text-xs font-medium text-gray-700">
            Enter your Mobile Number
          </p>
          <input
            className="w-full rounded-md border px-3 py-1.5 text-xs"
            placeholder="Phone Number"
          />

          <p className="text-xs text-red-500">
            Dear customer, COD only available
          </p>

          <button className="mt-3 rounded-full bg-yellow-500 px-5 py-1.5 text-xs font-semibold text-white">
            Order Now
          </button>
        </div>

        {/* RIGHT DESCRIPTION */}
        <div className="border-l border-gray-200 pl-10">
          <h2 className="mb-2 text-sm font-semibold">
            Gem Cutting Machine
          </h2>

          <p className="mb-4 text-xs leading-5 text-gray-600">
            This precision-engineered mast assembly is designed for gemstone
            faceting, providing accurate angle control and smooth adjustment
            during cutting and polishing. Built with a durable metal body and
            fine-tune angle dials, it ensures stability, repeatability, and
            high-quality facet placement for both hobbyists and professional
            gem cutters.
          </p>

          <h3 className="mb-2 text-xs font-semibold">
            Key Features
          </h3>

          <ul className="list-disc space-y-1 pl-4 text-xs text-gray-600">
            <li>Precision Angle Adjustment</li>
            <li>Angle dial and fine-tune knob allow accurate facet angles</li>
            <li>Solid Metal Construction</li>
            <li>Durable brass and steel components</li>
            <li>Height-Adjustable Mast</li>
            <li>Smooth vertical movement for positioning</li>
            <li>Index Gear Control</li>
            <li>Accurate indexing for facet patterns</li>
            <li>Secure Quill Holder</li>
            <li>Maintains perfect alignment</li>
            <li>Stable Base Mount</li>
            <li>Strong base connection</li>
          </ul>
        

        {/* MORE FROM STORE – RIGHT SIDE COLUMN BELOW */}
          <div className="mt-16 border-t pt-10 lg:col-start-2">
          <h3 className="mb-6 text-lg font-semibold">
            More From Store
          </h3>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              {
                img: "Gem cutting Machine 02.jpeg",
                name: "Gem Cutting Machine",
                price: "Rs. 50,000.00",
              },
              {
                img: "Torch.jpeg",
                name: "Torch",
                price: "Rs. 7,500.00",
              },
              {
                img: "Scale.jpeg",
                name: "Scale",
                price: "Rs. 6,500.00",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border p-4 text-center"
              >
                <img
                  src={`/instrument/${item.img}`}
                  className="mx-auto h-24 object-contain"
                  alt={item.name}
                />
                <p className="mt-2 text-xs font-medium">{item.name}</p>
                <p className="text-xs text-gray-600">{item.price}</p>
                <button className="mt-2 rounded-full bg-yellow-500 px-4 py-1 text-xs font-semibold text-white">
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
