import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(){
  return (
    <header className="bg-white shadow sticky top-0 z-30">
      <div className="container flex items-center justify-between py-4">
        <Link to='/' className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold'>G</div>
          <div className='text-lg font-semibold'>GEMORA</div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/marketplace" className="hover:text-gold">Marketplace</Link>
          <Link to="/category" className="hover:text-gold">Categories</Link>
          <Link to="/about" className="hover:text-gold">About</Link>
          <Link to="/contact" className="hover:text-gold">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm px-3 py-2 border rounded">Login</Link>
          <Link to="/cart" className="bg-gold px-3 py-2 rounded text-white text-sm">Cart</Link>
        </div>
      </div>
    </header>
  )
}
