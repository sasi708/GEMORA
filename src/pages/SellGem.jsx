export default function SellGem() {
  return (
    <>
      {/* HERO / HEADER SECTION WITH BACKGROUND */}
      <section
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/gems/sell-bg.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <h1 className="text-4xl font-bold text-yellow-500">
            Sell your gem now...
          </h1>
          <p className="mt-2 max-w-xl text-sm text-gray-200">
            Reach global buyers by listing your precious gemstones on GEMORA.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-12 gap-10">
          {/* LEFT FORM */}
          <div className="col-span-12 md:col-span-5 space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Business name
              </label>
              <input className="w-full rounded-lg border px-4 py-2" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Gem Type
              </label>
              <input className="w-full rounded-lg border px-4 py-2" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Weight
              </label>
              <input className="w-full rounded-lg border px-4 py-2" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Location
              </label>
              <input className="w-full rounded-lg border px-4 py-2" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Contact Numbers
              </label>
              <input className="w-full rounded-lg border px-4 py-2" />
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="col-span-12 md:col-span-7 space-y-6">
            <div className="rounded-xl border p-6 text-center">
              <p className="mb-4 text-sm font-medium">
                Upload Gem Photo
              </p>

              <button className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-6 py-2 font-semibold">
                Upload Now ⬆️
              </button>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Description about gem
              </label>
              <textarea
                rows="5"
                className="w-full rounded-lg border px-4 py-2"
              ></textarea>
            </div>

            <button className="w-full rounded-full bg-yellow-600 py-3 font-bold text-white hover:bg-yellow-500">
              Publish Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
