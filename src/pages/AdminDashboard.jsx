import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import API from "../api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Music, Clock, FileText, ShieldCheck } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ tools: 0, users: 0 });

  // 1. Fetch Real Data
  useEffect(() => {
    API.get("/tools").then((res) => setStats(prev => ({ ...prev, tools: res.data.length }))).catch(console.error);
    API.get("/users").then((res) => setStats(prev => ({ ...prev, users: res.data.length }))).catch(console.error);
  }, []);

  // 2. Mock Data for Charts (To match your image)
  const barData = [
    { name: "Jan", count: 40 }, { name: "Feb", count: 55 }, { name: "Mar", count: 45 },
    { name: "Apr", count: 60 }, { name: "May", count: 50 }, { name: "Jun", count: 65 },
    { name: "Jul", count: 75 }, { name: "Aug", count: 68 },
  ];
  const pieData = [
    { name: "Valid", value: 77, color: "#10B981" },
    { name: "Pending", value: 15, color: "#F59E0B" },
    { name: "Expired", value: 6, color: "#EF4444" },
    { name: "Invalid", value: 2, color: "#6B7280" },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-700">Admin</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">A</div>
          </div>
        </header>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatCard icon={<Music size={24} className="text-blue-500" />} title="Total Tools" value={stats.tools} sub="+12% from last month" />
          <StatCard icon={<Clock size={24} className="text-yellow-500" />} title="Pending Tools" value="23" sub="+5 from last month" />
          <StatCard icon={<FileText size={24} className="text-green-500" />} title="Total Users" value={stats.users} sub="+8% from last month" />
          <StatCard icon={<ShieldCheck size={24} className="text-purple-500" />} title="Certificates" value="89" sub="-15% from last month" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Bar Chart */}
          <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-4">Tools Added by Month</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#f3f4f6' }} />
                  <Bar dataKey="count" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-4">Certificate Status</h3>
            <div className="h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-gray-700">77%</span>
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-2 text-xs text-gray-500">
               {pieData.map(d => <span key={d.name} className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{backgroundColor: d.color}}></span>{d.name}</span>)}
            </div>
          </div>
        </div>

        {/* Recent Submissions Table */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-4">Recent Tool Submissions</h3>
            <table className="w-full text-left">
                <thead className="text-gray-400 text-sm border-b">
                    <tr>
                        <th className="pb-3">Name</th>
                        <th className="pb-3">Price</th>
                        <th className="pb-3">Status</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600">
                    <tr className="border-b hover:bg-gray-50">
                        <td className="py-3">Fender Stratocaster <br/><span className="text-xs text-gray-400">Electric Guitar</span></td>
                        <td className="py-3 font-bold">$1,299</td>
                        <td className="py-3"><span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded text-xs">Pending</span></td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                        <td className="py-3">Yamaha P-125 <br/><span className="text-xs text-gray-400">Digital Piano</span></td>
                        <td className="py-3 font-bold">$649</td>
                        <td className="py-3"><span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs">Approved</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

// Helper Component for Stats
function StatCard({ icon, title, value, sub }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div>
           <p className="text-gray-500 text-sm mb-1">{title}</p>
           <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
      </div>
      <p className="text-xs text-green-500 font-medium">{sub}</p>
    </div>
  );
}