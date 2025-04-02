
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
                <a href="/" rel="prev">Back</a>
            </footer>
        </div>
    )
}