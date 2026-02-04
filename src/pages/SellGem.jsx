import { useState } from "react";
import API from "../api";

export default function SellGem() {
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    businessName: "",
    gemType: "",
    weight: "",
    location: "",
    contactNumber: "",
    description: "",
    image: null,
  });

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("name", formData.gemType); // assuming name is gemType
      data.append("carat", formData.weight);
      data.append("origin", formData.location);
      data.append("phoneNumber", formData.contactNumber);
      data.append("description", formData.description);
      data.append("seller[name]", formData.businessName);
      data.append("seller[phone]", formData.contactNumber);
      if (formData.image) {
        data.append("images", formData.image);
      }
      // Add other fields as needed, like clarity, countInStock, price
      data.append("clarity", "VVS"); // placeholder
      data.append("countInStock", 1);
      data.append("price", 1000); // placeholder

      await API.post("/gems", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Gem published successfully!");
      // Reset form
      setFormData({
        businessName: "",
        gemType: "",
        weight: "",
        location: "",
        contactNumber: "",
        description: "",
        image: null,
      });
      setPreview(null);
    } catch (err) {
      console.error("Error publishing gem:", err);
      alert("Failed to publish gem.");
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
        <div className="grid grid-cols-12 gap-12">
          {/* LEFT */}
          <div className="col-span-12 md:col-span-5 space-y-5">
            {[
              { label: "Business name", key: "businessName" },
              { label: "Gem Type", key: "gemType" },
              { label: "Weight (ct)", key: "weight" },
              { label: "Location", key: "location" },
              { label: "Contact Number", key: "contactNumber" },
            ].map(({ label, key }) => (
              <div key={label}>
                <label className="mb-1 block text-sm font-medium">
                  {label}
                </label>
                <input
                  className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-yellow-400"
                  value={formData[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                />
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="col-span-12 md:col-span-7 space-y-6">
            {/* IMAGE UPLOAD */}
            <div className="rounded-xl border p-6 text-center">
              <p className="mb-4 text-sm font-medium">
                Upload Gem Photo
              </p>

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mx-auto mb-4 h-40 object-contain rounded"
                />
              )}

              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-yellow-500 px-6 py-2 font-semibold hover:bg-yellow-400">
                Upload Now ⬆️
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFormData({ ...formData, image: file });
                    setPreview(URL.createObjectURL(file));
                  }}
                />
              </label>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Description about gem
              </label>
              <textarea
                rows="5"
                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-yellow-400"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>

            {/* SUBMIT */}
            <button
              onClick={handleSubmit}
              className="w-full rounded-full bg-yellow-600 py-3 font-bold text-white hover:bg-yellow-500 transition"
            >
              Publish Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
