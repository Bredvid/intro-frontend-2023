import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div className="layout">
      {/*  Vis logg ut knapp hvis man er logget inn */}
      {children}
    </div>
  );
}
