"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { SiteUser, AuthContextType, LoginCredentials } from "../types";
import { loginUser, fetchCurrentUser, logoutUser } from "../lib/api";
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SiteUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await fetchCurrentUser();
        if (userData) {
          setUser(userData);
          setIsLoggedIn(true);
        }
      } catch {
        setUser(null);
        setIsLoggedIn(false);
      }
    }
    loadUser();
  }, []);

  const logIn = async (credentials: LoginCredentials) => {
    await loginUser(credentials);

    const userData = await fetchCurrentUser();
    if (userData) {
      setUser(userData);
      setIsLoggedIn(true);
    }
  };

  const logOut = async () => {
    await logoutUser();
    setUser(null);
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, logIn, logOut }}>
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
