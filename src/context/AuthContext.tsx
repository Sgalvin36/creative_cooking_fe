'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
    isLoggedIn: boolean;
    logIn: () => void;
    logOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logIn = () => {
        setIsLoggedIn(true);
    };

    const logOut = () => {
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
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
