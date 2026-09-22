// Arma el contenido de una mariposa (alas espejadas, cuerpo y antenas).
// Lo usan tanto el componente de la página como los archivos .svg que se exportan.
import { butterflyArt, foreVeins, hindVeins } from './butterflyArt';

export const BUTTERFLY_VIEW_BOX = '-118 -88 236 172';

export function butterflyMarkup(id: string, key: string): string {
  const art = butterflyArt[id];
  if (!art) throw new Error(`No illustration for butterfly: ${id}`);
  const wing = (shape: string, fill: string, veins: string, pattern: string) =>
    `<g clip-path="url(#${shape === art.shape.fore ? 'fore' : 'hind'}-${key})">` +
    `<path d="${shape}" fill="${fill}"/>` +
    `<path d="${veins}" stroke="${art.veins}" stroke-width="${art.veinWidth}" fill="none"/>` +
    pattern +
    `<path d="${shape}" fill="none" stroke="${art.margin}" stroke-width="${art.marginWidth * 2}"/></g>`;

  return (
    `<defs>` +
    `<clipPath id="fore-${key}"><path d="${art.shape.fore}"/></clipPath>` +
    `<clipPath id="hind-${key}"><path d="${art.shape.hind}"/></clipPath>` +
    `<g id="wings-${key}">${wing(art.shape.hind, art.hind, hindVeins, art.hindPattern)}${wing(art.shape.fore, art.fore, foreVeins, art.forePattern)}</g>` +
    `</defs>` +
    `<g class="butterfly__wing butterfly__wing--right" data-wing="true"><use href="#wings-${key}"/></g>` +
    `<g class="butterfly__wing butterfly__wing--left" data-wing="true"><use href="#wings-${key}" transform="scale(-1 1)"/></g>` +
    `<g fill="${art.antennae ?? art.body}">` +
    `<path d="M-1,-19 C-6,-36 -14,-46 -21,-52 M1,-19 C6,-36 14,-46 21,-52" fill="none" stroke="${art.antennae ?? art.body}" stroke-width="1.4" stroke-linecap="round"/>` +
    `<circle cx="-21" cy="-52" r="2"/><circle cx="21" cy="-52" r="2"/></g>` +
    `<g fill="${art.body}">` +
    `<ellipse cx="0" cy="20" rx="3.4" ry="19"/><ellipse cx="0" cy="-4" rx="4.6" ry="10"/><circle cx="0" cy="-16" r="4.2"/></g>`
  );
}
