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
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
}

// export async function fetchRandomRecipes() {
//   const res = await fetch("/api/v1/recipes");
// }
