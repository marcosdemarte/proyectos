"use client";
import YouTube, { YouTubeProps } from "react-youtube";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import {
  getPortafolioProjects,
  type Idioma,
  type PortafolioItem,
} from "./data";
import { textos } from "./textos";
import locales from "./locales.json";

/**
 * Los estilos están en `portafolio.css` (CSS puro, BEM). El proyecto que
 * instala el paquete lo importa una sola vez:
 *
 *   import "@marcosdemarte/portafolio/portafolio.css";
 */

/** Cantidad de proyectos por tanda. El botón "Mostrar más" suma otra tanda. */
const POR_TANDA = 4;

// Construye la ruta apuntando a public/imagenes/portafolio
const getImageUrl = (carpeta: string, archivo: string) => {
  if (!carpeta || !archivo) return "";
  return `/imagenes/portafolio/${carpeta}/${archivo}`;
};

// Formateo de fecha: es -> DD/MM/YYYY | en -> MM/DD/YYYY
const formatearFecha = (fechaStr: string, lang: Idioma) => {
  if (!fechaStr) return "";
  const [dia, mes, anio] = fechaStr.split("/");
  return lang === "en" ? `${mes}/${dia}/${anio}` : fechaStr;
};

// Para el atributo datetime de <time>: YYYY-MM-DD
const fechaISO = (fechaStr: string) => {
  const [dia, mes, anio] = fechaStr.split("/");
  return `${anio}-${mes}-${dia}`;
};

function getYouTubeId(url: string) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const shortExp = /shorts\/([a-zA-Z0-9_-]{11})/;

  const match = url.match(regExp);
  const shortMatch = url.match(shortExp);

  if (shortMatch) return shortMatch[1];
  return match && match[7].length === 11 ? match[7] : null;
}

const opts: YouTubeProps["opts"] = {
  height: "100%",
  width: "100%",
  playerVars: {
    autoplay: 0 as 0 | 1,
    modestbranding: 1,
    rel: 0,
    controls: 1,
    fs: 1,
  },
};

interface ProyectoProps {
  item: PortafolioItem;
  lenguaje: Idioma;
  onAbrir: () => void;
}

const Proyecto = ({ item, lenguaje, onAbrir }: ProyectoProps) => {
  const t = locales[lenguaje] || locales.es;
  const ui = textos[lenguaje];

  return (
    <article className="proyecto">
      <figure className="proyecto__imagen">
        <button
          type="button"
          className="proyecto__abrir"
          onClick={onAbrir}
          aria-label={`${ui.abrirGaleria} ${item.titulo}`}>
          <img
            className="proyecto__foto"
            src={getImageUrl(item.imagenes.carpeta, item.imagenes.portada)}
            alt={item.titulo}
            width={630}
            height={630}
            loading="lazy"
          />
        </button>
      </figure>

      <div className="proyecto__texto">
        <h3 className="proyecto__titulo">{item.titulo}</h3>

        {item.descripcion.map((parrafo, i) => (
          <p key={i} className="proyecto__descripcion">
            {parrafo}
          </p>
        ))}

        <p className="proyecto__fecha">
          {t.date}:{" "}
          <time dateTime={fechaISO(item.fechaIgnaguracion)}>
            {formatearFecha(item.fechaIgnaguracion, lenguaje)}
          </time>
        </p>

        {item.demo && (
          <p className="proyecto__credencial">
            <strong>{item.demo.subtitulo}:</strong>
            <br />
            {item.demo.dni}: {item.demo.dni_value}
            <br />
            {item.demo.password}: {item.demo.password_value}
          </p>
        )}

        <a
          className="proyecto__enlace"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer">
          {ui.verProyecto}
          <span className="proyecto__aviso"> {ui.nuevaVentana}</span>
        </a>
      </div>
    </article>
  );
};

interface TandaProps {
  items: [string, PortafolioItem][];
  lenguaje: Idioma;
  onAbrir: (key: string) => void;
}

