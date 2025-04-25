import { Product } from "./component/productInterface";
import ProductList from "./component/ProductList";

export default async function Home() {
  let hotTitle = "Hot Product";
  let hotProduct: Product[] = await getProduct("http://localhost:3000/products");
  let newTitle = "New Product";
  let newProduct: Product[] = await getProduct("http://localhost:3000/products");

  return (
    <div>
      <main className="container mx-auto mt-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative overflow-hidden rounded-lg">
              <div className="carousel-inner flex transition-transform duration-500">
                <img
                  src="https://www.price.in.th/wp-content/uploads/2019/10/huawei-p30pro.jpg"
                  className="w-full h-96 object-cover"
                  alt=""
                />
              </div>
              <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#3399FF] text-white p-2 rounded-full hover:bg-[#267acc]">
                ❮
              </button>
              <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#3399FF] text-white p-2 rounded-full hover:bg-[#267acc]">
                ❯
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <img
              src="https://img.pikbest.com/origin/09/02/27/61IpIkbEsTsYE.jpg!w700wp"
              className="w-full h-44 object-cover rounded-lg"
              alt=""
            />
            <img
              src="https://img.pikbest.com/origin/09/06/37/125pIkbEsTPm3.jpg!w700wp"
              className="w-full h-44 object-cover rounded-lg"
              alt=""
            />
          </div>
        </div>
        <section className="mt-12">
          <ProductList props={{ products: hotProduct, title: hotTitle }} />
          <ProductList props={{ products: newProduct, title: newTitle }} />
        </section>
      </main>
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
      rating: product.rating,
      blogProduct: product.blogProduct,
    };
  });
  return products;
}