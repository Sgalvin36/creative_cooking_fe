import Link from "next/link";

export default async function UserProfile({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    return ( 
        <div>
            <h1>User Profile: {id}</h1>
            <footer>
                <Link href="/" rel="prev">Back</Link>
            </footer>
        </div>
    )
}