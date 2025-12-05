import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({product}){
  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <div className="h-40 bg-gray-50 flex items-center justify-center">
          <img src={product.image} alt={product.title} className="max-h-36"/>
        </div>
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-sm">{product.title}</h3>
        <div className="flex items-center justify-between mt-2">
          <div className="font-bold text-gold">${product.price}</div>
          <button className="text-xs px-3 py-1 border rounded">Buy</button>
        </div>
      </div>
    </div>
  )
}
