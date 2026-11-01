import type { ReactNode } from "react";
import "./prueba.css";
// En los otros proyectos se importa así: import "@marcosdemarte/portafolio/portafolio.css";
import "../src/portafolio.css";

export const metadata = {
  title: "Portafolio · prueba local",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
