# Ilustraciones de La ruta del polen

Todos los dibujos del sitio, en SVG. Se pueden abrir y editar en Illustrator, Figma, Inkscape o Affinity, y se agrandan sin perder nitidez: sirven para los tótems, el packaging de semillas, los folletos y los stickers.

## Qué hay en cada carpeta

- `mariposas/` — las 10 mariposas diurnas del catálogo.
- `plantas/` — las 18 plantas, dibujadas en la tierra (versión jardín).
- `plantas-maceta/` — las mismas 18 plantas en maceta (versión balcón).
- `iconos/` — los polinizadores: colibríes, mariposas, abejas, abejorros y otros insectos.

Cada archivo lleva adentro el nombre común y el científico, y una descripción.

## Colores

- Verdes: `#173a22`, `#2c5e33`, `#4f8a3c`, `#7fb04f`, `#9cc76b`, `#dcebb9`
- Naranjas: `#d9601a`, `#f28c28`, `#f9b872`
- Amarillo manteca: `#fff3c4`, `#fffae6`, `#f7e3a1`
- Tinta: `#2b2118`

## Cómo se regeneran

Los dibujos no son archivos sueltos hechos a mano: se generan desde el código del sitio (`src/art/`). Si se corrige una ilustración, esta carpeta se rehace con:

```bash
npm run export:svg
```

También se pueden descargar de a uno desde el sitio, por ejemplo en `/svg/mariposas/monarca-del-sur.svg`.

## Créditos

Proyecto de diseño gráfico de Brezzo, Ledesma, Morales y Quiroz, para la cátedra de Ética de la Licenciatura en Diseño Gráfico de la Universidad Blas Pascal (ODS 15). Uso educativo y sin fines de lucro.
