import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("auth_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    const u = { name: "User", email };
    setUser(u);
    localStorage.setItem("auth_user", JSON.stringify(u));
    localStorage.setItem("auth_token", "mock_jwt_token");
    toast({ title: "Welcome back!", description: "You've logged in successfully." });
  };

  const signup = async (name: string, email: string, phone: string, password: string) => {
    await new Promise((r) => setTimeout(r, 1200));
    const u = { name, email };
    setUser(u);
    localStorage.setItem("auth_user", JSON.stringify(u));
    localStorage.setItem("auth_token", "mock_jwt_token");
    toast({ title: "Account created!", description: "Welcome to Vikash Telecom." });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_token");
    toast({ title: "Logged out", description: "See you soon!" });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
