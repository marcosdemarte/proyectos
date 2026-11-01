// src/data.ts
import locales from "./locales.json";

export type Idioma = "es" | "en";

export interface PortafolioItem {
  titulo: string;
  url: string;
  /** Párrafos de la descripción: cada uno va en su propio <p>. */
  descripcion: string[];
  demo?: {
    subtitulo: string;
    dni: string;
    password: string;
    dni_value: string;
    password_value: string;
  };
  imagenes: {
    carpeta: string;
    portada: string;
    galeria: string[];
    videos?: string[];
  };
  fechaIgnaguracion: string;
  version: string;
}

/**
 * Devuelve la descripción como lista de párrafos, sin HTML.
 * - Un arreglo (formato nuevo de locales.json) se usa tal cual.
 * - Un texto con "<br/><br/>" (formato viejo) se corta en párrafos, y un
 *   "<br/>" simple pasa a salto de línea ("\n"), que el CSS respeta con
 *   `white-space: pre-line`.
 */
const parrafos = (descripcion: string | string[]): string[] =>
  (Array.isArray(descripcion) ? descripcion : [descripcion])
    .flatMap((texto) => texto.split(/(?:<br\s*\/?>\s*){2,}/i))
    .map((texto) => texto.replace(/<br\s*\/?>/gi, "\n").trim())
    .filter(Boolean);

export function getPortafolioProjects(lang: Idioma = "es"): Record<string, PortafolioItem> {
  const t = locales[lang] || locales.es;

  return {
    "1": {
      titulo: t.projects.umbra.title,
      url: "https://youtu.be/_T65x-3Bv38",
      descripcion: parrafos(t.projects.umbra.description),
      imagenes: {
        carpeta: "umbra",
        portada: "umbra1.jpg",
        galeria: ["umbra.jpg", "umbra1.jpg"],
        videos: ["https://youtu.be/_T65x-3Bv38"],
      },
      fechaIgnaguracion: "08/08/2008",
      version: "1.0",
    },
    "2": {
      titulo: t.projects.animacion3d.title,
      url: "https://www.bicicletaselectricas.com.ar/",
      descripcion: parrafos(t.projects.animacion3d.description),
      imagenes: {
        carpeta: "bicicletaselectricas",
        portada: "bicicletaselectricas2.jpg",
        galeria: ["bicicletaselectricas2.jpg"],
      },
      fechaIgnaguracion: "08/10/2025",
      version: "1.0",
    },
    "3": {
      titulo: t.projects.tiendabrando.title,
      url: "https://www.tiendabrando.com.ar/",
      descripcion: parrafos(t.projects.tiendabrando.description),
      imagenes: {
        carpeta: "tiendabrando",
        portada: "tiendabrando4.jpg",
        galeria: [
          "tiendabrando1.jpg",
          "tiendabrando2.jpg",
          "tiendabrando3.jpg",
          "tiendabrando4.jpg",
          "tiendabrando5.jpg",
          "tiendabrando6.jpg",
          "tiendabrando7.jpg",
          "tiendabrando8.jpg",
          "tiendabrando9.jpg",
          "tiendabrando10.jpg",
        ],
      },
      fechaIgnaguracion: "05/11/2025",
      version: "2.01",
    },
    "4": {
      titulo: t.projects.powerbit.title,
      url: "https://wwww.powerbits.net/",
      descripcion: parrafos(t.projects.powerbit.description),
      imagenes: {
        carpeta: "powerbit",
        portada: "powerbit1.jpg",
        galeria: [
          "powerbit1.jpg",
          "powerbit2.jpg",
          "powerbit3.jpg",
          "powerbit4.jpg",
          "powerbit5.jpg",
        ],
        videos: ["https://www.youtube.com/shorts/39PgS02EHYw"],
      },
      fechaIgnaguracion: "15/12/2023",
      version: "2.3",
    },
    "5": {
      titulo: t.projects.elcazadorgym.title,
      url: "https://www.elcazadorgym.com.ar/fitnesscontrol/",
      demo: {
        subtitulo: t.projects.elcazadorgym.subtitle,
        dni: t.projects.elcazadorgym.dni,
        password: t.projects.elcazadorgym.password,
        dni_value: "11222333",
        password_value: "at4sk6",
      },
      descripcion: parrafos(t.projects.elcazadorgym.description),
      imagenes: {
        carpeta: "elcazadorgym",
        portada: "elcazadorgym1.jpg",
        galeria: [
          "elcazadorgym1.jpg",
          "elcazadorgym2.jpg",
          "elcazadorgym3.jpg",
          "elcazadorgym4.jpg",
          "elcazadorgym5.jpg",
          "elcazadorgym6.jpg",
        ],
      },
      fechaIgnaguracion: "26/03/2026",
      version: "1.14",
    },
    "6": {
      titulo: t.projects.marcosbrandolinportafolio.title,
      url: "https://marcosbrandolin.vercel.app/",
      descripcion: parrafos(t.projects.marcosbrandolinportafolio.description),
      imagenes: {
        carpeta: "marcos-brandolin-portafolio",
        portada: "marcosbrandolin-portafolio.jpg",
        galeria: ["marcosbrandolin-portafolio.jpg"],
      },
      fechaIgnaguracion: "29/03/2026",
      version: "1.1",
    },
    "7": {
      titulo: t.projects.juegounirverso.title,
      url: "https://juego-jurasico.vercel.app/",
      descripcion: parrafos(t.projects.juegounirverso.description),
      imagenes: {
        carpeta: "juego-jurasico",
        portada: "juego-jurasico1.jpg",
        galeria: ["juego-jurasico1.jpg"],
      },
      fechaIgnaguracion: "17/12/2025",
      version: "1.2",
    },
    "8": {
      titulo: t.projects.bicicletaselectricas.title,
      url: "https://www.bicicletaselectricas.com.ar/",
      descripcion: parrafos(t.projects.bicicletaselectricas.description),
      imagenes: {
        carpeta: "bicicletaselectricas",
        portada: "bicicletaselectricas2.jpg",
        galeria: [
          "bicicletaselectricas2.jpg",
          "bicicletaselectricas3.jpg",
          "bicicletaselectricas4.jpg",
          "bicicletaselectricas5.jpg",
          "bicicletaselectricas6.jpg",
          "bicicletaselectricas7.jpg",
          "bicicletaselectricas8.jpg",
        ],
      },
      fechaIgnaguracion: "08/10/2025",
      version: "1.0",
    },
    "9": {
      titulo: t.projects.picnic.title,
      url: "https://www.instagram.com/reel/DWB8mOMEfYT/",
      descripcion: parrafos(t.projects.picnic.description),
      imagenes: {
        carpeta: "picnic",
        portada: "picnic.jpg",
        galeria: ["picnic.jpg"],
        videos: ["https://www.youtube.com/shorts/KSsm89AMlBc"],
      },
      fechaIgnaguracion: "18/03/2026",
      version: "1.0",
    },
  };
}