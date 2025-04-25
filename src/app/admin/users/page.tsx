'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

interface IUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  role?: string;
}

export default function ManageUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState<IUser[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', password: '', role: 'user' });
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Lấy danh sách người dùng
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) throw new Error('Không thể lấy danh sách người dùng');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Thêm người dùng mới
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error('Không thể thêm người dùng');
      const addedUser = await response.json();
      setUsers([...users, addedUser]);
      setNewUser({ name: '', email: '', phone: '', password: '', role: 'user' });
      alert('Thêm người dùng thành công!');
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi thêm người dùng!');
    } finally {
      setIsLoading(false);
    }
  };

  // Sửa người dùng
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingUser),
      });
      if (!response.ok) throw new Error('Không thể cập nhật người dùng');
      const updatedUser = await response.json();
      setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
      setEditingUser(null);
      alert('Cập nhật người dùng thành công!');
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi cập nhật người dùng!');
    } finally {
      setIsLoading(false);
    }
  };

  // Xóa người dùng
  const handleDeleteUser = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa người dùng này?')) return;
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Không thể xóa người dùng');
      setUsers(users.filter((u) => u.id !== id));
      alert('Xóa người dùng thành công!');
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi xóa người dùng!');
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
      <h2 className="text-3xl font-bold text-center text-[#3399FF] mb-8">Quản Lý Người Dùng</h2>

      {/* Form thêm người dùng */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-[#3399FF] mb-4">Thêm Người Dùng Mới</h3>
        <form onSubmit={handleAddUser}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Họ và tên"
              className="border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="Số điện thoại"
              className="border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              className="border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              required
            />
            <select
              className="border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-[#3399FF] text-white rounded-full px-4 py-2 hover:bg-[#267acc] transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Thêm Người Dùng'}
          </button>
        </form>
      </div>

      {/* Form sửa người dùng */}
      {editingUser && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-[#3399FF] mb-4">Sửa Thông Tin Người Dùng</h3>
          <form onSubmit={handleUpdateUser}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Họ và tên"
                className="border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
                value={editingUser.name}
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Số điện thoại"
                className="border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
                value={editingUser.phone || ''}
                onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                className="border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
                value={editingUser.password}
                onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                required
              />
              <select
                className="border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
                value={editingUser.role || 'user'}
                onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="w-full bg-[#3399FF] text-white rounded-full px-4 py-2 hover:bg-[#267acc] transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Đang xử lý...' : 'Cập Nhật'}
              </button>
              <button
                type="button"
                className="w-full bg-gray-500 text-white rounded-full px-4 py-2 hover:bg-gray-600 transition-colors"
                onClick={() => setEditingUser(null)}
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Danh sách người dùng */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold text-[#3399FF] mb-4">Danh Sách Người Dùng</h3>
        {isLoading ? (
          <p className="text-center text-gray-600">Đang tải...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-600">Không có người dùng nào.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Họ và Tên</th>
                  <th className="border px-4 py-2 text-left">Email</th>
                  <th className="border px-4 py-2 text-left">Số Điện Thoại</th>
                  <th className="border px-4 py-2 text-left">Quyền</th>
                  <th className="border px-4 py-2 text-left">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.phone || 'N/A'}</td>
                    <td className="border px-4 py-2">{user.role || 'N/A'}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="bg-[#3399FF] text-white px-3 py-1 rounded-full mr-2 hover:bg-[#267acc]"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
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