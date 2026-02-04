import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

export default function GemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gem, setGem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  // Form states for the "Order/Contact" flow
  // const [address, setAddress] = useState({ street: "", lane: "", city: "", postalCode: "", country: "" });
  // const [mobile, setMobile] = useState("");

  useEffect(() => {
    const fetchGem = async () => {
      try {
        const res = await API.get("/gems");
        const found = res.data.find((g) => g._id === id);
        setGem(found);
        // Set main image to first image in array or fallback
        if (found) {
          const firstImage = found.images && found.images.length > 0 
            ? found.images[0] 
            : 'https://via.placeholder.com/400';
          setMainImage(firstImage);
          console.log("Gem data:", found); // Debug log
          console.log("Images array:", found.images); // Debug log
        }
      } catch (err) {
        console.error("Error fetching gem details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGem();
  }, [id]);

  if (loading) return <p className="p-10 text-center">Loading Gem Details...</p>;
  if (!gem) return <p className="p-10 text-center">Gem not found</p>;

  // const handleOrder = () => {
  //   const orderData = {
  //     product: gem,
  //     qty: 1,
  //     address,
  //     mobile,
  //     type: "Gem"
  //   };
  //   sessionStorage.setItem("orderData", JSON.stringify(orderData));
  //   navigate("/confirm-order");
  // };

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <Link
        to="/market"
        className="mb-6 inline-block rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-500"
      >
        Back To Market
      </Link>

      <div className="grid grid-cols-12 gap-10">
        {/* IMAGE GALLERY */}
        <div className="col-span-12 md:col-span-5">
          {/* Main Image */}
          <img
            src={mainImage}
            alt={gem.name}
            className="w-full max-w-md rounded-xl object-contain shadow-lg mb-4"
          />
          
          {/* Thumbnails */}
          {gem.images && gem.images.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {gem.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${gem.name} ${i + 1}`}
                  className="w-20 h-20 object-cover cursor-pointer border-2 rounded-lg hover:border-yellow-500 transition"
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* DETAILS & ORDER FORM */}
        <div className="col-span-12 md:col-span-7 space-y-6">
          {/* GEM INFO */}
          <div>
            <h1 className="text-3xl font-bold">{gem.name}</h1>
            <p className="text-2xl text-orange-600 font-bold mt-2">
{gem.price?.toLocaleString()}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm bg-white p-4 rounded-lg border">
              <p>
                <b>Carat:</b> {gem.carat} ct
              </p>
              <p>
                <b>Clarity:</b> {gem.clarity}
              </p>
              <p>
                <b>Origin:</b> {gem.origin}
              </p>
              <p>
                <b>Stock:</b> {gem.countInStock}
              </p>
              <p>
                <b>Mobile Number:</b> {gem.phoneNumber || gem.seller?.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
