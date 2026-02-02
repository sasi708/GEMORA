import React, { useEffect, useMemo, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { newsSeed } from "../data/newsSeed";

const LS_KEY = "admin_news_posts_v1";
const STATUS = ["All", "Published", "Draft", "Archived"];

function uid() {
  return "n_" + Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function AdminNews() {
  const [posts, setPosts] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "Admin",
    date: todayISO(),
    status: "Published",
    tags: "",
    image: "", // dataURL or public path
  });

  // Load localStorage or seed
  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      try {
        setPosts(JSON.parse(raw));
        return;
      } catch {
        // ignore and seed
      }
    }
    localStorage.setItem(LS_KEY, JSON.stringify(newsSeed));
    setPosts(newsSeed);
  }, []);

  // Persist
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(posts));
  }, [posts]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return posts
      .filter((p) => (status === "All" ? true : p.status === status))
      .filter((p) => {
        if (!query) return true;
        const hay = `${p.title} ${p.excerpt} ${p.author} ${(p.tags || []).join(" ")}`.toLowerCase();
        return hay.includes(query);
      });
  }, [posts, q, status]);

  const openCreate = () => {
    setEditing(null);
    setForm({
      title: "",
      excerpt: "",
      content: "",
      author: "Admin",
      date: todayISO(),
      status: "Published",
      tags: "",
      image: "",
    });
    setModalOpen(true);
  };

  const openEdit = (post) => {
    setEditing(post);
    setForm({
      title: post.title || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
      author: post.author || "Admin",
      date: post.date || todayISO(),
      status: post.status || "Draft",
      tags: (post.tags || []).join(", "),
      image: post.image || "",
    });
    setModalOpen(true);
  };

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onPickImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Upload image => preview + save as base64
    const reader = new FileReader();
    reader.onload = () => setForm((p) => ({ ...p, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const savePost = () => {
    if (!form.title.trim()) return alert("Title is required");
    if (!form.excerpt.trim()) return alert("Short description is required");

    const payload = {
      id: editing?.id || uid(),
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      author: form.author.trim() || "Admin",
      date: form.date || todayISO(),
      status: form.status,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      image: form.image || "",
    };

    if (editing) {
      setPosts((prev) => prev.map((p) => (p.id === editing.id ? payload : p)));
    } else {
      setPosts((prev) => [payload, ...prev]);
    }
    setModalOpen(false);
  };

  const removePost = (id) => {
    if (!confirm("Delete this news post?")) return;
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const badgeClass = (s) => {
    if (s === "Published") return "bg-blue-100 text-blue-700 border-blue-200";
    if (s === "Draft") return "bg-gray-100 text-gray-700 border-gray-200";
    return "bg-yellow-100 text-yellow-700 border-yellow-200";
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">News Management</h1>
          <p className="text-sm text-gray-500 mt-1">{filtered.length} posts found</p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow"
        >
          <span className="text-lg leading-none">＋</span>
          Add News Post
        </button>
      </div>

      {/* Filters */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search news posts..."
                className="w-full border border-gray-200 rounded-lg px-10 py-2 outline-none focus:ring-2 focus:ring-orange-200"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔎</span>
            </div>
          </div>
          <div className="md:w-56">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-200"
            >
              {STATUS.map((s) => (
                <option key={s} value={s}>
                  {s === "All" ? "All Status" : s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left font-semibold px-5 py-3">Post</th>
                <th className="text-left font-semibold px-5 py-3">Author</th>
                <th className="text-left font-semibold px-5 py-3">Date</th>
                <th className="text-left font-semibold px-5 py-3">Status</th>
                <th className="text-left font-semibold px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-gray-100">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-100">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.title}
                            className="h-full w-full object-cover"
                            onError={(e) => (e.currentTarget.style.display = "none")}
                          />
                        ) : null}
                      </div>

                      <div>
                        <div className="font-semibold text-gray-900">{p.title}</div>
                        <div className="text-gray-500 line-clamp-1">{p.excerpt}</div>

                        <div className="mt-1 flex flex-wrap gap-2">
                          {(p.tags || []).slice(0, 4).map((t) => (
                            <span
                              key={t}
                              className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-gray-700">{p.author}</td>
                  <td className="px-5 py-4 text-gray-700">{p.date}</td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium ${badgeClass(
                        p.status
                      )}`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3 text-lg">
                      <button
                        title="View"
                        className="text-gray-700 hover:text-black"
                        onClick={() => alert("Later: link this to public news details page")}
                      >
                        👁️
                      </button>

                      <button
                        title="Edit"
                        className="text-gray-700 hover:text-black"
                        onClick={() => openEdit(p)}
                      >
                        ✏️
                      </button>

                      <button
                        title="Change status"
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => {
                          const next =
                            p.status === "Published"
                              ? "Draft"
                              : p.status === "Draft"
                              ? "Archived"
                              : "Published";
                          setPosts((prev) =>
                            prev.map((x) => (x.id === p.id ? { ...x, status: next } : x))
                          );
                        }}
                      >
                        🌐
                      </button>

                      <button
                        title="Delete"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => removePost(p.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!filtered.length ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-gray-500">
                    No posts found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold">{editing ? "Edit News Post" : "Add News Post"}</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-black text-xl">
                ✕
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Image */}
              <div>
                <label className="text-sm font-semibold text-gray-700">Post Image</label>

                {/* ✅ RED RIM preview box */}
                <div className="mt-2 rounded-xl border-2 border-red-500 p-2">
                  <div className="aspect-[16/10] rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
                    {form.image ? (
                      <img src={form.image} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-400 text-sm">No image</span>
                    )}
                  </div>
                </div>

                <input type="file" accept="image/*" onChange={onPickImage} className="mt-3 w-full text-sm" />
                <p className="text-xs text-gray-500 mt-2">Upload image එක preview වෙනවා (localStorage save).</p>
              </div>

              {/* Fields */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">Title *</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={onChange}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-200"
                    placeholder="Enter post title"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">Short Description *</label>
                  <textarea
                    name="excerpt"
                    value={form.excerpt}
                    onChange={onChange}
                    rows={2}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-200"
                    placeholder="Small summary (shown in list)"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">Content</label>
                  <textarea
                    name="content"
                    value={form.content}
                    onChange={onChange}
                    rows={5}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-200"
                    placeholder="Full news content..."
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Author</label>
                  <input
                    name="author"
                    value={form.author}
                    onChange={onChange}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-200"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={onChange}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-200"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={onChange}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-200"
                  >
                    <option>Published</option>
                    <option>Draft</option>
                    <option>Archived</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Tags (comma separated)</label>
                  <input
                    name="tags"
                    value={form.tags}
                    onChange={onChange}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-200"
                    placeholder="e.g. Valorant, Patch"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={savePost}
                className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white shadow"
              >
                {editing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
