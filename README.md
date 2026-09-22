# La ruta del polen

**Córdoba, un solo corredor biológico. Red de mini-ecosistemas domésticos.**

Landing page a la que se llega escaneando el QR de los tótems del proyecto. Invita a los vecinos de Córdoba Capital a convertir su balcón, patio o jardín en un refugio de polinizadores, y les da la información para hacerlo: qué plantar, cómo cultivarlo y dónde retirar las semillas.

## Sobre el proyecto

*La ruta del polen* es un proyecto de diseño gráfico de **Brezzo, Ledesma, Morales y Quiroz** para la cátedra de **Ética** de la Licenciatura en Diseño Gráfico de la **Universidad Blas Pascal** (Práctico n.º 3: aplicación de los ODS en situaciones regionales de Córdoba Capital, Prof. Lic. Sebastián Sancho Pujia).

Trabaja el **ODS 15, Vida de ecosistemas terrestres** (metas 15.5 y 15.9): propone sumar miles de micronodos privados (macetas, canteros, jardines) con plantas nativas nutricias y nectaríferas, para que funcionen como un corredor biológico continuo entre los espacios verdes de la ciudad. El sistema gráfico incluye tótems, stickers para hogares, packaging de semillas, folletos y redes; esta web es la pieza digital que los conecta.

Desarrollo web: **Franco Molina**.

## Qué tiene el sitio

- **Inicio**: presentación con animaciones ligadas al scroll, las dos puertas de entrada (nectaríferas y nutricias) y el mapa de los 14 CPC donde retirar semillas, con búsqueda del más cercano por geolocalización.
- **Mariposas** (`/mariposas/`): catálogo de 10 mariposas diurnas de la ciudad. Cada ficha explica cómo reconocerla, cómo es su oruga y cómo cultivar su planta nutricia.
- **Nectaríferas** (`/nectariferas/`): catálogo de 10 plantas de néctar, filtrable por polinizador (colibríes, mariposas, abejas nativas, abejorros, otros insectos).
- **Fichas de cultivo**: cada una de las 20 plantas tiene un selector **En el jardín / En el balcón** con profundidad de terreno o maceta, sustrato, sol, riego, germinación y un consejo. La elección se recuerda entre fichas.

## Tecnología

