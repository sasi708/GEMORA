import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-4">
        <div>
          <h3 className="font-bold">GemTrade</h3>
          <p className="mt-2 text-sm text-gray-600">
            Your trusted marketplace for precious stones.
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Company</h4>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>About Us</li>
            <li>How It Works</li>
            <li>News</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Support</h4>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>FAQ</li>
            <li>Help Center</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Follow Us</h4>
          <p className="mt-2 text-sm text-gray-600">Social links here</p>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-gray-500">
        © 2024 GemTrade. All rights reserved.
      </p>
    </footer>
  );
}

