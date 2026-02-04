import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import API from "../api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      // Handle both formats: direct array or nested data array
      const data = Array.isArray(res.data) ? res.data : res.data.orders || res.data.data || [];
      setOrders(data);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `/api/orders/${orderId}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 🔹 Update the local state so the dropdown shows the new value without refreshing
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === orderId ? data : order))
      );
      
      alert("Status updated to " + newStatus);
    } catch (err) {
      console.error("Status update error:", err.response?.data || err.message);
      alert("Failed to update status.");
    }
  };

  const deleteOrder = async (id) => {
    if (window.confirm("Delete this order permanently?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // 🔹 IMPORTANT: Update the UI state
        setOrders(prevOrders => prevOrders.filter(order => order._id !== id));
        
        alert("Order removed.");
      } catch (err) {
        console.error("Delete failed:", err.response?.data || err.message);
        alert("Could not delete order.");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-10">
        <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          {loading && (
            <p className="p-6 text-center text-gray-500">Loading orders...</p>
          )}
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
              <tr>
                <th className="p-4 border-b">Order ID</th>
                <th className="p-4 border-b">Customer</th>
                <th className="p-4 border-b">Total Price</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4 font-mono text-xs">{order._id}</td>
                  <td className="p-4">
                    <p className="font-semibold text-sm">
                      {order.shippingAddress?.mobile || order.customer?.mobile || "—"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.shippingAddress?.city || order.customer?.city || "—"}
                    </p>
                  </td>
                  <td className="p-4 font-bold text-sm">
                    Rs. {Number(order.totalPrice || 0).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <select 
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="text-xs border rounded p-1 outline-none"
                        value={order.status}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => deleteOrder(order._id)}
                        className="text-xs font-semibold text-red-600 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && !loading && (
            <p className="p-10 text-center text-gray-500">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
}