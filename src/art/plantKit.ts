// Kit de ilustración botánica: piezas chicas (tallo, hoja, flor) que devuelven SVG como texto.
// Todas las plantas del sitio se arman combinando estas piezas, por eso comparten "la misma mano".
// Lienzo: 200 x 240. La planta nace en (100, 214).

export const BASE_X = 100;
export const BASE_Y = 214;

export type Point = [number, number];
export type LeafKind = 'lance' | 'ovate' | 'heart' | 'narrow';

const n = (value: number) => Math.round(value * 10) / 10;

// Número pseudoaleatorio estable (siempre el mismo para el mismo índice): da variedad sin azar.
export const jitter = (index: number) => {
  const s = Math.sin(index * 127.1 + 11.7) * 43758.5453;
  return s - Math.floor(s);
};

const place = (x: number, y: number, angle: number, content: string) =>
  `<g transform="translate(${n(x)} ${n(y)}) rotate(${n(angle)})">${content}</g>`;

export interface Curve {
  start: Point;
  control: Point;
  end: Point;
}

export const pointOn = ({ start, control, end }: Curve, t: number): Point => {
  const u = 1 - t;
  return [u * u * start[0] + 2 * u * t * control[0] + t * t * end[0], u * u * start[1] + 2 * u * t * control[1] + t * t * end[1]];
};

export const angleOn = ({ start, control, end }: Curve, t: number) => {
  const dx = 2 * (1 - t) * (control[0] - start[0]) + 2 * t * (end[0] - control[0]);
  const dy = 2 * (1 - t) * (control[1] - start[1]) + 2 * t * (end[1] - control[1]);
  return (Math.atan2(dy, dx) * 180) / Math.PI;
};

// Punto a `distance` unidades hacia atrás sobre la dirección del tallo en su punta.
// Sirve para colgar flores o ramitas de un punto que realmente está sobre el tallo.
export const backAlong = (x: number, y: number, angle: number, distance: number): Point => {
  const rad = (angle * Math.PI) / 180;
  return [x - Math.cos(rad) * distance, y - Math.sin(rad) * distance];
};