/**
 * Muestra los primeros POR_TANDA proyectos y, si quedan más, un <details>
 * con el botón "Mostrar más" y la tanda siguiente adentro. El CSS oculta el
 * botón cuando el <details> está abierto: no hace falta estado ni JavaScript.
 */
const Tanda = ({ items, lenguaje, onAbrir }: TandaProps) => {
  const visibles = items.slice(0, POR_TANDA);
  const resto = items.slice(POR_TANDA);

  return (
    <>
      <div className="proyectos__lista">
        {visibles.map(([key, item]) => (
          <Proyecto
            key={key}
            item={item}
            lenguaje={lenguaje}
            onAbrir={() => onAbrir(key)}
          />
        ))}
      </div>

      {resto.length > 0 && (
        <details className="proyectos__mas">
          <summary className="proyectos__boton">
            {textos[lenguaje].mostrarMas}
          </summary>
          <Tanda items={resto} lenguaje={lenguaje} onAbrir={onAbrir} />
        </details>
      )}
    </>
  );
};

export interface PortafolioProps {
  /** Idioma del portafolio: "es" | "en". Default: "es" */
  lenguaje?: Idioma;
  /** Keys del catálogo interno que no se muestran. */
  excludeKeys?: string[];
}

export const Portafolio = ({
  lenguaje = "es",
  excludeKeys = ["1", "2"],
}: PortafolioProps) => {
  const portafolio = getPortafolioProjects(lenguaje);

  const proyectos = Object.entries(portafolio)
    .reverse()
    .filter(([key]) => !excludeKeys.includes(key));

  const [open, setOpen] = useState(false);
  const [galeria, setGaleria] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [esVideo, setesVideo] = useState<string>("image");

  const selectedGaleria = (key: string) => {
    const item = portafolio[key];

    const imagenesMapped = item.imagenes.galeria.map((imagen: string) => ({
      src: getImageUrl(item.imagenes.carpeta, imagen),
      type: "image" as const,
    }));

    const videosMapped = (item.imagenes.videos || []).map(
      (videoUrl: string) => ({
        src: videoUrl,
        type: "video" as const,
      }),
    );

    const combinados = [...imagenesMapped, ...videosMapped];

    setGaleria(combinados);
    setCurrentIndex(0);
    setOpen(true);
  };

  return (
    <>
      <Tanda items={proyectos} lenguaje={lenguaje} onAbrir={selectedGaleria} />

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={galeria}
        index={currentIndex}
        on={{
          view: ({ index }) => {
            setCurrentIndex(index);
            const slideActual = galeria[index];
            if (slideActual) {
              setesVideo(slideActual.type === "video" ? "video" : "image");
            }
          },
        }}
        toolbar={{
          buttons: [
            <div
              key="galeria-contador"
              className={
                esVideo === "video"
                  ? "galeria__contador galeria__contador--video"
                  : "galeria__contador"
              }>
              {currentIndex + 1} / {galeria.length}
            </div>,
            "close",
          ],
        }}
        render={{
          buttonClose: () => (
            <button
              key="galeria-cerrar"
              type="button"
              onClick={() => setOpen(false)}
              className={
                esVideo === "video"
                  ? "yarl__button galeria__cerrar galeria__cerrar--video"
                  : "yarl__button galeria__cerrar"
              }>
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          ),
          slide: ({ slide }) => {
            const slideIndex = galeria.findIndex((s) => s.src === slide.src);
            const tipoSlide = slide.type as string;

            return (
              <div className="galeria__slide">
                {tipoSlide === "image" && (
                  <img src={slide.src} alt="" className="galeria__imagen" />
                )}

                {tipoSlide === "video" &&
                  (slideIndex === currentIndex ? (
                    <div className="galeria__video">
                      <YouTube
                        videoId={getYouTubeId(slide.src) ?? undefined}
                        opts={opts}
                        className="galeria__video-marco"
                      />
                    </div>
                  ) : (
                    <div className="galeria__video-espera" />
                  ))}
              </div>
            );
          },
        }}
        carousel={{
          finite: true,
          padding: "0px",
        }}
        plugins={[]}
      />
    </>
  );
};
