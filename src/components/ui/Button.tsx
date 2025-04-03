'use client';

import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    variant?: 'default' | 'outline';
    children: React.ReactNode;
}

export function Button({ onClick, variant = 'default', children }: ButtonProps) {
    const styles =
        variant === 'outline'
            ? 'border border-white text-white px-4 py-2 rounded'
            : 'bg-blue-500 text-white px-4 py-2 rounded';

    return (
        <button onClick={onClick} className={styles}>
            {children}
        </button>
    );
}
