
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

// // 'use client'

// import { useParams } from 'next/navigation';

// export async function generateStaticParams() {
//     // Temporary mock data
//     return [{ id: "123" }, { id: "246" }, { id: "369" }]; // Replace with dynamic fetch later
// }

// export default function UserProfile() {
//     const { id } = useParams();

//     return (
//         <div>
//             <h1>User Profile: {id}</h1>
//             <footer>
//                 <a href="/" rel="prev">Back</a>
//             </footer>
//         </div>
        
//     )
// }