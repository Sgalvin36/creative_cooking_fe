import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useGraphQLMutation } from "@/graphql/hooks/useGraphQLMutation";
import { REGISTER_USER } from "@/graphql/mutations";
import {
  RegisterUserVariables,
  RegisterFormData,
  RegistrationResponse,
  ModalProps,
} from "@/types";

export default function RegistrationModal({ isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState("");

  const { mutate, data, loading, error } = useGraphQLMutation<
    RegistrationResponse,
    RegisterUserVariables
  >(REGISTER_USER, "RegisterUser");

  const { registerUser } = useAuth();

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

  useEffect(() => {
    if (error) {
      setFormError(error.message);
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { confirmPassword, ...submitData } = formData;

    if (formData.password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    try {
      await mutate(submitData);
      if (data?.user && data.token) {
        await registerUser(data.user, data.token);
        setFormError("");
        onClose();
      } else if (data?.errors.length) {
        setFormError(data.errors.join(", "));
      }
    } catch (error) {
      if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError("An unknown error occurred");
      }
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
