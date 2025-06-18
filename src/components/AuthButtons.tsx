"use client";

import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import RegistrationModal from "./modals/RegistrationModal";

export default function AuthButtons() {
  const router = useRouter();
  const { isLoggedIn, logOut } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex gap-4">
      {isLoggedIn ? (
        <Button onClick={logOut} variant="outline">
          Logout
        </Button>
      ) : (
        <Button onClick={handleLogin} variant="default">
          Login
        </Button>
      )}
      {isLoggedIn ? null : (
        <Button onClick={() => setIsModalOpen(true)} variant="default">
          Register
        </Button>
      )}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
