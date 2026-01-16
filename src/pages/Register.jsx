import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    mobile: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleRegister = async () => {
    setMsg("");

    if (!form.name || !form.email || !form.password) {
      setMsg("Name, Email, Password අනිවාර්යයි.");
      return;
    }

    try {
      setLoading(true);

      // backend currently expects: name, email, password
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        payload
      );

      // ✅ save token + user (for showing username in header)
      if (res.data?.token) localStorage.setItem("token", res.data.token);
      if (res.data?.user) localStorage.setItem("user", JSON.stringify(res.data.user));

      setMsg("✅ Registered successfully!");
      navigate("/"); // ✅ go home after register
    } catch (err) {
      console.log(err);
      setMsg(err.response?.data?.message || "❌ Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create an Account
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
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
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a password"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Country */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Country</label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Select country</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>
        </div>

        {/* Mobile */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Mobile Number
          </label>
          <input
            name="mobile"
            type="text"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Enter Mobile number"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Message */}
        {msg && <p className="mb-4 text-center text-sm text-gray-700">{msg}</p>}

        {/* Register Button */}
        <button
          type="button"
          onClick={handleRegister}
          disabled={loading}
          className="w-full rounded-lg bg-yellow-500 py-3 font-semibold text-black hover:bg-yellow-400 transition disabled:opacity-60"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-yellow-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
