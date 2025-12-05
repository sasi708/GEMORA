import React from 'react'
import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'

const sample = [
  {id:1,title:'Red Ruby',price:1200,image:'/src/assets/ruby.jpg'},
  {id:2,title:'Blue Sapphire',price:900,image:'/src/assets/sapphire.jpg'},
  {id:3,title:'Emerald',price:1500,image:'/src/assets/emerald.jpg'},
  {id:4,title:'Diamond',price:4200,image:'/src/assets/diamond.jpg'},
]

export default function Home(){
  return (
    <div>
      <Hero />
      <section className="container py-8">
        <h2 className="text-2xl font-semibold mb-6">Featured Gems</h2>
        <ProductGrid items={sample} />
      </section>

      <section className="container py-8">
        <h2 className="text-2xl font-semibold mb-4">Why GEMORA?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded">
            <h3 className="font-semibold">Certified Gems</h3>
            <p className="mt-2 text-sm text-gray-600">All gems are certified for authenticity.</p>
          </div>
          <div className="p-6 border rounded">
            <h3 className="font-semibold">Trusted Sellers</h3>
            <p className="mt-2 text-sm text-gray-600">We vet our sellers carefully.</p>
          </div>
          <div className="p-6 border rounded">
            <h3 className="font-semibold">Worldwide Shipping</h3>
            <p className="mt-2 text-sm text-gray-600">Fast and insured shipping worldwide.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
