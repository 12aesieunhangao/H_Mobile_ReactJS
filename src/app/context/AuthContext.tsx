"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface IUser {
  id?: number | string;
  username: string;
  email?: string;
  password?: string;
  role?: string;
}

export interface AuthContextType {
  user: IUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; role?: string }>;
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

  const login = async (email: string, password: string): Promise<{ success: boolean; role?: string }> => {
    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu từ server");
      }
      const users = await response.json();

      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password // Sửa từ name thành email
      );

      if (foundUser) {
        setUser({
          id: foundUser.id,
          username: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
        });
        return { success: true, role: foundUser.role };
      }
      return { success: false };
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      return { success: false };
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};