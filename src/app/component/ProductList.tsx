// component/ProductList.tsx
import { Product } from "./productInterface";
import ProductItem from "./productitem";

export default function ProductList({
  props,
}: {
  props: { products: Product[]; title: string };
}) {
  return (
    <section className="mt-12">
      <h1 className="text-[#3399FF] text-xl font-semibold uppercase tracking-wider mb-8">
        {props.title}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {props.products.map((p: Product) => (
          <ProductItem key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}