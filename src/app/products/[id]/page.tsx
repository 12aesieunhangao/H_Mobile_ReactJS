import ProductDetail from "@/app/component/productDetail";

export default async function Home({ params }: { params: { id: string | number } }) {
   const { id } = await params;  // Không cần await ở đây
   const res = await fetch(`http://localhost:3000/products/${id}`);
   const data = await res.json();

   console.log(data); // Log dữ liệu ra console để kiểm tra

   return (
      <div className="mt-12">
         {/* <h1>Sản phẩm có id: {id}</h1> */}
         <ProductDetail product={data} />
      </div>
   );
}
