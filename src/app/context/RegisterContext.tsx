"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext"; // Import useAuth để gọi login

export interface IRegisterUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  avatar?: string | null;
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
  const { login } = useAuth(); // Sử dụng useAuth để lấy hàm login

  const register = async (user: IRegisterUser, confirmPassword: string): Promise<void> => {
    setIsLoading(true);
    setError("");

    if (user.password !== confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp!");
      setIsLoading(false);
      throw new Error("Mật khẩu không khớp");
    }

    try {
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

      // Sau khi đăng ký thành công, tự động đăng nhập
      const loginResult = await login(user.email, user.password);
      if (loginResult.success) {
        alert("Đăng ký và đăng nhập thành công!");
        if (loginResult.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        throw new Error("Tự động đăng nhập thất bại. Vui lòng đăng nhập thủ công.");
      }
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