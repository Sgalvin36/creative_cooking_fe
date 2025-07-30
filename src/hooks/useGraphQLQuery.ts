import { useState, useEffect } from "react";
import { fetchGraphQL } from "@/lib/api";

export function useGraphQLQuery<TData, TVariables>(
  query: string,
  variables?: TVariables,
  operationName?: string,
): {
  data: TData | null;
  loading: boolean;
  error: Error | null;
} {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchGraphQL<TData, TVariables>(query, variables, operationName)
      .then((res) => {
        setData(res);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred fetching recipes"));
        }
      })
      .finally(() => setLoading(false));
  }, [query, operationName, JSON.stringify(variables)]);

  return { data, loading, error };
}
