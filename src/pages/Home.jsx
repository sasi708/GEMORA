import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";

export default function Home() {
  const featuredGems = [
    {
      id: "burmese-ruby",
      name: "Burmese Ruby",
      image: "/gems/burmese-ruby.jpg",
      weight: 10.21,
    },
    {
      id: "ceylon-sapphire",
      name: "Ceylon Sapphire",
      image: "/gems/ceylon-sapphire.jpg",
      weight: 5.2,
    },
    {
      id: "emerald-diamond",
      name: "Emerald Cut Diamond",
      image: "/gems/emerald-diamond.jpg",
      weight: 7.4,
    },
    {
      id: "colombian-emerald",
      name: "Colombian Emerald",
      image: "/gems/colombian-emerald.jpg",
      weight: 8.6,
    },
  ];

  const premiumGems = [
    {
      id: "tanzanite-premium",
      name: "Tanzanite Gemstone",
      image: "/gems/tanzanite.jpg",
      weight: 12.3,
      premium: true,
    },
    {
      id: "opal-rainbow",
      name: "Opal Rainbow",
      image: "/gems/opal.jpg",
      weight: 9.1,
      premium: true,
    },
    {
      id: "padparadscha",
      name: "Padparadscha Sapphire",
      image: "/gems/padparadscha.jpg",
      weight: 6.8,
      premium: true,
    },
    {
      id: "aquamarine",
      name: "Aquamarine",
      image: "/gems/aquamarine.jpg",
      weight: 11.4,
      premium: true,
    },
  ];

  return (
    <>
      {/* HERO */}
      <Hero />

      {/* FEATURED GEMS */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="mb-8 text-center text-2xl font-bold">
          Featured Gems
        </h2>

        <ProductGrid gems={featuredGems} />
      </section>

      {/* PREMIUM LISTINGS */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="mb-8 text-center text-2xl font-bold">
          Premium Listings
        </h2>

        <ProductGrid gems={premiumGems} />
      </section>
    </>
  );
}
