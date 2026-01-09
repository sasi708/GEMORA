import React from "react";

//create news 
const newsData = [
  {
    id: 1,
    date: "Oct 15, 2025",
    title: "Two Mozambique police officers killed by illegal miners at MRM",
    description:
      "Illegal miners attack ekak nisa Montepuez Ruby Mining site eke police officers dedenek maruna.",
    image: "/news/news1.jpg",
  },
  {
    id: 2,
    date: "Oct 06, 2025",
    title: "Auction Results: Mixed-Quality Rubies",
    description:
      "Bangkok ruby auction eka pahasu widihata avasan una atara visala buyers sahabhagithvaya kala.",
    image: "/news/news2.jpg",
  },
  {
    id: 3,
    date: "Sep 30, 2025",
    title:
      "Grant of performance share awards under Long Term Incentive Plan",
    description:
      "Company employees lata Long Term Incentive Plan ekata anuwa performance share awards labala tiyenawa.",
    image: "/news/news3.jpg",
  },
  {
    id: 4,
    date: "Sep 26, 2025",
    title:
      "Reviewed Interim Report for the six months to 30 June 2025",
    description:
      "Gemora company eka 2025 June 30 dakwa months 6 kata adala interim financial report eka publish kala.",
    image: "/news/news4.jpg",
  },
];

export default function News() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-12 pb-32">
      <h1 className="mb-10 text-2xl font-semibold text-yellow-600">
        Updates
      </h1>

      <div className="space-y-10">
        {newsData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-start gap-6 border-b pb-8 last:border-b-0"
          >
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">
                Dated: {item.date}
              </p>
              <h2 className="text-lg font-semibold mb-2">
                {item.title}
              </h2>
              <p className="text-gray-700">
                {item.description}
              </p>
            </div>

            <div className="w-full md:w-60">
              <img
                src={item.image}
                alt={item.title}
                className="h-32 w-full rounded object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
