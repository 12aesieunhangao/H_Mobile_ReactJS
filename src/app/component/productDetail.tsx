'use client';

import { useState } from "react";
import { Product } from "./productInterface";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { useCart } from "../state/CartContext";

export default function ProductDetail({ product }: { product: Product }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { addToCart } = useCart();

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return (
      <div className="flex items-center text-yellow-500 text-xl">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} />
        ))}
        {hasHalfStar && <FaStarHalfAlt />}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
          <FaRegStar key={index} />
        ))}
        <span className="ml-2 text-gray-600 text-sm">({rating.toFixed(1)}/5)</span>
      </div>
    );
  };

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
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6">
        <div className="relative">
        <a href={`http://localhost:3001/products/${product.id}`}>
            <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg object-cover shadow-md hover:scale-105 transition-transform duration-300"
          />
          </a>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <div className="my-3">{renderStars(product.rating)}</div>
          <p className="text-[#ffa600] font-bold text-2xl">
            {product.price.toLocaleString("vi-VN")} đ
          </p>
          <div className="mt-4 text-gray-600">
            <p>
              {showFullDescription ? product.description : `${product.description.substring(0, 100)}...`}
            </p>
            <button
              className="text-blue-500 mt-2 underline"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? "Thu gọn" : "Xem thêm"}
            </button>
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-semibold hover:bg-gray-300 transition-all"
            >
              Thêm vào giỏ
            </button>
            <button
              onClick={handleBuyNow}
              className="px-4 py-2 bg-[#3399FF] text-white rounded-md text-sm font-semibold hover:bg-white hover:text-[#3399FF] border border-[#3399FF] transition-all"
            >
              Đặt mua ngay
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 text-justify bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800">Bài viết về {product.name}</h3>
        <p className="mt-2 text-gray-700">{product.blogProduct}</p>
      </div>
    </div>
  );
}