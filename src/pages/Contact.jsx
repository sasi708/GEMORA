import { PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

import showmyImage from "../assets/showmy.jpg";
import PasinduImage from "../assets/Pasindu.jpg";
import banukaImage from "../assets/banuka.jpg";
import kirellaImage from "../assets/kirella.jpg";
import DasanImage from "../assets/Dasan.jpg";

export default function Contact() {
  const founders = [
    {
      name: "R.F. Showmy",
      phone: "0759919192",
      email: "showmyfathima1204@gmail.com",
      image: showmyImage,
    },
    {
      name: "K.M.P. Mihikalpa",
      phone: "0740915987",
      email: "pasindu86@gmail.com",
      image: PasinduImage,
    },
    {
      name: "W.S. Banuka Kumara",
      phone: "0718965741",
      email: "sasindu013@gmail.com",
      image: banukaImage,
    },
    {
      name: "K.R.B.M.R.A.B. Kiriella",
      phone: "0710610969",
      email: "avishkabandara119@gmail.com",
      image: kirellaImage,
    },
    {
      name: "D.D.M. Dassanayaka",
      phone: "0712575781",
      email: "dasan12@gmail.com",
      image: DasanImage,
    },
  ];

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
            <h1 className="text-5xl font-bold mb-4">Contact Details</h1>
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

      {/* FOUNDERS SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-10">
          Founders of <span className="text-yellow-500">GEMORA</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {founders.map((founder, index) => (
            <div key={index} className="text-center">
              <img
                src={founder.image}
                alt={founder.name}
                className="mx-auto mb-4 h-32 w-32 rounded-full object-cover border-4 border-yellow-500 shadow-lg"
              />

              <h3 className="font-semibold text-lg">{founder.name}</h3>

              <div className="mt-2 text-sm space-y-1">
                <div className="flex justify-center items-center gap-2">
                  <PhoneIcon className="h-4 w-4 text-yellow-500" />
                  <a href={`tel:${founder.phone}`} className="hover:text-yellow-500">
                    {founder.phone}
                  </a>
                </div>

                <a
                  href={`mailto:${founder.email}`}
                  className="block hover:text-yellow-500"
                >
                  {founder.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
