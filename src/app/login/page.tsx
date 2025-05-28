"use client";

import { Button } from "../../components/ui/Button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { LoginCredentials } from "@/types";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { logIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    router.push("/");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event?.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill in both fields.");
      return;
    }

    const credentials: LoginCredentials = {
      username,
      password,
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
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="text"
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
