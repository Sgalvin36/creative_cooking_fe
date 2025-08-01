import AuthButtons from "./AuthButtons";
import NavBar from "./NavBar";
import Link from "next/link";
import { getCurrentUser } from "@/lib/server/getCurrentUser";

export default async function Header() {
  const user = await getCurrentUser();
  const homeHref = user ? "/recipes" : "/";

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <AuthButtons />
      <Link href={homeHref}>
        <div className="text-2xl font-bold">Cooking with Caveats</div>
      </Link>
      <NavBar />
    </header>
  );
}