| Pieza | Para qué |
| --- | --- |
| [Astro](https://astro.build) | Genera un sitio 100 % estático (HTML + CSS, JavaScript mínimo). |
| [GSAP + ScrollTrigger](https://gsap.com) | Animaciones ligadas al scroll: parallax, revelados, trazos que se dibujan, mariposa viajera. |
| [Leaflet](https://leafletjs.com) + OpenStreetMap | Mapa de los CPC, sin API key. Se carga recién al acercarse a la sección. |
| Alegreya y Alegreya Sans ([Fontsource](https://fontsource.org)) | Tipografías, servidas desde el propio sitio. |

Decisiones de diseño técnico:

- **El scroll es siempre el nativo del navegador.** Las animaciones siguen la posición del scroll, nunca lo frenan ni lo secuestran. No hay GIFs ni videos.
- **Todas las ilustraciones son SVG generado en el build** con un mismo kit de piezas (`src/art/`): una hoja en dos tonos, flores, ramilletes y alas parametrizadas. Por eso las 10 mariposas y las 20 plantas comparten estilo, pesan muy poco y se ven nítidas en cualquier pantalla.
- **Accesible y resistente**: respeta `prefers-reduced-motion` (sin animaciones, todo visible), funciona sin JavaScript (se muestran las dos guías de cultivo) y es navegable por teclado.

## Estructura

```
src/
├── data/          Contenido: mariposas, plantas, CPC y polinizadores
├── art/           Kit de ilustración SVG (plantKit, plantArt, butterflyArt)
├── components/    Secciones y piezas de interfaz
├── layouts/       Plantilla base
├── pages/         Rutas: inicio, /mariposas/, /nectariferas/
├── scripts/       scrollMotion.ts: todas las animaciones de scroll
└── styles/        Paleta, tipografía y estilos globales
```

Para **editar contenido** alcanza con tocar los archivos de `src/data/`. Para **agregar una planta**: sumarla en `src/data/plants.ts` y definir su ilustración en `src/art/plantArt.ts`.

Las animaciones se declaran en el HTML con atributos: `data-reveal`, `data-parallax="0.3"`, `data-draw`, `data-grow`. Están documentados al inicio de `src/scripts/scrollMotion.ts`.

## Ilustraciones sueltas (SVG)

La carpeta `svg/` tiene todos los dibujos como archivos `.svg` separados, listos para Illustrator, Figma o Inkscape: las 10 mariposas, las 18 plantas en tierra, las mismas 18 en maceta y los 5 íconos de polinizadores. Se generan desde el mismo código que dibuja el sitio, así que no hay dos versiones que se desincronicen:

```bash
npm run export:svg
```

También se pueden descargar de a uno desde el sitio publicado, por ejemplo `/svg/mariposas/monarca-del-sur.svg`. Ver `svg/README.md`.

## Desarrollo

Requiere Node 22 o superior.

```bash
npm install
npm run dev       # servidor local en http://localhost:4321
npm run build     # genera el sitio en dist/
npm run preview   # sirve dist/ para revisar el build
npm run check     # chequeo de tipos
```

## Publicación en Cloudflare (gratis)

El sitio está publicado en **https://ruta-del-polen.ruta-del-polen.workers.dev** como un Worker de archivos estáticos (el reemplazo actual de Cloudflare Pages). La configuración vive en `wrangler.jsonc`: sirve la carpeta `dist/` y usa `404.html` para las rutas que no existen.

Para publicar una versión nueva:

```bash
npx wrangler login   # solo la primera vez en cada máquina
npm run deploy       # compila y sube dist/
```

Para que se publique solo con cada `git push`: en el panel de Cloudflare, **Workers & Pages → ruta-del-polen → Settings → Build → Connect** y elegir este repositorio, con build command `npm run build` y deploy command `npx wrangler deploy`.

Servir archivos estáticos no consume la cuota de requests del plan gratuito. Al ser un sitio estático, también funciona en Netlify, Vercel o GitHub Pages sin cambios.

## Fuentes de la información

El contenido botánico y entomológico es orientativo y se reunió de fuentes públicas: fichas de [Nativas (La Nación)](https://nativas.lanacion.com.ar), [Sistema de Información de Biodiversidad de Parques Nacionales](https://sib.gob.ar), [ArgentiNat](https://www.argentinat.org), Reserva Ecológica Costanera Sur, Proyecto Panambí, Jardín Botánico de Buenos Aires, Herbotecnia, Flora Bonaerense, Wikipedia y trabajos del CONICET y la UNS sobre germinación de *Sphaeralcea bonariensis*. La ubicación de los CPC proviene de [OpenStreetMap](https://www.openstreetmap.org/copyright) y de la Municipalidad de Córdoba.

Notas sobre las especies y sus plantas (revisadas con el grupo sobre el listado original):

- La **Limonera grande** es *Heraclides thoas*, la mariposa negra con una banda amarilla que en Argentina se conoce con ese nombre. Sus orugas comen ruda, cítricos y árboles nativos del género *Zanthoxylum*; en el sitio su planta es la **ruda**, que se cultiva fácil en maceta. El listado original la asociaba a *Phoebis sennae* y al sen del campo, que corresponden a otra mariposa, la Azufrada común.
- La **Cenicienta** es *Anartia jatrophae*, blanca con ocelos, que se cría en el **cedrón del monte** (*Aloysia gratissima*). El listado original la asociaba a *Leptotes cassius*, una mariposa azul distinta.
- El cedrón del monte es a la vez planta nectarífera y nutricia de dos mariposas: la Cenicienta y la **Cuatro ojos**.
- La **Monarca del sur** se cría en el **tasi** (*Araujia odorata*), la **Hortensia** en el **peine de mono** (*Amphilophium cynanchoides*) y la **Dama manchada** en la **malva blanca** (*Sphaeralcea bonariensis*), las tres nativas.
- La "Dama pintada" figura como *Vanessa braziliensis*, que es la especie presente en Córdoba. *Vanessa cardui*, con la que suele confundirse, no habita Sudamérica.

## Licencia

Proyecto académico sin fines de lucro. Código bajo licencia MIT. Textos e ilustraciones: © sus autores, uso educativo.
