import type { Idioma } from "./data";

/** Textos de la interfaz del componente (no están en locales.json). */
export const textos: Record<
  Idioma,
  {
    verProyecto: string;
    nuevaVentana: string;
    mostrarMas: string;
    abrirGaleria: string;
  }
> = {
  es: {
    verProyecto: "Ver proyecto",
    nuevaVentana: "(se abre en una ventana nueva)",
    mostrarMas: "Mostrar más",
    abrirGaleria: "Abrir galería de",
  },
  en: {
    verProyecto: "View project",
    nuevaVentana: "(opens in a new window)",
    mostrarMas: "Show more",
    abrirGaleria: "Open gallery of",
  },
};
