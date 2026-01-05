import React from 'react'

export default function Hero() {
  return (
    <section
      className="mx-auto mt-6 max-w-7xl rounded-2xl bg-cover bg-center px-10 py-20 text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/assets/hero-bg.jpg')",
      }}
    >
      <h1 className="text-4xl font-bold md:text-5xl">
        Discover the World's <br /> Finest Gems
      </h1>

      <p className="mt-4 max-w-xl text-gray-200">
        Your trusted marketplace for buying and selling precious stones.
      </p>

      <button className="mt-8 rounded-full bg-yellow-500 px-6 py-3 font-semibold text-black hover:bg-yellow-400">
        Explore Gems
      </button>
    </section>
  );
}
