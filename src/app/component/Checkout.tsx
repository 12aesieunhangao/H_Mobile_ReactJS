'use client';

import { useCart } from '../state/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [invoice, setInvoice] = useState<any>(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const generateInvoiceId = () => {
    return `INV${Math.floor(100000 + Math.random() * 900000)}`; // ID ngẫu nhiên
  };

  const handleCheckout = async () => {
    const invoiceData = {
      id: generateInvoiceId(),
      date: new Date().toISOString(),
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
    };

    // Gửi hóa đơn đến API
    try {
      const response = await fetch('http://localhost:3000/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });
      if (!response.ok) {
        throw new Error('Lỗi khi lưu hóa đơn');
      }
      setInvoice(invoiceData);
      alert('Đặt hàng thành công! Hóa đơn đã được lưu.');
      clearCart();
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi lưu hóa đơn.');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Thanh toán</h1>
      {cart.length === 0 && !invoice ? (
        <p className="text-center text-gray-600 text-lg">Giỏ hàng của bạn đang trống.</p>
      ) : !invoice ? (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Tóm tắt đơn hàng</h2>
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-200 py-3"
              >
                <span className="text-gray-800">
                  {item.name} x {item.quantity}
                </span>
                <span className="text-gray-800 font-semibold">
                  {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-bold text-gray-800">
              Tổng cộng: {total.toLocaleString('vi-VN')} đ
            </p>
            <button
              onClick={handleCheckout}
              className="px-6 py-3 bg-[#3399FF] text-white rounded-md text-base font-semibold hover:bg-white hover:text-[#3399FF] border border-[#3399FF] transition-all"
            >
              Xác nhận đặt hàng
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Hóa đơn của bạn</h2>
          <div className="space-y-3">
            <p><strong>Mã hóa đơn:</strong> {invoice.id}</p>
            <p><strong>Ngày:</strong> {new Date(invoice.date).toLocaleString('vi-VN')}</p>
            <h3 className="text-lg font-semibold text-gray-800">Danh sách sản phẩm:</h3>
            {invoice.items.map((item: any, index: number) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-200 py-3"
              >
                <span className="text-gray-800">
                  {index + 1}. {item.name} x {item.quantity}
                </span>
                <span className="text-gray-800 font-semibold">
                  {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                </span>
              </div>
            ))}
            <p className="text-xl font-bold text-gray-800 mt-4">
              Tổng cộng: {invoice.total.toLocaleString('vi-VN')} đ
            </p>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md text-base font-semibold hover:bg-gray-300 transition-all"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}