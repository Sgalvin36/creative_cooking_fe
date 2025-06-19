import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { useGraphQLMutation } from "@/graphql/hooks/useGraphQLMutation";
import { REGISTER_USER } from "@/graphql/mutations";
import {
  RegisterUserVariables,
  RegisterFormData,
  LoginResponse,
} from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: Props) {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");

  const { mutate, loading } = useGraphQLMutation<
    LoginResponse,
    RegisterUserVariables
  >(REGISTER_USER, "RegisterUser");

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setFormError("");
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { password, confirmPassword, firstName, lastName, email } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setFormError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    setFormError("");

    try {
      await mutate({
        firstName,
        lastName,
        userName: email.toLowerCase(),
        password,
      });

      onClose(); // Close modal on success
    } catch (error) {
      setFormError(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
              {formError}
            </div>
          )}
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-black"
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-black"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-black"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-black"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-black"
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button onClick={onClose} variant="secondary" disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="default" disabled={loading}>
              Register
            </Button>
            {loading ? "Registering..." : "Register"}
          </div>
        </form>
      </div>
    </div>
  );
}
