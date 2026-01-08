import React from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import showmyImage from '../assets/showmy.jpg';
import PasinduImage from '../assets/Pasindu.jpg';
import banukaImage from '../assets/banuka.jpg';
import kirellaImage from '../assets/kirella.jpg';
import DasanImage from '../assets/Dasan.jpg';

export default function Contact() {
  const founders = [
    {
      name: "R.F.Showmy",
      phone: "0759919192",
      email: "showmyfathima1204@gmail.com",
      image: showmyImage
    },
    {
      name: "K.M.P.Mihikalpa",
      phone: "0740915987",
      email: "pasindu86@gmail.com",
      image: PasinduImage
    },
    {
      name: "W.S.Banuka Kumara",
      phone: "0718965741",
      email: "sasindu013@gmail.com",
      image: banukaImage
    },
    {
      name: "K.R.B.M.R.A.B.Kiriella",
      phone: "0710610969",
      email: "avishkabandara119@gmail.com",
      image: kirellaImage
    },
    {
      name: "D.D.M.Dassanayaka",
      phone: "0712575781",
      email: "dasan12@gmail.com",
      image: DasanImage
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative h-96 bg-cover bg-center" style={{backgroundImage: "url('https://empathizerpk.com/wp-content/uploads/2022/04/Contact-us-Main-Banner-1.jpg')"}}>
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-end justify-start pb-16">
          <div className="text-black text-left">
            <h1 className="text-5xl font-bold mb-7">Contact Details</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Founders Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-left text-gray-900 mb-4">Founders of <span className="text-yellow-500">GEMORA</span></h2>
          
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {founders.map((founder, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4 mx-auto w-32 h-32">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full rounded-full object-cover border-4 border-yellow-500 shadow-lg"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{founder.name}</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center text-sm text-gray-700">
                    <PhoneIcon className="h-4 w-4 mr-2 text-yellow-500" />
                    <a href={`tel:${founder.phone}`} className="hover:text-yellow-500 transition">
                      {founder.phone}
                    </a>
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-700">
                    <a href={`mailto:${founder.email}`} className="hover:text-yellow-500 transition">
                      {founder.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

              </div>
    </div>
  );
}
