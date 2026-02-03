import React, { useEffect, useMemo, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import API from "../api";

const STATUS = ["All", "Published", "Draft", "Archived"];

export default function AdminNews() {
  const [posts, setPosts] = useState([]);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Form State
  const [form, setForm] = useState({
    title: "", excerpt: "", content: "", author: "Admin",
    status: "Published", tags: "", imageUrl: ""
  });

  // 1. Fetch News
  const fetchNews = async () => {
    try {
      const res = await API.get("/news");
      setPosts(res.data);
    } catch (err) { console.error("Failed to load news"); }
  };

  useEffect(() => { fetchNews(); }, []);

  // 2. Create News Post
  const savePost = async () => {
    setErrorMsg("");
    if (!form.title.trim()) return setErrorMsg("Title is required");
    if (!form.excerpt.trim()) return setErrorMsg("Excerpt is required");
    if (!form.content.trim()) return setErrorMsg("Content is required");
    
    try {
      setLoading(true);
      // Convert comma-separated tags to array
      const payload = { 
        ...form, 
        tags: form.tags
          ? form.tags.split(",").map(t => t.trim()).filter(Boolean)
          : []
      };
      
      await API.post("/news", payload);
      alert("✅ News Posted!");
      setModalOpen(false);
      fetchNews();
      
      // Reset Form
      setForm({ title: "", excerpt: "", content: "", author: "Admin", status: "Published", tags: "", imageUrl: "" });
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message || err.message || "Failed to save post";
      console.error("Failed to save post:", status, err.response?.data || err.message);
      setErrorMsg(`Failed to save post. ${status ? `Status ${status}. ` : ""}${message}`);
    } finally {
      setLoading(false);
    }
  };

  // 3. Delete Post
  const removePost = async (id) => {
    if (!confirm("Delete this news post?")) return;
    try {
      await API.delete(`/news/${id}`);
      fetchNews();
    } catch (err) { alert("Failed to delete"); }
  };

  // 4. Update Status (Cycle: Published -> Draft -> Archived)
  const cycleStatus = async (post) => {
    const nextStatus = post.status === "Published" ? "Draft" 
                     : post.status === "Draft" ? "Archived" 
                     : "Published";
    try {
      await API.put(`/news/${post._id}/status`, { status: nextStatus });
      fetchNews();
    } catch (err) { alert("Failed to update status"); }
  };

  // Image Handler (Convert to Base64)
  const onPickImage = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setForm({ ...form, imageUrl: reader.result });
      reader.readAsDataURL(file);
    }
  };

  // Filter Logic
  const filtered = useMemo(() => {
    return posts.filter(p => {
      const matchesStatus = statusFilter === "All" || p.status === statusFilter;
      const matchesQuery = p.title.toLowerCase().includes(q.toLowerCase());
      return matchesStatus && matchesQuery;
    });
  }, [posts, q, statusFilter]);

  const badgeClass = (s) => {
    if (s === "Published") return "bg-blue-100 text-blue-700 border-blue-200";
    if (s === "Draft") return "bg-gray-100 text-gray-700 border-gray-200";
    return "bg-yellow-100 text-yellow-700 border-yellow-200";
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">News Management</h1>
          <button onClick={() => setModalOpen(true)} className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600">
            ＋ Add News
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border mb-6 flex gap-4">
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search news..." className="flex-1 border p-2 rounded" />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border p-2 rounded w-48">
            {STATUS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 border-b">
              <tr>
                <th className="p-4">Post</th>
                <th className="p-4">Author</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(post => (
                <tr key={post._id} className="hover:bg-gray-50">
                  <td className="p-4 flex gap-3">
                    <div className="h-12 w-16 bg-gray-100 rounded overflow-hidden">
                      {post.imageUrl && <img src={post.imageUrl} className="h-full w-full object-cover" />}
                    </div>
                    <div>
                      <div className="font-bold">{post.title}</div>
                      <div className="text-xs text-gray-500">{post.excerpt}</div>
                    </div>
                  </td>
                  <td className="p-4">{post.author}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded border font-medium ${badgeClass(post.status)}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-3 text-lg">
                    <button onClick={() => cycleStatus(post)} title="Change Status" className="hover:scale-110 transition">🌐</button>
                    <button onClick={() => removePost(post._id)} title="Delete" className="text-red-500 hover:text-red-700">🗑️</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan="4" className="p-6 text-center text-gray-500">No news found</td></tr>}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden">
              <div className="p-6 border-b flex justify-between">
                <h2 className="text-xl font-bold">New Post</h2>
                <button onClick={() => setModalOpen(false)}>✕</button>
              </div>
              <div className="p-6 grid gap-4">
                {errorMsg && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                    {errorMsg}
                  </div>
                )}
                <input placeholder="Title" className="border p-2 rounded w-full" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                <input placeholder="Short Excerpt" className="border p-2 rounded w-full" value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} />
                <textarea placeholder="Full Content" rows="4" className="border p-2 rounded w-full" value={form.content} onChange={e => setForm({...form, content: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                   <input placeholder="Author" className="border p-2 rounded" value={form.author} onChange={e => setForm({...form, author: e.target.value})} />
                   <input placeholder="Tags (comma separated)" className="border p-2 rounded" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Upload Image</label>
                  <input type="file" onChange={onPickImage} className="text-sm" />
                </div>
              </div>
              <div className="p-6 border-t flex justify-end gap-3">
                <button onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button onClick={savePost} disabled={loading} className="px-4 py-2 bg-orange-500 text-white rounded shadow">
                  {loading ? "Saving..." : "Publish Post"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}