import { useMemo, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { Search, QrCode, Upload, Eye } from "lucide-react";

const MOCK_HISTORY = [
  { id: "GEM-2026-001234", checkedBy: "Admin", dateTime: "2026-01-31 14:30", result: "Valid" },
  { id: "GEM-2026-001233", checkedBy: "Admin", dateTime: "2026-01-31 13:15", result: "Pending" },
  { id: "GEM-2026-001232", checkedBy: "Moderator", dateTime: "2026-01-31 11:45", result: "Invalid" },
  { id: "GEM-2026-001231", checkedBy: "Admin", dateTime: "2026-01-30 16:20", result: "Valid" },
  { id: "GEM-2026-001230", checkedBy: "Admin", dateTime: "2026-01-30 10:00", result: "Expired" },
];

function Badge({ value }) {
  const styles = {
    Valid: "bg-green-100 text-green-700 border-green-200",
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Invalid: "bg-red-100 text-red-700 border-red-200",
    Expired: "bg-orange-100 text-orange-700 border-orange-200",
  };
  return (
    <span className={`px-3 py-1 text-xs rounded-full border ${styles[value] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
      {value}
    </span>
  );
}

export default function AdminCertificates() {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState(MOCK_HISTORY);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return history;
    return history.filter((x) => x.id.toLowerCase().includes(q));
  }, [history, query]);

  const onSearch = () => {
    // demo: just filter table by query
    if (!query.trim()) return;
  };

  const onUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    alert(`Uploaded: ${file.name} (demo only)`);
    e.target.value = "";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="ml-64">
        {/* Top Header */}
        <div className="h-16 bg-white border-b flex items-center justify-between px-6">
          <div className="font-semibold text-lg">Certificates</div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                placeholder="Search..."
                className="w-72 border rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-200"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600">
              AD
            </div>
            <span className="text-sm">Admin</span>
            <span className="text-gray-400 text-sm">▾</span>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto p-6">
          <h2 className="text-2xl font-bold">Certificate Validation</h2>
          <p className="text-sm text-gray-500 mt-1">Verify and validate gem certificates</p>

          {/* Search Card */}
          <div className="mt-6 bg-white border rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold">Search Certificate</h3>

            <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
              {/* input */}
              <div className="lg:col-span-2">
                <label className="text-sm font-semibold">Certificate ID</label>
                <div className="relative mt-2">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter certificate ID (e.g., GEM-2026-001234)"
                    className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-200"
                  />
                </div>
              </div>

              {/* actions */}
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={onSearch}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>

                <button className="border px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
                  <QrCode className="w-4 h-4" />
                  Scan QR
                </button>

                <label className="border px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  Upload
                  <input type="file" className="hidden" onChange={onUpload} />
                </label>
              </div>
            </div>
          </div>

          {/* History Table */}
          <div className="mt-6 bg-white border rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold">Certificate Verification History</h3>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-gray-600">
                  <tr className="border-b">
                    <th className="text-left font-semibold py-3 px-3">Certificate ID</th>
                    <th className="text-left font-semibold py-3 px-3">Checked By</th>
                    <th className="text-left font-semibold py-3 px-3">Date & Time</th>
                    <th className="text-left font-semibold py-3 px-3">Result</th>
                    <th className="text-left font-semibold py-3 px-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((row) => (
                    <tr key={row.id} className="border-b last:border-b-0">
                      <td className="py-4 px-3 font-medium">{row.id}</td>
                      <td className="py-4 px-3">{row.checkedBy}</td>
                      <td className="py-4 px-3 text-gray-600">{row.dateTime}</td>
                      <td className="py-4 px-3">
                        <Badge value={row.result} />
                      </td>
                      <td className="py-4 px-3">
                        <button
                          className="p-2 rounded-lg hover:bg-gray-50"
                          title="View"
                          onClick={() => alert(`View ${row.id} (demo)`)}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 && (
                    <tr>
                      <td className="py-6 px-3 text-gray-500" colSpan={5}>
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
