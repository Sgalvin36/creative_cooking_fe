import { LoginCredentials, LoginResponse, SiteUser } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const res = await fetch(`${baseUrl}/api/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      password: credentials.password,
      ...(credentials.email
        ? { email: credentials.email }
        : { username: credentials.username }),
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data;
}

export async function fetchCurrentUser(): Promise<SiteUser | null> {
  const res = await fetch(`${baseUrl}/api/v1/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    return null;
  }
  const data = await res.json();

  const user: SiteUser = data.user;
  return user;
}

export async function logoutUser(): Promise<void> {
  const res = await fetch(`${baseUrl}/api/v1/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }
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
