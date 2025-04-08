'use client';

import { Button } from './ui/Button';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function AuthButtons() {
    const router = useRouter();
    const { isLoggedIn, logIn, logOut } = useAuth();
    
    const redirect = () => {
        router.push('/register')
    }
    return (
        <div className="flex gap-4">
            {isLoggedIn ? (
                <Button onClick={logOut} variant="outline">Logout</Button>
                ) : (
                <Button onClick={logIn} variant="default">Login</Button>
            )}
            {isLoggedIn ? 
                null : (
                <Button onClick={redirect} variant="default">Register</Button>
            )}
        </div>
    )
}
