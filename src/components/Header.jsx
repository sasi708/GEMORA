import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 font-bold">
          <span className="rounded-full bg-black px-3 py-1 text-white">
            G
          </span>
          GEMORA
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden gap-8 md:flex">
          <Link to="/">Home</Link>
          <Link to="/market">Market</Link>
          <Link to="/instruments">Instruments</Link>
          <Link to="/news">News</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* AUTH BUTTONS */}
        <div className="flex gap-3">
          <Link
            to="/login"
            className="rounded-md border px-4 py-2"
          >
            Login
          </Link>

          <Link to="/register" className="rounded-md bg-yellow-500 px-4 py-2 font-semibold">
               Sign Up
          </Link>

        </div>
      </div>
    </header>
  );
}
