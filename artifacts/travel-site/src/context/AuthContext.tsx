import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("travel_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("travel_user");
      }
    }
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Demo: accept any credentials
    const stored = localStorage.getItem("travel_user");
    if (stored) {
      const u = JSON.parse(stored);
      if (u.email === email) {
        setUser(u);
        return true;
      }
    }
    // Demo fallback: auto-create session
    const demo: User = { name: email.split("@")[0], email };
    setUser(demo);
    localStorage.setItem("travel_user", JSON.stringify(demo));
    return true;
  };

  const register = async (name: string, email: string, _password: string, phone?: string): Promise<boolean> => {
    const newUser: User = { name, email, phone };
    setUser(newUser);
    localStorage.setItem("travel_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("travel_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
