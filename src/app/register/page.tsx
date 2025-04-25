"use client";

import { useState, useEffect } from "react";
import { useRegister } from "../context/RegisterContext";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false); // Trạng thái kiểm tra form
  const { error, isLoading, register } = useRegister();

  // Kiểm tra form hợp lệ mỗi khi các input thay đổi
  useEffect(() => {
    const isValid =
      fullName.trim() !== "" &&
      email.trim() !== "" &&
      phone.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      avatar !== null;
    setIsFormValid(isValid);
  }, [fullName, email, phone, password, confirmPassword, avatar]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return; // Đảm bảo form hợp lệ trước khi submit

    try {
      let avatarBase64 = null;
      if (avatar) {
        avatarBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(avatar);
        });
      }

      await register(
        { name: fullName, email, phone, password, avatar: avatarBase64 },
        confirmPassword
      );
    } catch (err) {
      // Lỗi đã được xử lý trong RegisterContext
    }
  };

  return (
    <main className="container mx-auto mt-6 px-4">
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-[#3399FF] mb-6">
            Đăng Ký Tài Khoản
          </h2>
          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="fullName">
                Họ và tên
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Nhập họ và tên"
                className="w-full border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
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
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Nhập số điện thoại"
                className="w-full border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="avatar">
                Ảnh đại diện
              </label>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                className="w-full border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
                onChange={handleAvatarChange}
                required
              />
              {avatarPreview && (
                <div className="mt-2">
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="w-20 h-20 rounded-full mx-auto"
                  />
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                placeholder="Nhập mật khẩu"
                className="w-full border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="confirmPassword">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                className="w-full border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full rounded-full px-4 py-2 transition-colors ${
                isFormValid && !isLoading
                  ? "bg-[#3399FF] text-white hover:bg-[#267acc]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? "Đang đăng ký..." : "Đăng Ký"}
            </button>
          </form>
          <p className="text-center text-gray-700 mt-4">
            Đã có tài khoản?{" "}
            <a href="/login" className="text-[#3399FF] hover:underline">
              Đăng nhập ngay
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}