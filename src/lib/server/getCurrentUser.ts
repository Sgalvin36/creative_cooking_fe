import { cookies } from "next/headers";
import { SiteUser } from "@/types";

export async function getCurrentUser(): Promise<SiteUser | null> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString(); // all cookies

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/me`, {
    method: "GET",
    headers: {
      Cookie: cookieHeader, // ✅ forward raw cookies
    },
    cache: "no-store",
  });

  if (!response.ok) return null;

  const data = await response.json();
  const user: SiteUser = data.user;
  return user ?? null;
}
