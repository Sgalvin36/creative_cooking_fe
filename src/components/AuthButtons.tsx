"use client";

import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function AuthButtons() {
  const router = useRouter();
  const { isLoggedIn, logIn, logOut } = useAuth();

  const redirect = () => {
    router.push("/register");
  };

  const handleFakeLogin = () => {
    const fakeToken = "abc123xyz"; // This would come from your backend
    const fakeUser = {
      id: "1",
      firstName: "Shane",
      lastName: "Galvin",
    };
    logIn(fakeToken, fakeUser);
  };

  return (
    <div className="flex gap-4">
      {isLoggedIn ? (
        <Button onClick={logOut} variant="outline">
          Logout
        </Button>
      ) : (
        <Button onClick={handleFakeLogin} variant="default">
          Login
        </Button>
      )}
      {isLoggedIn ? null : (
        <Button onClick={redirect} variant="default">
          Register
        </Button>
      )}
    </div>
  );
}
