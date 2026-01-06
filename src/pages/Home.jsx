import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";

export default function Home() {
  const featuredGems = [
    {
      name: "Burmese Ruby",
      image: "/gems/burmese-ruby.jpg",
      weight: 10.21,
    },
    {
      name: "Ceylon Sapphire",
      image: "/gems/ceylon-sapphire.jpg",
      weight: 5.2,
    },
    {
      name: "Emerald Cut Diamond",
      image: "/gems/emerald-diamond.jpg",
      weight: 7.4,
    },
    {
      name: "Colombian Emerald",
      image: "/gems/colombian-emerald.jpg",
      weight: 8.6,
    },
  ];

  const premiumGems = [
    {
      name: "Tanzanite Gemstone",
      image: "/gems/tanzanite.jpg",
      weight: 12.3,
      premium: true,
    },
    {
      name: "Opal Rainbow",
      image: "/gems/opal.jpg",
      weight: 9.1,
      premium: true,
    },
    {
      name: "Padparadscha Sapphire",
      image: "/gems/padparadscha.jpg",
      weight: 6.8,
      premium: true,
    },
    {
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
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold">
          Featured Gems
        </h2>

        <ProductGrid gems={featuredGems} />
      </section>

      {/* PREMIUM LISTINGS */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold">
          Premium Listings
        </h2>

        <ProductGrid gems={premiumGems} />
      </section>
    </>
  );
}
