"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface IUser {
  id?: number | string;
  username: string;
  email?: string;
  password?: string;
  role?: string;
  avatar?: string | null; // Thêm trường avatar
}

export interface AuthContextType {
  user: IUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; role?: string; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth phải được sử dụng bên trong AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; role?: string; error?: string }> => {
    try {
      const response = await fetch("http://localhost:3000/users", { signal: AbortSignal.timeout(5000) });
      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu từ server. Vui lòng kiểm tra kết nối.");
      }
      const users = await response.json();

      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (foundUser) {
        const userData: IUser = {
          id: foundUser.id,
          username: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
          avatar: foundUser.avatar, // Lưu avatar
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return { success: true, role: foundUser.role };
      }
      return { success: false, error: "Sai email hoặc mật khẩu." };
    } catch (error: any) {
      console.error("Lỗi khi đăng nhập:", error);
      return { success: false, error: error.message || "Đã có lỗi xảy ra. Vui lòng thử lại sau." };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};