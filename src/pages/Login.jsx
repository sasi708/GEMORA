import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleLogin = async () => {
    setMsg("");

    if (!form.email || !form.password) {
      setMsg("Email සහ Password අනිවාර්යයි.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        form
      );

      // ✅ save token + user
      if (res.data?.token) localStorage.setItem("token", res.data.token);
      if (res.data?.user) localStorage.setItem("user", JSON.stringify(res.data.user));

      setMsg("✅ Login success!");
      navigate("/"); // home
    } catch (err) {
      console.log(err);
      setMsg(err.response?.data?.message || "❌ Login failed");
    } finally {
      setLoading(false);
    }
  };

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
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border bg-blue-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div className="mb-8">
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Password
          </label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-lg border bg-blue-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter your password"
          />
        </div>

        {/* Message */}
        {msg && <p className="mb-4 text-center text-sm text-gray-700">{msg}</p>}

        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-xl bg-yellow-500 py-3 text-lg font-semibold text-white hover:bg-yellow-600 transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-yellow-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
