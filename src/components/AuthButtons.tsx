'use client';

import { useState } from 'react';
import { Button } from './ui/Button';
import { useRouter } from 'next/navigation';

export default function AuthButtons() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
        const router = useRouter();
    
        const handleLogin = () => {
            setIsLoggedIn(true);
            router.push('/');
        };
    
        const handleLogout = () => {
            setIsLoggedIn(false);
            router.push('/');
        };

        const redirect = () => {
            router.push('/register')
        };

    return (
        <div className="flex gap-4">
            {isLoggedIn ? (
                <Button onClick={handleLogout} variant="outline">Logout</Button>
                ) : (
                <Button onClick={handleLogin} variant="default">Login</Button>
            )}
            {isLoggedIn ? 
                null : (
                <Button onClick={redirect} variant="default">Register</Button>
            )}
        </div>
    )
}