// Rama fina y curva entre dos puntos (pedicelos, ramitas de inflorescencias).
export const twig = (from: Point, to: Point, width: number, color: string, bend = 0.25) => {
  const mx = (from[0] + to[0]) / 2 - (to[1] - from[1]) * bend;
  const my = (from[1] + to[1]) / 2 + (to[0] - from[0]) * bend;
  return `<path d="M${n(from[0])},${n(from[1])} Q${n(mx)},${n(my)} ${n(to[0])},${n(to[1])}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
};

export const stem = ({ start, control, end }: Curve, width: number, color: string) =>
  `<path d="M${n(start[0])},${n(start[1])} Q${n(control[0])},${n(control[1])} ${n(end[0])},${n(end[1])}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;

const leafOutline: Record<LeafKind, (l: number, w: number) => [string, string]> = {
  lance: (l, w) => [`M0,0 C${n(l * 0.3)},${-w} ${n(l * 0.7)},${-w} ${l},0`, `C${n(l * 0.7)},${w} ${n(l * 0.3)},${w} 0,0 Z`],
  narrow: (l, w) => [`M0,0 C${n(l * 0.35)},${n(-w * 0.7)} ${n(l * 0.75)},${n(-w * 0.6)} ${l},0`, `C${n(l * 0.75)},${n(w * 0.6)} ${n(l * 0.35)},${n(w * 0.7)} 0,0 Z`],
  ovate: (l, w) => [`M0,0 C${n(l * 0.08)},${n(-w * 1.3)} ${n(l * 0.6)},${-w} ${l},0`, `C${n(l * 0.6)},${w} ${n(l * 0.08)},${n(w * 1.3)} 0,0 Z`],
  heart: (l, w) => [`M${n(l * 0.12)},0 C${n(-l * 0.2)},${n(-w * 1.5)} ${n(l * 0.55)},${n(-w * 1.25)} ${l},0`, `C${n(l * 0.55)},${n(w * 1.25)} ${n(-l * 0.2)},${n(w * 1.5)} ${n(l * 0.12)},0 Z`],
};

// Hoja en dos tonos: la mitad inferior lleva el tono de sombra. Es la "firma" del estilo.
export const leaf = (x: number, y: number, angle: number, length: number, width: number, color: string, shade: string, kind: LeafKind = 'lance') => {
  const [top, bottom] = leafOutline[kind](length, width);
  const tipX = kind === 'heart' ? length * 0.12 : 0;
  return place(x, y, angle, `<path d="${top} ${bottom}" fill="${color}"/><path d="M${n(tipX)},0 L${length},0 ${bottom}" fill="${shade}"/>`);
};

// Hoja compuesta (tipo sen del campo): un raquis con pares de folíolos.
export const pinnateLeaf = (x: number, y: number, angle: number, length: number, pairs: number, color: string, shade: string) => {
  let content = `<path d="M0,0 L${length},0" stroke="${shade}" stroke-width="1.2" stroke-linecap="round"/>`;
  for (let i = 1; i <= pairs; i++) {
    const at = (length * i) / pairs;
    const size = length * 0.3;
    content += leaf(at, 0, -58, size, size * 0.3, color, shade, 'ovate') + leaf(at, 0, 58, size, size * 0.3, color, shade, 'ovate');
  }
  return place(x, y, angle, content);
};

// Hoja palmada (mburucuyá, malvas): lóbulos abiertos en abanico desde un mismo punto.
export const palmateLeaf = (x: number, y: number, angle: number, length: number, lobes: number, color: string, shade: string, kind: LeafKind = 'lance') => {
  let content = '';
  const spread = 130;
  for (let i = 0; i < lobes; i++) {
    const lobeAngle = -spread / 2 + (spread * i) / (lobes - 1);
    const lobeLength = length * (1 - Math.abs(lobeAngle) / 260);
    content += leaf(0, 0, lobeAngle, lobeLength, lobeLength * 0.2, color, shade, kind);
  }
  return place(x, y, angle, content);
};

// Flor tubular (salvia, canario rojo, ruellia): un tubo que se abre en la boca.
export const tubeFlower = (x: number, y: number, angle: number, length: number, color: string, shade: string, calyx: string) => {
  const l = length;
  const mouth = l * 0.34;
  return place(
    x,
    y,
    angle,
    `<path d="M0,-1.3 L${n(l * 0.62)},${n(-mouth * 0.45)} C${n(l * 0.85)},${n(-mouth * 1.1)} ${n(l * 1.08)},${n(-mouth * 0.7)} ${l},0 C${n(l * 1.08)},${n(mouth * 0.7)} ${n(l * 0.85)},${n(mouth * 1.1)} ${n(l * 0.62)},${n(mouth * 0.45)} L0,1.3 Z" fill="${color}"/>` +
      `<path d="M0,0 L${l},0 C${n(l * 1.08)},${n(mouth * 0.7)} ${n(l * 0.85)},${n(mouth * 1.1)} ${n(l * 0.62)},${n(mouth * 0.45)} L0,1.3 Z" fill="${shade}"/>` +
      `<ellipse cx="${n(l * 0.1)}" cy="0" rx="${n(l * 0.16)}" ry="2.2" fill="${calyx}"/>`,
  );
};

// Flor simple de pétalos redondeados (sen, malva, jazmín del cielo).
export const petalFlower = (x: number, y: number, radius: number, petals: number, color: string, shade: string, center: string, rotation = 0) => {
  let content = '';
  for (let i = 0; i < petals; i++) {
    const a = rotation + (360 / petals) * i;
    content += `<ellipse cx="${n(radius * 0.55)}" cy="0" rx="${n(radius * 0.55)}" ry="${n(radius * 0.4)}" fill="${i % 2 ? shade : color}" transform="rotate(${n(a)})"/>`;
  }
  content += `<circle r="${n(radius * 0.24)}" fill="${center}"/>`;
  return place(x, y, 0, content);
};

// Margarita: muchos pétalos angostos y un disco central (chinita, compuestas).
export const daisy = (x: number, y: number, radius: number, petals: number, color: string, shade: string, center: string) => {
  let content = '';
  for (let i = 0; i < petals; i++) {
    const a = (360 / petals) * i;
    content += `<ellipse cx="${n(radius * 0.6)}" cy="0" rx="${n(radius * 0.42)}" ry="${n(radius * 0.2)}" fill="${i % 2 ? shade : color}" transform="rotate(${n(a)})"/>`;
  }
  content += `<circle r="${n(radius * 0.32)}" fill="${center}"/><circle cx="${n(-radius * 0.08)}" cy="${n(-radius * 0.08)}" r="${n(radius * 0.14)}" fill="rgb(255 255 255 / 0.35)"/>`;
  return place(x, y, 0, content);
};

// Ramillete: florcitas en espiral, con un color al centro y otro en el borde (lantana, verbena, asclepias).
export const cluster = (x: number, y: number, radius: number, count: number, floret: number, outer: string, inner: string) => {
  let content = '';
  for (let i = count - 1; i >= 0; i--) {
    const distance = radius * Math.sqrt(i / count);
    const a = i * 2.39996;
    content += `<circle cx="${n(Math.cos(a) * distance)}" cy="${n(Math.sin(a) * distance * 0.78)}" r="${floret}" fill="${i > count * 0.45 ? outer : inner}"/>`;
  }
  return place(x, y, 0, content);
};

// Penacho: puntitos que siguen una línea y se afinan hacia la punta (vara de oro, azahar del monte).
export const plume = (x: number, y: number, angle: number, length: number, spread: number, count: number, color: string, shade: string) => {
  let content = '';
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const width = spread * (1 - t * 0.85);
    const offset = (jitter(i) - 0.5) * 2 * width;
    content += `<circle cx="${n(t * length)}" cy="${n(offset)}" r="${n(1.5 + jitter(i + 50) * 1.3)}" fill="${jitter(i + 9) > 0.6 ? shade : color}"/>`;
  }
  return place(x, y, angle, content);
};

