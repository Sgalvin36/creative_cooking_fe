import { cookies } from "next/headers";
import { SiteUser } from "@/types";

export async function getCurrentUser(): Promise<SiteUser | null> {
  // const token = (await cookies()).get("auth_token")?.value;

  // if (!token) return null;

  // const response = await fetch(`$process.env.API_BASE_URL}/api/v1/me`, {
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  //   cache: "no-store",
  // });
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
