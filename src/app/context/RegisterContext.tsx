"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

export interface IRegisterUser {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface RegisterContextType {
  error: string;
  isLoading: boolean;
  register: (user: IRegisterUser, confirmPassword: string) => Promise<void>;
}

const RegisterContext = createContext<RegisterContextType | undefined>(undefined);

export const useRegister = (): RegisterContextType => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error("useRegister phải được sử dụng bên trong RegisterProvider");
  }
  return context;
};

export const RegisterProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const register = async (user: IRegisterUser, confirmPassword: string): Promise<void> => {
    setIsLoading(true);
    setError("");

    // Kiểm tra mật khẩu xác nhận
    if (user.password !== confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp!");
      setIsLoading(false);
      throw new Error("Mật khẩu không khớp");
    }

    try {
      // Kiểm tra xem email đã tồn tại chưa
      const usersResponse = await fetch("http://localhost:3000/users");
      if (!usersResponse.ok) {
        throw new Error("Không thể lấy danh sách người dùng");
      }
      const users = await usersResponse.json();
      const emailExists = users.some((u: any) => u.email === user.email);

      if (emailExists) {
        setError("Email đã được sử dụng!");
        setIsLoading(false);
        throw new Error("Email đã tồn tại");
      }

      // Gửi yêu cầu POST để thêm người dùng mới
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Đăng ký thất bại!");
      }

      alert("Đăng ký thành công!");
      router.push("/login"); // Chuyển hướng đến trang đăng nhập
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra khi đăng ký!");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegisterContext.Provider value={{ error, isLoading, register }}>
      {children}
    </RegisterContext.Provider>
  );
};