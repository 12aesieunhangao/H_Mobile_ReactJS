'use client';

import { useCart } from '../state/CartContext';
import Link from 'next/link';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Giỏ hàng</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center border-b border-gray-200 py-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-600">{item.price.toLocaleString("vi-VN")} đ</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-all"
                    >
                      -
                    </button>
                    <span className="text-gray-800 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-all"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 font-medium ml-4"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
                <p className="text-gray-800 font-semibold">
                  {(item.price * item.quantity).toLocaleString("vi-VN")} đ
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-bold text-gray-800">
              Tổng cộng: {total.toLocaleString("vi-VN")} đ
            </p>
            <Link href="/checkout">
              <button className="px-6 py-3 bg-[#3399FF] text-white rounded-md text-base font-semibold hover:bg-white hover:text-[#3399FF] border border-[#3399FF] transition-all">
                Tiến hành thanh toán
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}