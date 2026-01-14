import ProductCard from "./ProductCard";

export default function ProductGrid({ title, items }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <h2 className="mb-8 text-center text-2xl font-bold">{title}</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {items.map((item, index) => (
          <ProductCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
}
