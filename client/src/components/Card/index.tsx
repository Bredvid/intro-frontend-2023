import React from "react";
import "./style.css";

type Props = {
  children: React.ReactNode;
};

export function Card({ children }: Props) {
  return (
    <div className="card-wrapper">
      <div className="card">{children}</div>
    </div>
  );
}
