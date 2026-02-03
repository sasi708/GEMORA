import React, { useEffect, useMemo, useState } from "react";
import API from "../api";

export default function Profile() {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const [name, setName] = useState(initialUser?.name || "");
  const [email, setEmail] = useState(initialUser?.email || "");
  const [profilePic, setProfilePic] = useState(initialUser?.profilePic || "");

  const [picFile, setPicFile] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [orders, setOrders] = useState([]);

  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // Preview URL (handles file preview + stored profile pic)
  const preview = useMemo(() => {
    if (picFile) return URL.createObjectURL(picFile);
    return profilePic || "";
  }, [picFile, profilePic]);

  // cleanup for objectURL
  useEffect(() => {
    if (!picFile) return;
    const url = URL.createObjectURL(picFile);
    return () => URL.revokeObjectURL(url);
  }, [picFile]);

  // load profile from backend
  useEffect(() => {
    const load = async () => {
      try {
        setErr("");
        const res = await API.get("/auth/profile");

        // 🔹 This is the "Pre-fill" magic - extract from data.user
        if (res.data && res.data.user) {
          setName(res.data.user.name || "");
          setEmail(res.data.user.email || "");
          setProfilePic(res.data.user.profilePic || "");

          // keep localStorage in sync
          const newStored = {
            ...(initialUser || {}),
            name: res.data.user.name,
            email: res.data.user.email,
            profilePic: res.data.user.profilePic || "",
          };
          localStorage.setItem("user", JSON.stringify(newStored));
          window.dispatchEvent(new Event("storage"));
        }
      } catch (e) {
        console.error("Profile load error:", e);
        setErr(e.response?.data?.message || e.message);
      }
    };

    const loadOrders = async () => {
      try {
        const res = await API.get("/orders/myorders");
        
        // Safety check: Your controller returns res.data which is an array or { orders: [...] }
        const ordersData = Array.isArray(res.data) ? res.data : res.data.orders || res.data.data || [];
        setOrders(ordersData);
      } catch (e) {
        console.error("Order fetch failed", e);
      }
    };

    if (token) {
      load();
      loadOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveToLocalStorage = (patch) => {
    const current = localStorage.getItem("user");
    const obj = current ? JSON.parse(current) : {};
    const updated = { ...obj, ...patch };
    localStorage.setItem("user", JSON.stringify(updated));
  };

  const handleSelectPic = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMsg("");
    setErr("");

    // simple validations
    const max = 2 * 1024 * 1024;
    if (file.size > max) {
      setErr("Image is too large. Max 2MB.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setErr("Please select a valid image file.");
      return;
    }

    setPicFile(file);
  };

  const uploadPic = async () => {
    if (!picFile) {
      setErr("Please choose an image first.");
      setMsg("");
      return;
    }

    try {
      setLoading(true);
      setErr("");
      setMsg("");

      const fd = new FormData();
      fd.append("profilePic", picFile);

      const res = await API.post("/auth/upload-profile-pic", fd);

      setProfilePic(res.data.profilePic);
      saveToLocalStorage({ profilePic: res.data.profilePic });
      window.dispatchEvent(new Event("storage"));

      setMsg("Profile picture updated ✅");
      setPicFile(null);
    } catch (e) {
      console.error("Upload error:", e);
      setErr(e.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  const updateDetails = async () => {
    try {
      setLoading(true);
      setErr("");
      setMsg("");

      await API.put("/auth/profile", { name, email });

      saveToLocalStorage({ name, email });
      window.dispatchEvent(new Event("storage"));

      setMsg("Profile updated ✅");
    } catch (e) {
      console.error("Update error:", e);
      setErr(e.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    if (!oldPassword || !newPassword) {
      setErr("Please fill old & new password.");
      setMsg("");
      return;
    }

    try {
      setLoading(true);
      setErr("");
      setMsg("");

      await API.put("/auth/change-password", { oldPassword, newPassword });

      setOldPassword("");
      setNewPassword("");
      setMsg("Password changed ✅");
    } catch (e) {
      console.error("Password change error:", e);
      setErr(e.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  const firstLetter = (name || "U").trim().charAt(0).toUpperCase();

  if (!token) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-red-600">Please login first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
          <p className="text-sm text-slate-500">
            Update your account info, profile picture, and password.
          </p>
        </div>

        {/* Alerts */}
        {(msg || err) && (
          <div
            className={`mb-6 rounded-xl border p-4 text-sm ${
              err
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-green-200 bg-green-50 text-green-700"
            }`}
          >
            {err || msg}
          </div>
        )}

        {/* Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left: Profile card */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                {preview ? (
                  <img
                    src={preview}
                    alt="profile"
                    className="h-20 w-20 rounded-full border object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500 text-2xl font-bold text-white">
                    {firstLetter}
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold text-slate-900">
                    {name || "User"}
                  </p>
                  <p className="truncate text-sm text-slate-500">{email}</p>
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-slate-700">
                  Profile picture
                </label>

                <div className="mt-2 flex flex-col gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSelectPic}
                    className="block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-yellow-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-yellow-700 hover:file:bg-yellow-200"
                  />

                  <button
                    onClick={uploadPic}
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Uploading..." : "Upload Photo"}
                  </button>

                  <p className="text-xs text-slate-400">
                    JPG/PNG/WEBP, max 2MB.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Details */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Account Details
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Keep your information up to date.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label className="text-sm font-medium text-slate-700">
                    Name
                  </label>
                  <input
                    className="mt-2 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-yellow-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    className="mt-2 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-yellow-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                  />
                </div>

                <div className="sm:col-span-2 flex gap-3">
                  <button
                    onClick={updateDetails}
                    disabled={loading}
                    className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setName(initialUser?.name || "");
                      setEmail(initialUser?.email || "");
                      setMsg("");
                      setErr("");
                    }}
                    className="rounded-xl border px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Change Password
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Use a strong password you haven’t used elsewhere.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Old Password
                  </label>
                  <input
                    type="password"
                    className="mt-2 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-yellow-500"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Old password"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="mt-2 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-yellow-500"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password"
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    onClick={changePassword}
                    disabled={loading}
                    className="rounded-xl border px-5 py-2 text-sm font-semibold text-slate-700 hover:border-yellow-500 hover:text-yellow-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </div>
            </div>

            {/* Small note */}
            <div className="text-xs text-slate-400">
              Tip: If you update your email, make sure it’s one you can access.
            </div>
            {/* My Orders Section */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                My Orders
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Track your order history and status.
              </p>

              <div className="mt-5 space-y-3">
                {orders.length === 0 ? (
                  <p className="text-sm text-slate-400">No orders yet.</p>
                ) : (
                  orders.map((order) => (
                    <div
                      key={order._id}
                      className="rounded-lg border p-4 hover:bg-slate-50 transition"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            Order #{order._id.slice(-6)}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {order.orderItems?.length || 0} item(s) • Rs.{" "}
                            {order.totalPrice?.toLocaleString()}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {order.status || "Pending"}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>          </div>
        </div>
      </div>
    </div>
  );
}
