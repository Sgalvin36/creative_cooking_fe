import Link from "next/link";
import { fetchGraphQL } from "@/lib/api";
import { GET_PUBLIC_COOKBOOKS } from "@/graphql/queries";
import { GetPublicCookbooksResponse } from "@/types";

export default async function Cookbooks() {
  const data =
    await fetchGraphQL<GetPublicCookbooksResponse>(GET_PUBLIC_COOKBOOKS);
  console.log("Cookbook data: ", data);
  const cookbooks = data?.publicCookbooks ?? [];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Public Cookbooks</h1>
      <ul className="space-y-2">
        {cookbooks.map((cb) => (
          <li key={cb.id}>
            <Link href={`/cookbooks/${cb.id}`}>{cb.cookbookName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
