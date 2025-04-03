import  AuthButtons from './AuthButtons';
import Link from 'next/link'

export default function Header() {

    return (
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <AuthButtons/>
            <Link href="/">
                <div className="text-2xl font-bold">Cooking with Caveats</div>
            </Link>
            <nav className="flex gap-4">
                <a href="/recipes">Recipes</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
            </nav>
        </header>
    );
}
