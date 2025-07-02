import { GET_RECIPE } from "@/graphql/queries";
import { fetchGraphQL } from "@/lib/api";
import { FullRecipe } from "@/types";

export async function getRecipe(id: string) {
  const data = await fetchGraphQL<{ recipe: FullRecipe }, { id: string }>(
    GET_RECIPE,
    { id },
  );
  return data.recipe;
}
