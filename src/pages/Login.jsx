import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg rounded-2xl border bg-white p-10 shadow-lg">

        <h2 className="text-center text-4xl font-bold text-gray-900">
          Welcome Back <span>💎</span>
        </h2>

        <p className="mt-1 mb-10 text-center text-sm text-gray-500">
          Access your premium gemstone marketplace
        </p>

        {/* Email */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded-lg border bg-blue-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Password */}
        <div className="mb-8">
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Password
          </label>
          <input
            type="password"
            className="w-full rounded-lg border bg-blue-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <button className="w-full rounded-xl bg-yellow-500 py-3 text-lg font-semibold text-white hover:bg-yellow-600 transition">
          Login
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-yellow-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
