// Arma un archivo .svg suelto, listo para abrir en Illustrator, Figma o Inkscape.
interface SvgFileOptions {
  viewBox: string;
  width: number;
  height: number;
  title: string;
  description: string;
  markup: string;
}

const CREDITS = 'La ruta del polen. Ilustración del proyecto de Brezzo, Ledesma, Morales y Quiroz (Ética, Universidad Blas Pascal).';

export function svgFile({ viewBox, width, height, title, description, markup }: SvgFileOptions): Response {
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<!-- ${CREDITS} -->\n` +
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}" role="img" aria-labelledby="titulo">\n` +
    `  <title id="titulo">${title}</title>\n` +
    `  <desc>${description}</desc>\n` +
    `  ${markup}\n` +
    `</svg>\n`;

  return new Response(body, { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' } });
}
