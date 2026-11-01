# @marcosdemarte/portafolio

Componente de portafolio (lista de proyectos + galería con lightbox y videos de
YouTube) para reutilizar entre sitios Next.js. Pensado para `powerbits.net` y
`marcosbrandolin.vercel.app`.

- El componente, los **textos** (`src/locales.json`) y las **imágenes** viven
  en el paquete. El idioma se elige con la prop `lenguaje` (`"es"` | `"en"`).
- Los **estilos** están en `src/portafolio.css`: CSS puro, metodología BEM, sin
  Tailwind ni `<style>` embebido. Cada proyecto que instala el paquete lo
  importa **una sola vez**.
- Este paquete **no se publica en npm**: se instala desde este repo de GitHub.

---

## Probar en local (sin instalarlo en otro proyecto)

El repo trae una página de prueba mínima en `app/` (no se instala en otros
proyectos: `files` de `package.json` solo incluye `src`, `images`, `scripts` y
este README).

```bash
npm install     # instala dependencias y copia las imágenes a public/
npm run dev     # http://localhost:3000   (también: ?lang=en)
```

- `npm start` compila y levanta la versión de producción (`next build && next start`).
- `npm run typecheck` revisa los tipos sin compilar.
- En Visual Studio, si ves líneas rojas después de `npm install`: comando
  **TypeScript: Restart TS Server**. Sin `node_modules` instalado, TypeScript no
  encuentra `react` ni `next` y marca todo el JSX.

## Instalar en un proyecto Next.js

1. Instalar:

   ```bash
   npm install github:marcosdemarte/portafolio
   ```

2. `next.config.ts` (el paquete se distribuye como TypeScript sin compilar):

   ```ts
   const nextConfig: NextConfig = {
     transpilePackages: ["@marcosdemarte/portafolio"],
   };
   ```

3. Importar el CSS una vez (por ejemplo en `app/[locale]/layout.tsx`):

   ```ts
   import "@marcosdemarte/portafolio/portafolio.css";
   ```

4. Usar el componente:

   ```tsx
   import { Portafolio } from "@marcosdemarte/portafolio";

   <Portafolio lenguaje="es" />;
   ```

El `postinstall` copia las imágenes a `public/imagenes/portafolio` del proyecto.

## Props

Todas opcionales:

| Prop          | Default     | Descripción                                  |
| ------------- | ----------- | -------------------------------------------- |
| `lenguaje`    | `"es"`      | `"es"` o `"en"`                              |
| `excludeKeys` | `["1","2"]` | Keys del catálogo interno que no se muestran |

> La prop `cssHref` ya no existe: el CSS se importa con
> `import "@marcosdemarte/portafolio/portafolio.css"`.

## Mostrar más

Se muestran **4 proyectos** y, después del último, un botón **Mostrar más /
Show more** que revela los 4 siguientes (y así hasta terminar). Está resuelto
con HTML + CSS: cada tanda extra va dentro de un `<details>` y el CSS oculta el
botón cuando se abre. No hay estado ni JavaScript. Para cambiar la cantidad,
editá `POR_TANDA` en `src/Portafolio.tsx`.

## Textos (`locales.json`)

`description` puede ser un arreglo de párrafos (formato nuevo, cada ítem va en
su propio `<p>`) o un texto con `<br/><br/>` (formato viejo: se corta en
párrafos y un `<br/>` simple pasa a salto de línea). No se inyecta HTML.

```json
"picnic": {
  "title": "Video publicitario",
  "description": ["Primer párrafo.", "Segundo párrafo."]
}
```

## CSS (BEM)

| Bloque      | Elementos                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| `proyectos` | `__lista`, `__mas`, `__boton`                                                                                              |
| `proyecto`  | `__imagen`, `__abrir`, `__foto`, `__texto`, `__titulo`, `__descripcion`, `__fecha`, `__credencial`, `__enlace`, `__aviso` |
| `galeria`   | `__slide`, `__imagen`, `__video`, `__video-espera`, `__video-marco`, `__contador`, `__cerrar` (modificador `--video`)      |

Usa las variables del sitio si existen (`--c-texto`, `--c-suave`, `--c-borde`,
`--c-acento`, `--c-acento-oscuro`, `--c-acento-2`) y, si no, un valor de respaldo.
Breakpoints: escritorio ≥ 1024px, tablet 768–1023px, celular ≤ 767px.

## Publicar un cambio (mantenedor)

```bash
git add .
git commit -m "descripcion"
git push origin master
git tag -a v1.2.08 -m "descripcion corta"
git push origin --tags
```

En cada proyecto consumidor, cambiá el tag en `package.json`
(`"github:marcosdemarte/portafolio#v1.2.08"`) y reinstalá. Si no detecta el
cambio, borrá `node_modules/@marcosdemarte/portafolio` y corré `npm install`.
Reiniciá `npm run dev` después de actualizar.
