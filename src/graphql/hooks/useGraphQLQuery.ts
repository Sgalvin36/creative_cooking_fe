import { useState, useEffect } from "react";
import { fetchGraphQL } from "@/lib/api";

export function useGraphQLQuery<TData, TVariables>(
  query: string,
  variables?: TVariables,
  operationName?: string,
): {
  data: TData | null;
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchGraphQL<TData, TVariables>(query, variables, operationName)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching recipes");
        setLoading(false);
      });
  }, [query, operationName, JSON.stringify(variables)]);

  return { data, loading, error };
}
