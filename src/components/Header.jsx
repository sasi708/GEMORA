import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-white"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center">
            <span className="h-5 w-3 rounded-full bg-yellow-500"></span>
            <span className="h-5 w-3 -ml-1.5 rounded-full bg-yellow-400"></span>
            <span className="h-5 w-3 -ml-1.5 rounded-full bg-yellow-300"></span>
          </div>
          <span className="text-lg font-bold tracking-wide text-slate-800">
            GEMORA
          </span>
        </Link>

        {/* NAV */}
        <nav className="hidden gap-8 md:flex text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-yellow-500">Home</Link>
          <Link to="/market" className="hover:text-yellow-500">Market</Link>
          <Link to="/instruments" className="hover:text-yellow-500">Instruments</Link>
          <Link to="/news" className="hover:text-yellow-500">News</Link>
          <Link to="/contact" className="hover:text-yellow-500">Contact</Link>
        </nav>

        {/* AUTH */}
        <div className="flex gap-3">
          <Link
            to="/login"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:border-yellow-500 hover:text-yellow-500 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-600 transition"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </header>
  );
}
