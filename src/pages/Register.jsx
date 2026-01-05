import React from "react";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Create an Account
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Country */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Country
          </label>
          <select className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400">
            <option value="">Select country</option>
            <option>Sri Lanka</option>
            <option>India</option>
            <option>USA</option>
            <option>UK</option>
          </select>
        </div>

        {/* Mobile */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Mobile Number
          </label>
          <input
            type="text"
            placeholder="Enter mobile number"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Register Button */}
        <button
          type="button"
          className="w-full rounded-lg bg-yellow-500 py-3 font-semibold text-black hover:bg-yellow-400 transition"
        >
          Register
        </button>

      </div>
    </div>
  );
}
