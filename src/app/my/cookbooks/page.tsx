// import { redirect } from "next/navigation";
// import Link from "next/link";
// import { useAuth } from "@/context/AuthContext";
// import { getMyCookbooks } from "@/lib/api";

// export default async function MyCookbooksPage() {
//   const { user } = useAuth();

//   if (user.cookbook_count === 0) {
//     return <div>You have no cookbooks yet. Start by creating one!</div>;
//   }

//   if (user.cookbook_count === 1) {
//     const cookbookId = user.primary_cookbook_id;
//     if (cookbookId) {
//       redirect(`/my/cookbooks/${cookbookId}`);
//     }

//     const cookbooks = await getUserCookbooks();
//     redirect(`/my/cookbooks/${cookbooks[0].id}`);
//   }

//   const cookbooks = await getUserCookbooks();

//   return (
//     <div>
//       <h1>My Cookbooks</h1>
//       <ul>
//         {cookbooks.map((cb) => (
//           <li key={cb.id}>
//             <Link href={`/my/cookbooks/${cb.id}`}>{cb.title}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
