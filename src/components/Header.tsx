import  AuthButtons from './AuthButtons';
import NavBar from './NavBar';
import Link from 'next/link';

export default function Header() {

    return (
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <AuthButtons/>
            <Link href="/">
                <div className="text-2xl font-bold">Cooking with Caveats</div>
            </Link>
            <NavBar />
        </header>
    );
}
