import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function AddGem() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [formData, setFormData] = useState({
    name: "", carat: "", clarity: "", origin: "", price: "", description: ""
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();

    // Append text fields
    data.append("name", formData.name);
    data.append("carat", parseInt(formData.carat));
    data.append("phoneNumber", formData.phoneNumber);
    data.append("description", formData.description);
    data.append("clarity", formData.clarity);
    data.append("origin", formData.origin);

    // Append multiple files
    selectedFiles.forEach((file) => {
      data.append("images", file);
    });

    setLoading(true);
    try {
      await API.post("/gems", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Gem uploaded to Cloudinary and saved!");
      navigate("/market");
    } catch (err) {
      console.error("Error response:", err.response?.data);
      alert(err.response?.data?.message || "Check console for errors");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/gems/sell-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <h1 className="text-4xl font-bold text-yellow-500">
            Sell your gem now...
          </h1>
          <p className="mt-2 max-w-xl text-sm text-gray-200">
            Reach global buyers by listing your precious gemstones on GEMORA.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-12 gap-12">
            {/* LEFT - Form Fields */}
            <div className="col-span-12 md:col-span-5 space-y-5">
              <div>
                <label className="mb-1 block text-sm font-medium">Business name</label>
                <input 
                  className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-yellow-400"
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Gem Type</label>
                <input 
                  className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-yellow-400"
                  onChange={e => setFormData({...formData, clarity: e.target.value})} 
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Weight (ct)</label>
                <input 
                  type="number"
                  className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-yellow-400"
                  onChange={e => setFormData({...formData, carat: e.target.value})} 
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Location</label>
                <input 
                  className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-yellow-400"
                  onChange={e => setFormData({...formData, origin: e.target.value})} 
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Contact Number</label>
                <input 
                  type="number"
                  className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-yellow-400"
                  onChange={e => setFormData({...formData, phoneNumber: e.target.value})} 
                  required
                />
              </div>
            </div>

            {/* RIGHT - Upload & Description */}
            <div className="col-span-12 md:col-span-7 space-y-6">
              {/* IMAGE UPLOAD */}
              <div className="rounded-xl border p-6 text-center">
                <p className="mb-4 text-sm font-medium">Upload Gem Photo</p>
                
                <label className="cursor-pointer inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg transition">
                  <span>📤</span>
                  <span>Upload Now</span>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*"
                    className="hidden" 
                    onChange={handleFileChange} 
                  />
                </label>

                {selectedFiles.length > 0 && (
                  <p className="mt-4 text-sm text-green-600 font-medium">
                    ✓ {selectedFiles.length} file(s) selected
                  </p>
                )}
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="mb-2 block text-sm font-medium">Description about gem</label>
                <textarea 
                  className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-yellow-400 min-h-[120px]"
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                />
              </div>

              {/* SUBMIT */}
              <button 
                type="submit"
                disabled={loading} 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-lg font-bold disabled:opacity-60 transition"
              >
                {loading ? "Processing..." : "Publish Now"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
