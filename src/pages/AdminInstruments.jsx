import React, { useEffect, useMemo, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import API from "../api";

export default function AdminInstruments() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", brand: "", category: "Inspection", price: 0, countInStock: 0, description: "", imageUrl: "" });

  const fetchTools = async () => {
    try {
      const res = await API.get("/tools");
      setItems(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch tools:", error.message);
      alert("Failed to load instruments. Check console.");
    }
  };

  useEffect(() => { fetchTools(); }, []);

  const addItem = async () => {
    // Validation
    if (!form.name.trim()) {
      alert("⚠️ Instrument name is required");
      return;
    }
    if (form.price <= 0) {
      alert("⚠️ Price must be greater than 0");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...form,
        price: Number(form.price),
        countInStock: Number(form.countInStock),
      };
      console.log("📤 Sending instrument:", payload);
      
      await API.post("/tools", payload);
      alert("✅ Instrument added successfully!");
      setOpen(false);
      
      // Reset form
      setForm({ name: "", brand: "", category: "Inspection", price: 0, countInStock: 0, description: "", imageUrl: "" });
      fetchTools();
    } catch (error) {
      console.error("❌ Add instrument error:", error.response?.status, error.response?.data || error.message);
      alert(`❌ Failed to add instrument. ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    alert("Delete not connected yet");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-6">
           <h1 className="text-2xl font-bold">Instruments Inventory</h1>
           <button onClick={() => setOpen(true)} className="bg-orange-500 text-white px-4 py-2 rounded">Add Instrument</button>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
           <table className="w-full text-left">
              <thead>
                 <tr className="border-b text-gray-500"><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Action</th></tr>
              </thead>
              <tbody>
                 {items.map(i => (
                    <tr key={i._id} className="border-b hover:bg-gray-50">
                       <td className="py-3 font-medium">{i.name}</td>
                       <td className="py-3">{i.category}</td>
                       <td className="py-3">${i.price}</td>
                       <td className="py-3">{i.countInStock}</td>
                       <td className="py-3"><button onClick={() => deleteItem(i._id)} className="text-red-500">🗑️</button></td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>

        {open && (
           <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-md">
                 <h2 className="text-lg font-bold mb-4">Add Instrument</h2>
                 
                 <div className="space-y-3">
                    <input 
                       placeholder="Instrument Name *" 
                       value={form.name}
                       onChange={e => setForm({...form, name: e.target.value})} 
                       className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none" 
                    />
                    <input 
                       placeholder="Brand" 
                       value={form.brand}
                       onChange={e => setForm({...form, brand: e.target.value})} 
                       className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none" 
                    />
                    <input 
                       placeholder="Category" 
                       value={form.category}
                       onChange={e => setForm({...form, category: e.target.value})} 
                       className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none" 
                    />
                    <input 
                       placeholder="Price *" 
                       type="number" 
                       value={form.price}
                       onChange={e => setForm({...form, price: e.target.value})} 
                       className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none" 
                    />
                    <input 
                       placeholder="Stock Quantity" 
                       type="number" 
                       value={form.countInStock}
                       onChange={e => setForm({...form, countInStock: e.target.value})} 
                       className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none" 
                    />
                    <input 
                       placeholder="Image URL" 
                       value={form.imageUrl}
                       onChange={e => setForm({...form, imageUrl: e.target.value})} 
                       className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none" 
                    />
                    <textarea 
                       placeholder="Description" 
                       value={form.description}
                       onChange={e => setForm({...form, description: e.target.value})} 
                       className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none" 
                       rows="3"
                    />
                 </div>

                 <div className="flex gap-3 mt-6">
                    <button 
                       onClick={() => setOpen(false)} 
                       className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50"
                    >
                       Cancel
                    </button>
                    <button 
                       onClick={addItem} 
                       disabled={loading}
                       className="flex-1 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                       {loading ? "Saving..." : "Save"}
                    </button>
                 </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
}