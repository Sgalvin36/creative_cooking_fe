"use client";

import { Button } from "../../components/ui/Button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { LoginCredentials } from "@/types";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { logIn } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    router.push("/");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event?.preventDefault();
    setError(null);

    if (!identifier || !password) {
      setError("Please fill in both fields.");
      return;
    }

    const credentials: LoginCredentials = {
      password,
      ...(identifier.includes("@")
        ? { email: identifier }
        : { username: identifier }),
    };

    try {
      await logIn(credentials);
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="identifier">Email or Username:</label>
        <input
          type="text"
          id="identifier"
          name="identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <br />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />
        <Button variant="primary" type="submit">
          Login
        </Button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
      <footer>
        <Button onClick={handleBack}>Back</Button>
      </footer>
    </div>
  );
}
