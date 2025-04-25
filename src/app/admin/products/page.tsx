"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

interface IProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  blogProduct: string;
}

export default function ManageProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    image: "",
    category: "",
    description: "",
    rating: 0,
    blogProduct: "",
  });
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Lấy danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) throw new Error("Không thể lấy danh sách sản phẩm");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Thêm sản phẩm mới
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newProduct, price: Number(newProduct.price), rating: Number(newProduct.rating) }),
      });
      if (!response.ok) throw new Error("Không thể thêm sản phẩm");
      const addedProduct = await response.json();
      setProducts([...products, addedProduct]);
      setNewProduct({
        name: "",
        price: 0,
        image: "",
        category: "",
        description: "",
        rating: 0,
        blogProduct: "",
      });
      alert("Thêm sản phẩm thành công!");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi thêm sản phẩm!");
    } finally {
      setIsLoading(false);
    }
  };

  // Sửa sản phẩm
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct),
      });
      if (!response.ok) throw new Error("Không thể cập nhật sản phẩm");
      const updatedProduct = await response.json();
      setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
      setEditingProduct(null);
      alert("Cập nhật sản phẩm thành công!");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi cập nhật sản phẩm!");
    } finally {
      setIsLoading(false);
    }
  };

  // Xóa sản phẩm
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Không thể xóa sản phẩm");
      setProducts(products.filter((p) => p.id !== id));
      alert("Xóa sản phẩm thành công!");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi xóa sản phẩm!");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto mt-6 px-4">
        <h2 className="text-2xl font-bold text-center text-red-500">
          Bạn cần đăng nhập để truy cập trang này!
        </h2>
        <p className="text-center mt-4">
          <Link href="/login" className="text-[#3399FF] hover:underline">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-6 px-4">
      <h2 className="text-3xl font-bold text-center text-[#3399FF] mb-8">
        Quản Lý Sản Phẩm
      </h2>

      {/* Form thêm sản phẩm */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-[#3399FF] mb-4">
          Thêm Sản Phẩm Mới
        </h3>
        <form onSubmit={handleAddProduct}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Tên sản phẩm"
              className="border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Giá (USD)"
              className="border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
              required
            />
            <input
              type="text"
              placeholder="URL hình ảnh"
              className="border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Danh mục"
              className="border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              required
            />
            <textarea
              placeholder="Mô tả"
              className="col-span-2 border border-[#3399FF] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Đánh giá (1-5)"
              className="border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
              value={newProduct.rating}
              onChange={(e) => setNewProduct({ ...newProduct, rating: Number(e.target.value) })}
              min="1"
              max="5"
              required
            />
            <textarea
              placeholder="Blog sản phẩm"
              className="col-span-2 border border-[#3399FF] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
              value={newProduct.blogProduct}
              onChange={(e) => setNewProduct({ ...newProduct, blogProduct: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-[#3399FF] text-white rounded-full px-4 py-2 hover:bg-[#267acc] transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Thêm Sản Phẩm"}
          </button>
        </form>
      </div>

      {/* Form sửa sản phẩm */}
      {editingProduct && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-[#3399FF] mb-4">
            Sửa Thông Tin Sản Phẩm
          </h3>
          <form onSubmit={handleUpdateProduct}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Tên sản phẩm"
                className="border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Giá (USD)"
                className="border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                }
                required
              />
              <input
                type="text"
                placeholder="URL hình ảnh"
                className="border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
                value={editingProduct.image}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, image: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Danh mục"
                className="border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
                value={editingProduct.category}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, category: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Mô tả"
                className="col-span-2 border border-[#3399FF] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
                value={editingProduct.description}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, description: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Đánh giá (1-5)"
                className="border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
                value={editingProduct.rating}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, rating: Number(e.target.value) })
                }
                min="1"
                max="5"
                required
              />
              <textarea
                placeholder="Blog sản phẩm"
                className="col-span-2 border border-[#3399FF] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
                value={editingProduct.blogProduct}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, blogProduct: e.target.value })
                }
                required
              />
            </div>
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="w-full bg-[#3399FF] text-white rounded-full px-4 py-2 hover:bg-[#267acc] transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Đang xử lý..." : "Cập Nhật"}
              </button>
              <button
                type="button"
                className="w-full bg-gray-500 text-white rounded-full px-4 py-2 hover:bg-gray-600 transition-colors"
                onClick={() => setEditingProduct(null)}
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Danh sách sản phẩm */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold text-[#3399FF] mb-4">
          Danh Sách Sản Phẩm
        </h3>
        {isLoading ? (
          <p className="text-center text-gray-600">Đang tải...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600">Không có sản phẩm nào.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100"><th className="border px-4 py-2 text-left">Tên Sản Phẩm</th><th className="border px-4 py-2 text-left">Giá (USD)</th><th className="border px-4 py-2 text-left">Danh Mục</th><th className="border px-4 py-2 text-left">Hành Động</th></tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="border px-4 py-2">{product.name}</td>
                    <td className="border px-4 py-2">{product.price}</td>
                    <td className="border px-4 py-2">{product.category}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="bg-[#3399FF] text-white px-3 py-1 rounded-full mr-2 hover:bg-[#267acc]"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}