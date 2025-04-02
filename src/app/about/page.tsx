import Link from "next/link";

export default function About() {
    return (
        <div>
            <h1>About Me</h1>
            <p>This is about page</p>
            <footer>
                <Link href="/" rel="prev">Back</Link>
            </footer>
        </div>
    )
}