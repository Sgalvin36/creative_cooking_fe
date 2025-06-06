"use client";

import React from "react";

interface ButtonProps {
  onClick?: () => void;
  variant?: "default" | "outline" | "primary" | "secondary" | "danger";
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

export function Button({
  onClick,
  variant = "default",
  children,
  type = "button",
}: ButtonProps) {
  const styles = (() => {
    switch (variant) {
      case "outline":
        return "border border-white text-white px-4 py-2 rounded";
      case "primary":
        return "bg-cyan-500 text-white px-4 py-2 rounded";
      case "secondary":
        return "bg-gray-500 text-white px-4 py-2 rounded";
      case "danger":
        return "bg-red-500 text-white px-4 py-2 rounded";
      default:
        return "bg-blue-500 text-white px-4 py-2 rounded";
    }
  })();

  return (
    <button onClick={onClick} className={styles} type={type}>
      {children}
    </button>
  );
}
