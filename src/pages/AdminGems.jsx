import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import API from "../api";

export default function AdminGems() {
  const [gems, setGems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected

  const fetchGems = async () => {
    try {
      const res = await API.get("/gems");
      setGems(res.data);
    } catch (error) {
      console.error("Failed to fetch gems:", error);
      alert("Failed to load gems");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGems();
  }, []);

  const handleStatusUpdate = async (gemId, newStatus) => {
    try {
      await API.put(`/gems/${gemId}/status`, { status: newStatus });
      alert(`Gem ${newStatus.toLowerCase()} successfully!`);
      fetchGems(); // Refresh list
    } catch (error) {
      console.error("Error updating gem status:", error);
      alert(error.response?.data?.message || "Failed to update gem status");
    }
  };

  const filteredGems = gems.filter((gem) => {
    if (filter === "all") return true;
    return (gem.status || "Pending").toLowerCase() === filter;
  });

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 ml-64 p-8 text-center">Loading gems...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Gems</h1>
          <div className="flex gap-2">
            {["all", "pending", "approved", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded capitalize transition ${
                  filter === status
                    ? "bg-yellow-500 text-black font-bold"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Gem Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Seller</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Carat</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No gems found
                  </td>
                </tr>
              ) : (
                filteredGems.map((gem) => (
                  <tr key={gem._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={gem.images?.[0] || "https://via.placeholder.com/50"}
                          alt={gem.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <span className="font-medium">{gem.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {gem.seller?.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-orange-600">
{gem.price?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm">{gem.carat} ct</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          (gem.status || "Pending") === "Approved"
                            ? "bg-green-100 text-green-800"
                            : (gem.status || "Pending") === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {gem.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {(gem.status || "Pending") !== "Approved" && (
                          <button
                            onClick={() => handleStatusUpdate(gem._id, "Approved")}
                            className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition"
                          >
                            ✓ Approve
                          </button>
                        )}
                        {(gem.status || "Pending") !== "Rejected" && (
                          <button
                            onClick={() => handleStatusUpdate(gem._id, "Rejected")}
                            className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
                          >
                            ✕ Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-yellow-100 rounded-lg p-6 text-center">
            <p className="text-3xl font-bold text-yellow-800">
              {gems.filter((g) => (g.status || "Pending") === "Pending").length}
            </p>
            <p className="text-sm text-yellow-700 mt-1">Pending Approval</p>
          </div>
          <div className="bg-green-100 rounded-lg p-6 text-center">
            <p className="text-3xl font-bold text-green-800">
              {gems.filter((g) => g.status === "Approved").length}
            </p>
            <p className="text-sm text-green-700 mt-1">Approved</p>
          </div>
          <div className="bg-red-100 rounded-lg p-6 text-center">
            <p className="text-3xl font-bold text-red-800">
              {gems.filter((g) => g.status === "Rejected").length}
            </p>
            <p className="text-sm text-red-700 mt-1">Rejected</p>
          </div>
        </div>
      </div>
    </div>
  );
}
