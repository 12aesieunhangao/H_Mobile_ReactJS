"use client";

import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, logout, user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await login(email, password);
    if (result.success) {
      alert("Đăng nhập thành công!");
      if (result.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } else {
      alert("Sai email hoặc mật khẩu!");
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (user) {
    return (
      <div className="container mx-auto mt-6 px-4 text-center">
        <h2 className="text-2xl font-bold">Chào {user.email}</h2>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Đăng xuất
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-6 px-4">
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-[#3399FF] mb-6">
            Đăng Nhập
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Nhập email của bạn"
                className="w-full border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="password"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                placeholder="Mật khẩu"
                className="w-full border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#3399FF] text-white rounded-full px-4 py-2 hover:bg-[#267acc] transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>
          <p className="text-center text-gray-700 mt-4">
            Chưa có tài khoản?{" "}
            <a href="/register" className="text-[#3399FF] hover:underline">
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;