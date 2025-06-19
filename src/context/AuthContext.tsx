"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  SiteUser,
  AuthContextType,
  LoginCredentials,
  LoginResponse,
} from "../types";
import { loginUser } from "../lib/api";
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<SiteUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleAuthSuccess = (userData: SiteUser, newToken: string) => {
    setToken(newToken);
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("authUser", JSON.stringify(userData));
  };

  const logIn = async (credentials: LoginCredentials) => {
    const response: LoginResponse = await loginUser(credentials);
    handleAuthSuccess(response.user, response.token);
  };

  const registerUser = (userData: SiteUser, token: string) => {
    handleAuthSuccess(userData, token);
  };

  const logOut = () => {
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, token, logIn, logOut, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
