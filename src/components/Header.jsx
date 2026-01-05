import React from 'react'
import { Link } from 'react-router-dom'



export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 font-bold">
          <span className="rounded-full bg-black px-3 py-1 text-white">G</span>
          GEMORA
        </div>

        <nav className="hidden gap-8 md:flex">
          <a href="#">Home</a>
          <a href="#">Market</a>
          <a href="#">Instruments</a>
          <a href="#">News</a>
          <a href="#">Contact</a>
        </nav>

        <div className="flex gap-3">
          <button className="rounded-md border px-4 py-2">Login</button>
          <button className="rounded-md bg-yellow-500 px-4 py-2 font-semibold">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}

