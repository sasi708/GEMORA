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
          md:p-20
          text-white
          shadow-2xl
        "
        style={{
          backgroundImage: "url('/gems/hero-gem.png')",
        }}
      >
        {/* LUXURY GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

        {/* DECORATIVE ELEMENTS */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-2xl">
          <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-4">Luxury Gemstones</p>
          
          <h1 className="text-6xl md:text-7xl font-bold leading-tight tracking-tight">
            Discover the World's <br /> Finest Gems
          </h1>

          <p className="mt-6 text-lg text-gray-100 leading-relaxed max-w-md">
            Your trusted marketplace for buying and selling authentic precious stones with certified authenticity.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="rounded-full bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 font-semibold transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Explore Collection
            </button>
            <button className="rounded-full border-2 border-white hover:bg-white/10 text-white px-8 py-3 font-semibold transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
