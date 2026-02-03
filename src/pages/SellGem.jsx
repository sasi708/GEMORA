import { useState } from "react";

export default function SellGem() {
  const [preview, setPreview] = useState(null);

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/gems/sell-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <h1 className="text-4xl font-bold text-yellow-500">
            Sell your gem now...
          </h1>
          <p className="mt-2 max-w-xl text-sm text-gray-200">
            Reach global buyers by listing your precious gemstones on GEMORA.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-12 gap-12">
          {/* LEFT */}
          <div className="col-span-12 md:col-span-5 space-y-5">
            {[
              "Business name",
              "Gem Type",
              "Weight (ct)",
              "Location",
              "Contact Number",
            ].map((label) => (
              <div key={label}>
                <label className="mb-1 block text-sm font-medium">
                  {label}
                </label>
                <input className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-yellow-400" />
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="col-span-12 md:col-span-7 space-y-6">
            {/* IMAGE UPLOAD */}
            <div className="rounded-xl border p-6 text-center">
              <p className="mb-4 text-sm font-medium">
                Upload Gem Photo
              </p>

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mx-auto mb-4 h-40 object-contain rounded"
                />
              )}

              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-yellow-500 px-6 py-2 font-semibold hover:bg-yellow-400">
                Upload Now ⬆️
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    setPreview(URL.createObjectURL(e.target.files[0]))
                  }
                />
              </label>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Description about gem
              </label>
              <textarea
                rows="5"
                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-yellow-400"
              ></textarea>
            </div>

            {/* SUBMIT */}
            <button className="w-full rounded-full bg-yellow-600 py-3 font-bold text-white hover:bg-yellow-500 transition">
              Publish Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
