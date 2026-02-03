import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import API from "../api";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from "recharts";
import { Music, Clock, FileText, ShieldCheck } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalTools: 0, pendingTools: 0, totalUsers: 0 });
  const [recentTools, setRecentTools] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data
  const fetchData = async () => {
    try {
      const toolsRes = await API.get("/tools");
      const allTools = toolsRes.data;

      const pendingCount = allTools.filter(t => t.status === 'Pending').length;
      
      let userCount = 0;
      try {
         const usersRes = await API.get("/auth/users");
         userCount = usersRes.data.length;
      } catch (e) {}

      setStats({
        totalTools: allTools.length,
        pendingTools: pendingCount,
        totalUsers: userCount
      });

      // Get recent tools
      setRecentTools(allTools.slice(-5).reverse());

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Status Change
  const handleStatusChange = async (id, newStatus) => {
    if(!confirm(`Mark this tool as ${newStatus}?`)) return;

    try {
      await API.put(`/tools/${id}/status`, { status: newStatus });
      fetchData(); // Refresh data
      alert(`Tool Marked as ${newStatus}!`);
    } catch (error) {
      console.error("❌ Status Update Error:", error.response?.status, error.response?.data || error.message);
      alert(`Failed to update status. Status: ${error.response?.status || 'No response'}. Backend not running on port 5000?`);
    }
  };

  // Charts Data
  const barData = [ { name: "Jan", count: 40 }, { name: "Feb", count: 55 }, { name: "Mar", count: 45 }, { name: "Apr", count: 60 } ];
  const pieData = [
    { name: "Approved", value: stats.totalTools - stats.pendingTools, color: "#10B981" },
    { name: "Pending", value: stats.pendingTools, color: "#F59E0B" },
  ];

  if (loading) return <div className="p-10">Loading Dashboard...</div>;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      
      <div className="flex-1 ml-64 p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-xs text-green-600 font-bold uppercase">● Real Data Active</p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<Music size={24} className="text-blue-500" />} title="Total Tools" value={stats.totalTools} sub="In Database" />
          <StatCard icon={<Clock size={24} className="text-yellow-500" />} title="Pending Tools" value={stats.pendingTools} sub="Needs Approval" />
          <StatCard icon={<FileText size={24} className="text-green-500" />} title="Total Users" value={stats.totalUsers} sub="Registered" />
          <StatCard icon={<ShieldCheck size={24} className="text-purple-500" />} title="Certificates" value="0" sub="Coming Soon" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-4">Activity</h3>
            <div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={barData}><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="count" fill="#F59E0B"/></BarChart></ResponsiveContainer></div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-4">Status</h3>
            <div className="h-64"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={pieData} innerRadius={60} outerRadius={80} dataKey="value">{pieData.map((e, i) => <Cell key={i} fill={e.color}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer></div>
          </div>
        </div>

        {/* Table with Buttons */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-4">Recent Tool Submissions</h3>
            <table className="w-full text-left">
                <thead className="text-gray-400 text-sm border-b">
                    <tr>
                        <th className="pb-3">Name</th>
                        <th className="pb-3">Price</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Action</th> {/* 👈 BUTTON COLUMN */}
                    </tr>
                </thead>
                <tbody className="text-gray-600">
                    {recentTools.map((tool) => (
                      <tr key={tool._id} className="border-b hover:bg-gray-50">
                          <td className="py-3">
                            <div className="font-medium">{tool.name}</div>
                            <div className="text-xs text-gray-400">{tool.brand}</div>
                          </td>
                          <td className="py-3 font-bold">${tool.price}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                                tool.status === 'Approved' ? 'bg-green-100 text-green-600' : 
                                tool.status === 'Rejected' ? 'bg-red-100 text-red-600' : 
                                'bg-yellow-100 text-yellow-600'
                              }`}>
                              {tool.status || 'Pending'}
                            </span>
                          </td>
                          {/* 👈 BUTTONS HERE */}
                          <td className="py-3 flex gap-2">
                            {tool.status !== 'Approved' && (
                              <button onClick={() => handleStatusChange(tool._id, 'Approved')} className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600">
                                ✓ Approve
                              </button>
                            )}
                            {tool.status !== 'Rejected' && (
                              <button onClick={() => handleStatusChange(tool._id, 'Rejected')} className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">
                                ✕ Reject
                              </button>
                            )}
                          </td>
                      </tr>
                    ))}
                </tbody>
            </table>
        </div>

      </div>
    </div>
  );
}

function StatCard({ icon, title, value, sub }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div><p className="text-gray-500 text-sm mb-1">{title}</p><h2 className="text-3xl font-bold text-gray-800">{value}</h2></div>
        <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
      </div>
      <p className="text-xs text-green-500 font-medium">{sub}</p>
    </div>
  );
}