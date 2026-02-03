import React, { useState, useEffect } from "react";
import API from "../api";

export default function News() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await API.get("/news");
        setNewsData(res.data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return <p className="p-10 text-center">Loading news...</p>;

  return (
    <div className="mx-auto max-w-7xl px-6 pt-12 pb-32">
      <h1 className="mb-10 text-2xl font-semibold text-yellow-600">
        Updates
      </h1>

      {newsData.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No news available</p>
      ) : (
        <div className="space-y-10">
          {newsData.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-start gap-6 border-b pb-8 last:border-b-0"
            >
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">
                  Dated: {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <h2 className="text-lg font-semibold mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-700">
                  {item.excerpt || item.content?.substring(0, 150) + "..."}
                </p>
              </div>

              <div className="w-full md:w-60">
                <img
                  src={item.imageUrl || "https://via.placeholder.com/400"}
                  alt={item.title}
                  className="h-32 w-full rounded object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
