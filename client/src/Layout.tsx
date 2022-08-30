import React, { ReactNode } from "react";

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
