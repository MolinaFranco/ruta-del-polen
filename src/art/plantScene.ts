// Tierra y maceta de las ilustraciones de plantas, y la escena completa para exportar.
import { drawPlant } from './plantArt';

export const PLANT_VIEW_BOX = '0 0 200 240';

export const groundMarkup =
  '<ellipse cx="100" cy="219" rx="84" ry="13" fill="#2c5e33"/><ellipse cx="100" cy="216" rx="70" ry="8" fill="#4f8a3c"/>';

export const potMarkup =
  '<path d="M58,206 L142,206 L134,240 L66,240 Z" fill="#c8683c"/>' +
  '<path d="M100,206 L142,206 L134,240 L100,240 Z" fill="#b1562e"/>' +
  '<rect x="52" y="198" width="96" height="12" rx="4" fill="#d97b4c"/>' +
  '<ellipse cx="100" cy="199" rx="44" ry="4" fill="#5a3a24"/>';

// Escena lista para un archivo .svg suelto: en tierra (jardín) o en maceta (balcón).
export function plantSceneMarkup(id: string, base: 'ground' | 'pot'): string {
  const plant = `<g${base === 'pot' ? ' transform="translate(0 -15)"' : ''}>${drawPlant(id)}</g>`;
  return base === 'pot' ? potMarkup + plant : groundMarkup + plant;
}
