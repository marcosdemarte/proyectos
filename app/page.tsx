import Link from "next/link";
import { Portafolio } from "../src";
import type { Idioma } from "../src";

/**
 * Página de prueba local (npm run dev). No forma parte del paquete que se
 * instala en otros proyectos: "files" de package.json solo incluye src,
 * images, scripts y README.
 */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const lenguaje: Idioma = lang === "en" ? "en" : "es";

  return (
    <main className="prueba">
      <nav className="prueba__idiomas" aria-label="Idioma de prueba">
        <Link href="/?lang=es">Español</Link>
        <Link href="/?lang=en">English</Link>
      </nav>

      <h2 className="prueba__titulo">
        {lenguaje === "en" ? "Projects" : "Proyectos"}
      </h2>

      <Portafolio lenguaje={lenguaje} />
    </main>
  );
}
