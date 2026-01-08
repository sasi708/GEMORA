import ProductCard from "./ProductCard";

export default function ProductGrid({ gems = [] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {gems.map((gem) => (
        <ProductCard
          key={gem.id}          // ✅ key should be unique
          id={gem.id}           // ✅ VERY IMPORTANT (detail page link)
          name={gem.name}
          image={gem.image}
          weight={gem.weight}
          premium={gem.premium}
        />
      ))}
    </div>
  );
}
