'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
    id: string;
    firstName: string;
    lastName: string;
}

type AuthContextType = {
    isLoggedIn: boolean;
    user: User | null;
    token: string | null;
    logIn: (token: string, userData: User) => void;
    logOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('authUser');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
        }
    }, []);

    const logIn = (newToken: string, userData: User) => {
        setToken(newToken);
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('authToken', newToken);
        localStorage.setItem('authUser', JSON.stringify(userData));
    };

    const logOut = () => {
        setToken(null);
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, token, logIn, logOut }}>
        {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
