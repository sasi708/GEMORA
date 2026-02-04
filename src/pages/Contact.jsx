import { PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://empathizerpk.com/wp-content/uploads/2022/04/Contact-us-Main-Banner-1.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-end pb-16">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-5 w-5" /> Phone
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5" /> Sri Lanka
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">We’re here to help</h2>
            <p className="text-gray-600 mb-8">
              Send us a message and our team will get back to you as soon as possible.
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 text-yellow-500" />
                <a href="tel:+94710000000" className="hover:text-yellow-500">
                  +94 71 000 0000
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPinIcon className="h-5 w-5 text-yellow-500" />
                <span>Colombo, Sri Lanka</span>
              </div>
              <div className="text-gray-500">
                Support hours: Mon–Sat, 9:00 AM – 6:00 PM
              </div>
            </div>
          </div>

          <form className="bg-white rounded-2xl shadow p-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 outline-none"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Subject</label>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 outline-none"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                rows="5"
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 outline-none"
                placeholder="Write your message..."
              />
            </div>

            <button
              type="button"
              className="w-full rounded-lg bg-yellow-500 py-2 text-sm font-semibold text-black hover:bg-yellow-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
