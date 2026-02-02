import React, { useEffect, useMemo, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { instrumentsSeed } from "../data/instrumentsSeed";

const LS_KEY = "admin_instruments_v1";

function uid() {
  return "t_" + Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export default function AdminInstruments() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [status, setStatus] = useState("All");
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "Inspection Tools",
    price: 0,
    stock: 0,
    seller: "Admin",
    status: "Pending",
    image: "",
  });

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      try {
        setItems(JSON.parse(raw));
        return;
      } catch {}
    }
    localStorage.setItem(LS_KEY, JSON.stringify(instrumentsSeed));
    setItems(instrumentsSeed);
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }, [items]);

  const categories = useMemo(() => {
    const set = new Set(items.map((x) => x.category));
    return ["All", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return items
      .filter((x) => (cat === "All" ? true : x.category === cat))
      .filter((x) => (status === "All" ? true : x.status === status))
      .filter((x) => {
        if (!query) return true;
        const hay = `${x.name} ${x.brand} ${x.category} ${x.seller}`.toLowerCase();
        return hay.includes(query);
      });
  }, [items, q, cat, status]);

  const badge = (s) => {
    if (s === "Approved") return "bg-green-100 text-green-700 border-green-200";
    if (s === "Rejected") return "bg-red-100 text-red-700 border-red-200";
    return "bg-yellow-100 text-yellow-700 border-yellow-200"; // Pending
  };

  const onPickImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = () => setForm((p) => ({ ...p, image: r.result }));
    r.readAsDataURL(file);
  };

  const addItem = () => {
    if (!form.name.trim()) return alert("Instrument name is required");
    const payload = { ...form, id: uid() };
    setItems((p) => [payload, ...p]);
    setOpen(false);
    setForm({
      name: "",
      brand: "",
      category: "Inspection Tools",
      price: 0,
      stock: 0,
      seller: "Admin",
      status: "Pending",
      image: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      {/* main content offset for fixed sidebar */}
      <div className="ml-64 p-6">
        {/* top header row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Instruments Management</h1>
            <p className="text-sm text-gray-500 mt-1">{filtered.length} instruments found</p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow"
          >
            <span className="text-lg leading-none">＋</span>
            Add Instrument
          </button>
        </div>

        {/* filters */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search instruments..."
                className="w-full border border-gray-200 rounded-lg px-10 py-2 outline-none focus:ring-2 focus:ring-orange-200"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔎</span>
            </div>

            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-200"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-200"
            >
              {["All", "Pending", "Approved", "Rejected"].map((s) => (
                <option key={s}>{s === "All" ? "All Status" : s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* table */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left font-semibold px-5 py-3">Instrument</th>
                  <th className="text-left font-semibold px-5 py-3">Category</th>
                  <th className="text-left font-semibold px-5 py-3">Price</th>
                  <th className="text-left font-semibold px-5 py-3">Stock</th>
                  <th className="text-left font-semibold px-5 py-3">Seller</th>
                  <th className="text-left font-semibold px-5 py-3">Status</th>
                  <th className="text-left font-semibold px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((x) => (
                  <tr key={x.id} className="border-t border-gray-100">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-100">
                          {x.image ? (
                            <img
                              src={x.image}
                              alt={x.name}
                              className="h-full w-full object-cover"
                              onError={(e) => (e.currentTarget.style.display = "none")}
                            />
                          ) : null}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{x.name}</div>
                          <div className="text-gray-500 text-xs">{x.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-700">{x.category}</td>
                    <td className="px-5 py-4 text-gray-700">${x.price}</td>
                    <td className="px-5 py-4 text-gray-700">{x.stock}</td>
                    <td className="px-5 py-4 text-gray-700">{x.seller}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium ${badge(x.status)}`}>
                        {x.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3 text-lg">
                        <button className="text-gray-700 hover:text-black" title="View">👁️</button>
                        <button className="text-gray-700 hover:text-black" title="Edit">✏️</button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                          onClick={() => {
                            if (!confirm("Delete this instrument?")) return;
                            setItems((p) => p.filter((i) => i.id !== x.id));
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {!filtered.length ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-gray-500">
                      No instruments found.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        {/* modal */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold">Add Instrument</h2>
                <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-black text-xl">
                  ✕
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">Instrument Name *</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-200"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Brand</label>
                  <input
                    value={form.brand}
                    onChange={(e) => setForm((p) => ({ ...p, brand: e.target.value }))}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-200"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Category</label>
                  <input
                    value={form.category}
                    onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-200"
                    placeholder="e.g. Measuring Tools"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Price (USD)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm((p) => ({ ...p, price: Number(e.target.value) }))}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-200"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Stock</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm((p) => ({ ...p, stock: Number(e.target.value) }))}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-200"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Seller</label>
                  <input
                    value={form.seller}
                    onChange={(e) => setForm((p) => ({ ...p, seller: e.target.value }))}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-200"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-200"
                  >
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">Image</label>
                  {/* ✅ red rim like you asked */}
                  <div className="mt-2 rounded-xl border-2 border-red-500 p-2">
                    <div className="h-40 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
                      {form.image ? (
                        <img src={form.image} alt="preview" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-400 text-sm">No image</span>
                      )}
                    </div>
                  </div>

                  <input type="file" accept="image/*" onChange={onPickImage} className="mt-3 w-full text-sm" />
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={addItem}
                  className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white shadow"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
