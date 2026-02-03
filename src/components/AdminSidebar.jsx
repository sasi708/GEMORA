import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PenTool,
  FileText,
  ShieldCheck,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/")
      ? "bg-orange-100 text-orange-600"
      : "text-gray-600 hover:bg-gray-50";

  return (
    <div className="w-64 h-screen bg-white border-r fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-orange-500 flex items-center gap-2">
          <span className="text-3xl">G</span> GEMORA
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/admin/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(
            "/admin/dashboard"
          )}`}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/admin/instruments"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(
            "/admin/instruments"
          )}`}
        >
          <PenTool size={20} />
          Instruments
        </Link>

        <Link
          to="/admin/news"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(
            "/admin/news"
          )}`}
        >
          <FileText size={20} />
          News
        </Link>

        <Link
          to="/admin/orders"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(
            "/admin/orders"
          )}`}
        >
          <Users size={20} />
          Manage Orders
        </Link>

        {/* ✅ CERTIFICATES */}
        <Link
          to="/admin/certificates"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(
            "/admin/certificates"
          )}`}
        >
          <ShieldCheck size={20} />
          Certificates
        </Link>

        

        {/* ✅ SETTINGS */}
        <Link
          to="/admin/settings"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(
            "/admin/settings"
          )}`}
        >
          <Settings size={20} />
          Settings
        </Link>
      </nav>

      <div className="p-4 border-t">
        <button className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 w-full rounded-lg transition">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}
