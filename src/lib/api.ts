import { LoginCredentials, LoginResponse } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const res = await fetch(`${baseUrl}/api/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: credentials.username,
      password: credentials.password,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data;
}

export async function fetchGraphQL<TData, TVariables = Record<string, unknown>>(
  query: string,
  variables?: TVariables,
  operationName?: string,
): Promise<TData> {
  try {
    const res = await fetch(`${baseUrl}/api/v1/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
        operationName,
      }),
    });

    const result = await res.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data as TData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
