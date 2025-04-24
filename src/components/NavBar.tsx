'use client';

import Link from 'next/link';
import { User } from 'react-feather';
import { useAuth } from '../context/AuthContext';
import { SiteUser } from '@/types'


export default function NavBar() {

    const { isLoggedIn, user } = useAuth();
    return (
        <div className="flex gap-4">
            {isLoggedIn ? (
                <nav className="flex gap-4">
                    <a href="[id]/cookbooks">My Cookbook</a>
                    <a href="/recipes">Recipes</a>
                    <a href="/cookbooks">Cookbooks</a>
                    <a href="/about">About</a>
                    <Link href="/profile">
                        <User size={32} strokeWidth={2} color="lightBlue"/>
                    </Link>
                </nav>
                ) : (
                <nav className="flex gap-4">
                    <a href="/recipes">Recipes</a>
                    <a href="/cookbooks">Cookbooks</a>
                    <a href="/about">About</a>
                </nav>
                )}
        </div>
    )
}
