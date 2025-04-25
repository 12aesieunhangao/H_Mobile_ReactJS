"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function AdminPage() {
  const { user } = useAuth();

  // Kiểm tra quyền admin (chỉ admin mới truy cập được)
  if (!user || user.role !== "admin") {
    return (
      <div className="container mx-auto mt-6 px-4">
        <h2 className="text-2xl font-bold text-center text-red-500">
          Bạn không có quyền truy cập trang này!
        </h2>
        <p className="text-center mt-4">
          <Link href="/" className="text-[#3399FF] hover:underline">
            Quay lại trang chủ
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-6 px-4">
      <h2 className="text-3xl font-bold text-center text-[#3399FF] mb-8">
        Trang Quản Trị
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/users">
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:bg-gray-100 transition-colors">
            <h3 className="text-xl font-semibold text-[#3399FF]">
              Quản Lý Người Dùng
            </h3>
            <p className="text-gray-600 mt-2">
              Xem, thêm, sửa, xóa thông tin người dùng.
            </p>
          </div>
        </Link>
        <Link href="/admin/products">
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:bg-gray-100 transition-colors">
            <h3 className="text-xl font-semibold text-[#3399FF]">
              Quản Lý Sản Phẩm
            </h3>
            <p className="text-gray-600 mt-2">
              Xem, thêm, sửa, xóa thông tin sản phẩm.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}