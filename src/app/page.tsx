'use client'

import Image from "next/image";
import Link from "next/link";
import { useAuth } from '../context/AuthContext';

export default function Home() {

  const { isLoggedIn, user } = useAuth();
  
  return (
    <div>
      {isLoggedIn ? (
          <p>Hello, {user.firstName} {user.lastName}</p>
        ) : (
          <p>Hello World</p>
        )}
    </div>
  );
}
