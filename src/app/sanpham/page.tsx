import ProductList from "../component/ProductList";
import { Product } from "../component/productInterface";

export default async function AllProductsPage() {
  let allProducts: Product[] = await getProduct("http://localhost:3000/products");

  return (
    <div className="container mx-auto mt-6 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Tất Cả Sản Phẩm</h1>
      
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts.map((product) => (
          <div key={product.id} className="w-[15vw]">
            <ProductList props={{ products: [product], title: "" }} />
          </div>
        ))}
      </section>
    </div>
  );
}

async function getProduct(url: string) {
  let response = await fetch(url);
  let data = await response.json();
  let products: Product[] = data.map((product: any) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
    };
  });
  return products;
}
