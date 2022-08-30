import React, { ButtonHTMLAttributes } from "react";
import "./style.css";

export type ButtonProps = {
  children: React.ReactNode;
  variant?: "button" | "link";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, variant = "button", ...rest }: ButtonProps) {
  return (
    <button
      className={variant === "link" ? "button button-link" : "button"}
      {...rest}
    >
      {children}
    </button>
  );
}
