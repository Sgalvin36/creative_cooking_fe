import Link from "next/link";

export default function Login() {
    return (
        <div>
            <h1>Login Page</h1>
            <p>This is my login page</p>
            <footer>
                <Link href="/" rel="prev">Back</Link>
            </footer>
        </div>
    )
}