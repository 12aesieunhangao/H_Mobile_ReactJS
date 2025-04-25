'use client';

import { Product } from "./productInterface";
import { useCart } from "../state/CartContext";

export default function ProductItem({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    window.location.href = '/cart';
  };

  return (
    <div
      key={product.id}
      className="w-[20vw] bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
    >
       <a href={`http://localhost:3001/products/${product.id}`}>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover border-b-4 border-[#3399FF] rounded-lg"
      />
      </a>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
        {/* <p className="text-gray-500 my-2">{product.description}</p> */}
        <p className="text-[#ffa600] font-bold text-lg">
          {product.price.toLocaleString("vi-VN")} đ
        </p>
        <div className="flex flex-col space-y-2 mt-4">
          <button
            onClick={handleAddToCart}
            className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-all"
          >
            Thêm vào giỏ
          </button>
          <button
            onClick={handleBuyNow}
            className="w-full bg-[#3399FF] text-white py-2 rounded-lg hover:bg-white hover:text-[#3399FF] hover:border-2 hover:border-[#3399FF] transition-all"
          >
            Đặt mua
          </button>
        </div>
      </div>
    </div>
  );
}