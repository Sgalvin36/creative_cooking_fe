"use client";

import { Button } from "./ui/Button";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import RegistrationModal from "./modals/RegistrationModal";
import LoginModal from "./modals/LoginModal";

type ModalSwitch = "login" | "register" | null;

export default function AuthButtons() {
  const { isLoggedIn, logOut } = useAuth();
  const [activeModal, setActiveModal] = useState<ModalSwitch>(null);

  return (
    <div className="flex gap-4">
      {isLoggedIn ? (
        <Button onClick={logOut} variant="outline">
          Logout
        </Button>
      ) : (
        <Button onClick={() => setActiveModal("login")} variant="default">
          Login
        </Button>
      )}
      {isLoggedIn ? null : (
        <Button onClick={() => setActiveModal("register")} variant="default">
          Register
        </Button>
      )}
      <RegistrationModal
        isOpen={activeModal === "register"}
        onClose={() => setActiveModal(null)}
      />
      <LoginModal
        isOpen={activeModal === "login"}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
