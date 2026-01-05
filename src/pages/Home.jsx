
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";


export default function Home() {
  return (
    <>
      

      <Hero />

      <ProductGrid
        title="Featured Gems"
        items={[
          { name: "Burmese Ruby", image: "/gems/ruby.jpg" },
          { name: "Ceylon Sapphire", image: "/gems/sapphire.jpg" },
          { name: "Emerald Cut Diamond", image: "/gems/emerald-diamond.jpg" },
          { name: "Colombian Emerald", image: "/gems/colombian-emerald.jpg" },
        ]}
      />

      <ProductGrid
        title="Premium Listings"
        items={[
          { name: "Tanzanite Gemstone", image: "/gems/tanzanite.jpg", premium: true },
          { name: "Opal Doublet", image: "/gems/opal.jpg", premium: true },
          { name: "Aquamarine Crystal", image: "/gems/aquamarine.jpg", premium: true },
          { name: "Padparadscha Sapphire", image: "/gems/padparadscha.jpg", premium: true },
        ]}
      />

      
    </>
  );
}
