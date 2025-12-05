import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container py-8 text-sm text-gray-600">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <div className="font-semibold">GEMORA</div>
            <p className="max-w-sm">Discover the world's finest gems.</p>
          </div>
          <div className="mt-4 md:mt-0">© {new Date().getFullYear()} GEMORA</div>
        </div>
      </div>
    </footer>
  )
}
