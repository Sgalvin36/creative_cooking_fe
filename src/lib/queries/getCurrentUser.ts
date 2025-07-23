import { cookies } from "next/headers";
import { SiteUser } from "@/types";

export async function getCurrentUser(): Promise<SiteUser | null> {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) return null;

  const response = await fetch(`$<process.env.API_BASE_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) return null;

  const user: SiteUser = await response.json();
  return user;
}