export const circle = (x: number, y: number, r: number, fill: string) => `<circle cx="${n(x)}" cy="${n(y)}" r="${r}" fill="${fill}"/>`;

export interface UprightOptions {
  stems: number;
  height: number;
  spread: number;
  stemWidth: number;
  stemColor: string;
  leavesPerStem: number;
  leafStart?: number;
  leafEnd?: number;
  drawLeaf: (x: number, y: number, angle: number, scale: number, index: number) => string;
  drawTop: (x: number, y: number, angle: number, index: number) => string;
}

// Porte erguido: varios tallos que se abren en abanico desde la base, con hojas alternas
// y una flor (o lo que devuelva drawTop) en la punta. Sirve para la mayoría de las especies.
export const upright = (options: UprightOptions) => {
  const { stems, height, spread, stemWidth, stemColor, leavesPerStem, leafStart = 0.22, leafEnd = 0.86, drawLeaf, drawTop } = options;
  let back = '';
  let front = '';
  for (let i = 0; i < stems; i++) {
    const t = stems === 1 ? 0 : (i / (stems - 1)) * 2 - 1;
    const lift = 1 - 0.22 * Math.abs(t) - jitter(i) * 0.08;
    const curve: Curve = {
      start: [BASE_X + t * 5, BASE_Y],
      control: [BASE_X + t * spread * 0.25, BASE_Y - height * 0.6],
      end: [BASE_X + t * spread, BASE_Y - height * lift],
    };
    let drawing = stem(curve, stemWidth, stemColor);
    for (let k = 0; k < leavesPerStem; k++) {
      const at = leafStart + ((leafEnd - leafStart) * k) / Math.max(leavesPerStem - 1, 1);
      const [x, y] = pointOn(curve, at);
      const side = k % 2 ? 1 : -1;
      drawing += drawLeaf(x, y, angleOn(curve, at) + side * 52, 1 - at * 0.35, i * 10 + k);
    }
    const [topX, topY] = curve.end;
    drawing += drawTop(topX, topY, angleOn(curve, 1), i);
    // Los tallos del centro van adelante para dar profundidad.
    if (Math.abs(t) > 0.5) back += drawing;
    else front += drawing;
  }
  return back + front;
};
