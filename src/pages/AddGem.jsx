import React, { useState } from "react";
import API from "../api";

export default function AddGem() {
  const [formData, setFormData] = useState({
    name: "",
    carat: "",
    clarity: "",
    origin: "",
    price: "",
    countInStock: 1,
    imageUrl: "",
    description: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/gems", formData);
      alert("Gem listed successfully!");
      // Reset form
      setFormData({
        name: "",
        carat: "",
        clarity: "",
        origin: "",
        price: "",
        countInStock: 1,
        imageUrl: "",
        description: ""
      });
    } catch (err) {
      alert("Error listing gem: " + err.response?.data?.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-10 bg-white shadow-md rounded-xl my-10">
      <h2 className="text-2xl font-bold mb-6">List Your Gemstone</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Gem Name"
          className="w-full border p-3 rounded"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Carat"
            className="border p-3 rounded"
            value={formData.carat}
            onChange={(e) => setFormData({ ...formData, carat: e.target.value })}
            required
          />
          <input
            placeholder="Clarity"
            className="border p-3 rounded"
            value={formData.clarity}
            onChange={(e) => setFormData({ ...formData, clarity: e.target.value })}
          />
        </div>
        <input
          placeholder="Origin"
          className="w-full border p-3 rounded"
          value={formData.origin}
          onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
        />
        <input
          placeholder="Image URL"
          className="w-full border p-3 rounded"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price (LKR)"
          className="w-full border p-3 rounded"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Count In Stock"
          className="w-full border p-3 rounded"
          value={formData.countInStock}
          onChange={(e) => setFormData({ ...formData, countInStock: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="w-full border p-3 rounded"
          rows="4"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        ></textarea>
        <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition">
          List Gem
        </button>
      </form>
    </div>
  );
}
