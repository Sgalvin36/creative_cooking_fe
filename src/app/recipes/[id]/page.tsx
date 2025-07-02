import { getRecipe } from "@/lib/queries/getRecipe";

export default async function RecipePage({
  params,
}: {
  params: { id: string };
}) {
  const fullRecipe = await getRecipe(params.id);
  console.log(fullRecipe);
  return <div>Recipe ID: {params.id}</div>;
}
