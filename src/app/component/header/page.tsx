'use client';

import Link from 'next/link';
import { useCart } from '@/app/state/CartContext';
import { useState, useEffect } from 'react';

export default function Header() {
  const { cart } = useCart();
  const [cartItemCount, setCartItemCount] = useState(0);

  // Cập nhật cartItemCount chỉ trên client
  useEffect(() => {
    setCartItemCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  }, [cart]);

  return (
    <header className="bg-white shadow-md sticky-top">
      <div className="bg-[#3399FF] text-white py-2">
        <div className="container mx-auto flex justify-between items-center flex-wrap gap-4 px-4">
          <div className="flex items-center">
            <img
              src="https://file.hstatic.net/1000402464/file/output-onlinegiftools_9bbbf15c266044699bca3a5635e05246.gif"
              alt=""
              className="w-6 h-6 mr-2"
            />
            <span className="text-sm font-medium uppercase tracking-wide">
              Tour khởi hành hàng tuần - Miễn phí 1 trẻ em
            </span>
          </div>
          <a
            href="tel:0987654321"
            className="flex items-center text-white hover:opacity-80 transition-opacity"
          >
            <i className="bi bi-telephone-fill mr-2"></i>
            <span className="text-sm font-medium">Hotline: 0987654321</span>
          </a>
        </div>
      </div>
      <nav className="container mx-auto py-4 flex justify-between items-center px-4">
        <a href="http://localhost:3001/" className="text-2xl font-bold">
          <span className="text-[#3399FF]">Hoang</span>Mobile
        </a>
        <div className="hidden lg:flex items-center space-x-8">
          <a href="http://localhost:3001/" className="text-gray-700 hover:text-[#3399FF] transition-colors">
            Trang chủ
          </a>
          <a href="/gioithieu" className="text-gray-700 hover:text-[#3399FF] transition-colors">
            Giới thiệu
          </a>
          <a href="/sanpham" className="text-gray-700 hover:text-[#3399FF] transition-colors">
            Sản phẩm
          </a>
          <a href="http://localhost:3001/contact" className="text-gray-700 hover:text-[#3399FF] transition-colors">
            Liên hệ
          </a>
          <a href="http://localhost:3001/login" className="text-gray-700 hover:text-[#3399FF] transition-colors">
            Đăng nhập
          </a>
          <a href="http://localhost:3001/register" className="text-gray-700 hover:text-[#3399FF] transition-colors">
            Đăng ký
          </a>
          <div className="flex items-center space-x-4">
            <input
              type="search"
              placeholder="Nhập tên tour"
              className="border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
            />
            <button className="bg-[#3399FF] text-white rounded-full px-4 py-2 hover:bg-[#267acc] transition-colors">
              Tìm
            </button>
          </div>
          <Link href="/cart" className="relative text-gray-700 hover:text-[#3399FF] transition-colors">
            <i className="bi bi-cart text-2xl"></i>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
        <button className="lg:hidden text-gray-700 focus:outline-none">
          <i className="bi bi-list text-2xl"></i>
        </button>
      </nav>
    </header>
  );
}