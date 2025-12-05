import React from 'react'

export default function Hero(){
  return (
    <section className="container py-12">
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg text-white p-10 flex flex-col md:flex-row items-center gap-8">
        <div className="md:flex-1">
          <h1 className="text-3xl md:text-5xl font-bold">Discover the World's Finest Gems</h1>
          <p className="mt-4 text-lg text-gray-200 max-w-xl">Curated gemstones from trusted sellers. Certified quality, worldwide shipping.</p>
          <div className="mt-6">
            <a href="/marketplace" className="bg-gold text-white px-6 py-3 rounded shadow inline-block">Shop Marketplace</a>
          </div>
        </div>

        <div className="md:flex-1">
          <div className="w-full h-56 md:h-64 bg-white/5 rounded flex items-center justify-center">
            <img src="/src/assets/hero-diamond.png" alt="diamond" className="max-h-56 object-contain"/>
          </div>
        </div>
      </div>
    </section>
  )
}
