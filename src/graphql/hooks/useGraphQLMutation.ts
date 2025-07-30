import { useState } from "react";
import { fetchGraphQL } from "@/lib/api";

export function useGraphQLMutation<TData, TVariables>(
  query: string,
  operationName?: string,
): {
  mutate: (variables: TVariables) => Promise<TData | undefined>;
  data: TData | null;
  loading: boolean;
  error: Error | null;
} {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (variables: TVariables) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchGraphQL<TData, TVariables>(
        query,
        variables,
        operationName,
      );
      setData(result);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An unknown error occurred"));
      }
    } finally {
      setLoading(false);
    }
  };

  return { mutate, data, loading, error };
}
