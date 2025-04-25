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
      className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform  w-full max-w-[300px]"
    >
      <a href={`http://localhost:3001/products/${product.id}`} className="block w-full aspect-[4/5] overflow-hidden bg-white">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </a>
      <div className="p-4 text-center flex flex-col justify-between flex-grow">
        <h3 className="text-base font-semibold text-gray-700 line-clamp-2">{product.name}</h3>
        <p className="text-[#ffa600] font-bold text-base mt-2">
          {product.price.toLocaleString("vi-VN")} đ
        </p>
        <div className="flex flex-col space-y-2 mt-3">
          <button
            onClick={handleAddToCart}
            className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-all text-sm"
          >
            Thêm vào giỏ
          </button>
          <button
            onClick={handleBuyNow}
            className="w-full bg-[#3399FF] text-white py-2 rounded-lg hover:bg-white hover:text-[#3399FF] hover:border-2 hover:border-[#3399FF] transition-all text-sm"
          >
            Đặt mua
          </button>
        </div>
      </div>
    </div>
  );
}
