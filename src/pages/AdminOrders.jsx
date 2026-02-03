import React, { useEffect, useState } from "react";
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

  const updateStatus = async (id, newStatus) => {
    try {
      await API.put(`/orders/${id}/status`, { status: newStatus });
      alert(`Order updated to ${newStatus}`);
      fetchOrders(); // Refresh the list
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-10">
        <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>

        <div className="bg-white rounded-xl shadow overflow-hidden">
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
                    <p className="font-semibold text-sm">{order.shippingAddress.mobile}</p>
                    <p className="text-xs text-gray-500">{order.shippingAddress.city}</p>
                  </td>
                  <td className="p-4 font-bold text-sm">Rs. {order.totalPrice.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <select 
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="text-xs border rounded p-1 outline-none"
                      defaultValue={order.status}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
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