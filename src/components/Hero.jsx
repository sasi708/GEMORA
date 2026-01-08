export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div
        className="
          relative
          rounded-3xl
          overflow-hidden
          bg-cover
          bg-center
          p-12
          md:p-16
          text-white
        "
        style={{
          backgroundImage: "url('/gems/hero-gem.png')",
        }}
      >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-xl">
          <h1 className="text-5xl font-bold leading-tight">
            Discover the World's <br /> Finest Gems
          </h1>

          <p className="mt-4 text-lg text-gray-200">
            Your trusted marketplace for buying and selling precious stones.
          </p>

          <button className="mt-6 rounded-full bg-yellow-500 px-8 py-3 font-semibold text-black hover:bg-yellow-400 transition">
            Explore Gems
          </button>
        </div>
      </div>
    </section>
  );
}
