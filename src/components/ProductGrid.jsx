import React from 'react'
import ProductCard from './ProductCard'

export default function ProductGrid({items}){
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map(i => <ProductCard key={i.id} product={i} />)}
    </div>
  )
}
