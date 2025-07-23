import { redirect } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { fetchGraphQL } from "@/lib/api";
import { GET_USER_COOKBOOKS } from "@/graphql/queries";

export default async function MyCookbooksPage() {
  const { user } = useAuth();

  if (user.cookbook_count === 0) {
    return <div>You have no cookbooks yet. Start by creating one!</div>;
  }

  if (user.cookbook_count === 1) {
    const cookbookId = user.primary_cookbook_id;
    if (cookbookId) {
      redirect(`/my/cookbooks/${cookbookId}`);
    }
  }

  const { data } = await fetchGraphQL(GET_USER_COOKBOOKS);

  const cookbooks = data?.userCookbooks ?? [];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">My Cookbooks</h1>
      <ul className="space-y-2">
        {cookbooks.map((cb) => (
          <li key={cb.id}>
            <Link href={`/my/cookbooks/${cb.id}`}>{cb.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
