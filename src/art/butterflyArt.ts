// Kit de ilustración de mariposas.
// Todas comparten cuerpo, antenas, venas y tratamiento del borde; cada especie define solo
// la forma de sus alas, sus colores y su dibujo. Se dibuja el lado derecho (x positivo)
// y el componente lo espeja. El cuerpo está en x = 0.

export interface WingShape {
  fore: string;
  hind: string;
}

export interface ButterflyArt {
  shape: WingShape;
  fore: string;
  hind: string;
  margin: string;
  marginWidth: number;
  veins: string;
  veinWidth: number;
  body: string;
  antennae?: string;
  forePattern: string;
  hindPattern: string;
}

const INK = '#1f1813';
const CREAM = '#fff6dc';

const shapes = {
  nymphalid: {
    fore: 'M3,-8 C14,-40 48,-70 92,-66 C100,-48 90,-20 62,-4 C40,6 16,6 3,0 Z',
    hind: 'M3,-2 C28,-6 62,0 74,24 C82,46 60,68 36,62 C16,56 6,30 3,4 Z',
  },
  longwing: {
    fore: 'M3,-8 C16,-36 56,-64 104,-58 C108,-42 92,-16 60,-2 C40,6 16,6 3,0 Z',
    hind: 'M3,-2 C28,-6 60,0 70,20 C76,40 56,58 34,54 C16,50 6,28 3,4 Z',
  },
  monarch: {
    fore: 'M3,-8 C16,-42 58,-74 106,-66 C112,-46 96,-14 62,0 C40,8 16,6 3,0 Z',
    hind: 'M3,-2 C30,-8 68,0 78,26 C84,50 60,70 36,64 C16,58 6,30 3,4 Z',
  },
  // Papilio con colas (Heraclides): ala delantera alargada y colas en forma de cuchara.
  tailedSwallowtail: {
    fore: 'M3,-8 C18,-46 62,-82 110,-76 C107,-52 92,-24 68,-4 C46,4 18,6 3,0 Z',
    hind: 'M3,-2 C30,-8 64,-4 76,14 C80,20 76,24 79,30 C80,37 72,38 72,45 C70,51 63,50 61,56 L63,74 C64,81 56,83 55,77 L51,60 C45,64 40,60 34,62 C20,58 6,32 3,4 Z',
  },
  swallowtail: {
    fore: 'M3,-8 C18,-46 60,-78 104,-72 C108,-48 96,-18 64,-2 C42,6 16,6 3,0 Z',
    hind: 'M3,-2 C30,-8 64,-2 76,20 C80,28 75,32 79,39 C80,46 71,47 71,55 C67,61 60,58 55,64 C48,69 43,62 37,64 C20,60 6,32 3,4 Z',
  },
  pierid: {
    fore: 'M3,-8 C14,-44 50,-68 90,-60 C99,-44 92,-16 64,-2 C42,6 16,6 3,0 Z',
    hind: 'M3,-2 C26,-8 60,-4 72,22 C78,46 58,66 36,62 C16,56 6,30 3,4 Z',
  },
  buckeye: {
    fore: 'M3,-8 C14,-42 50,-70 90,-68 C96,-60 92,-52 96,-44 C92,-22 78,-8 60,-2 C40,6 16,6 3,0 Z',
    hind: 'M3,-2 C28,-6 62,0 74,24 C82,46 60,68 36,62 C16,56 6,30 3,4 Z',
  },
} satisfies Record<string, WingShape>;

const dot = (x: number, y: number, r: number, fill: string) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;

const dots = (points: [number, number][], r: number, fill: string) => points.map(([x, y]) => dot(x, y, r, fill)).join('');

const blob = (x: number, y: number, rx: number, ry: number, angle: number, fill: string) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" transform="rotate(${angle} ${x} ${y})"/>`;

// Ocelo: anillos concéntricos, de afuera hacia adentro.
const eyespot = (x: number, y: number, r: number, ring: string, pupil: string) =>
  dot(x, y, r, ring) + dot(x, y, r * 0.74, INK) + dot(x - r * 0.12, y - r * 0.1, r * 0.36, pupil) + dot(x - r * 0.22, y - r * 0.22, r * 0.13, CREAM);

const line = (d: string, stroke: string, width: number) =>
  `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;

// Banda de segmentos rectangulares entre dos puntos, separados por una línea fina del color de fondo
// (como las venas que cortan la banda en los papiliónidos). El ancho pasa de widthStart a widthEnd.
const band = (from: [number, number], to: [number, number], count: number, widthStart: number, widthEnd: number, fill: string) => {
  const [dx, dy] = [to[0] - from[0], to[1] - from[1]];
  const step = Math.hypot(dx, dy) / count;
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  let segments = '';
  for (let i = 0; i < count; i++) {
    const t = (i + 0.5) / count;
    const width = widthStart + (widthEnd - widthStart) * t;
    const length = step - 1.1;
    const [cx, cy] = [from[0] + dx * t, from[1] + dy * t];
    segments += `<rect x="${(-length / 2).toFixed(1)}" y="${(-width / 2).toFixed(1)}" width="${length.toFixed(1)}" height="${width.toFixed(1)}" rx="2" fill="${fill}" transform="translate(${cx.toFixed(1)} ${cy.toFixed(1)}) rotate(${angle.toFixed(1)})"/>`;
  }
  return segments;
};

const foreMarginDots: [number, number][] = [[102, -60], [105, -50], [103, -40], [98, -30], [91, -20], [82, -11], [71, -5]];
const hindMarginDots: [number, number][] = [[76, 24], [79, 35], [77, 46], [70, 55], [60, 61], [49, 63], [38, 60]];
const ladyApex = 'M58,-72 L112,-72 L112,-30 L80,-34 C70,-40 62,-52 58,-72 Z';

export const butterflyArt: Record<string, ButterflyArt> = {
  // Heraclides thoas: negra con una banda diagonal de manchas amarillas que cruza las cuatro alas,
  // medialunas amarillas cerca del borde y colas con el centro amarillo.
  'limonera-grande': {
    shape: shapes.tailedSwallowtail,
    fore: '#1c1814',
    hind: '#1a1612',
    margin: '#0f0d0b',
    marginWidth: 3,
    veins: '#2c2723',
    veinWidth: 0.9,
    body: '#14110f',
    forePattern:
      // Banda diagonal desde cerca de la punta hasta el cuerpo, cada vez más ancha.
      band([88, -66], [8, -4], 8, 6.5, 16, '#f5cf2e') +
      dots([[101, -66], [100, -55], [95, -43], [88, -32], [80, -22], [70, -13]], 1.9, '#f5cf2e'),
    hindPattern:
      // En el ala trasera la banda sigue la línea del ala delantera: cruza horizontal por la parte de arriba.
      band([6, 5], [72, 22], 6, 16, 9, '#f5cf2e') +
      blob(70, 34, 4.2, 2, 95, '#f5cf2e') + blob(64, 45, 4, 2, 120, '#f5cf2e') +
      blob(54, 54, 3.8, 1.9, 145, '#f5cf2e') + blob(43, 58, 3.4, 1.8, 168, '#f5cf2e') + blob(33, 57, 3, 1.6, 185, '#f5cf2e') +
      blob(59, 70, 1.6, 4.6, -8, '#f5cf2e'),
  },
  'bordes-de-oro': {
    shape: shapes.swallowtail,
    fore: '#221d19',
    hind: '#1d1a17',
    margin: '#0f0d0b',
    marginWidth: 4,
    veins: '#3c4a3a',
    veinWidth: 0.9,
    body: '#14110f',
    forePattern:
      blob(91, -54, 5, 3.2, 70, '#f3c93a') + blob(88, -42, 5.5, 3.4, 66, '#f3c93a') + blob(82, -30, 6, 3.6, 58, '#f3c93a') +
      blob(73, -19, 6, 3.6, 48, '#f3c93a') + blob(62, -10, 6, 3.4, 36, '#f3c93a'),
    hindPattern:
      blob(62, 16, 7, 4.4, 60, '#f3c93a') + blob(66, 30, 7, 4.4, 88, '#f3c93a') + blob(61, 44, 7, 4.4, 118, '#f3c93a') +
      blob(50, 53, 6.5, 4.2, 150, '#f3c93a') + blob(37, 55, 6, 4, 178, '#f3c93a') + blob(25, 48, 5, 3.6, 40, '#f3c93a'),
  },
  'monarca-del-sur': {
    shape: shapes.monarch,
    fore: '#f08a24',
    hind: '#f39a3a',
    margin: INK,
    marginWidth: 9,
    veins: INK,
    veinWidth: 2,
    body: INK,
    forePattern:
      `<path d="M66,-76 L116,-76 L116,-34 L88,-40 C78,-46 70,-58 66,-76 Z" fill="${INK}"/>` +
      blob(80, -58, 4.4, 2.6, -20, '#f9b872') + blob(90, -51, 4.4, 2.6, -10, '#f9b872') + blob(96, -42, 3.6, 2.2, 10, '#f9b872') +
      dots(foreMarginDots, 1.7, CREAM),
    hindPattern: dots(hindMarginDots, 1.7, CREAM),
  },
  espejito: {
    shape: shapes.longwing,
    fore: '#f2701c',
    hind: '#f58428',
    margin: '#2a1a10',
    marginWidth: 5,
    veins: '#2a1a10',
    veinWidth: 1.3,
    body: '#3a2414',
    forePattern:
      [[36, -28], [46, -35], [42, -22]].map(([x, y]) => dot(x, y, 3.4, INK) + dot(x, y, 1.3, CREAM)).join('') +
      blob(92, -48, 5, 2, -50, INK) + blob(90, -36, 5, 2, -36, INK) + blob(83, -25, 5, 2, -24, INK) + blob(73, -15, 5, 2, -14, INK),
    hindPattern: [[61, 16], [65, 27], [61, 38], [52, 46], [41, 48]]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="#f9a24c" stroke="${INK}" stroke-width="2"/>`)
      .join(''),
  },
  hortensia: {
    shape: shapes.nymphalid,
    fore: '#e8953a',
    hind: '#eca24a',
    margin: '#3a2414',
    marginWidth: 5,
    veins: '#8a4f1a',
    veinWidth: 1,
    body: '#3a2414',
    forePattern:
      line('M46,-58 L52,-46 L45,-36 L53,-26 L46,-16 L53,-5', '#3a2414', 1.8) +
      line('M26,-36 L32,-27 L26,-19', '#3a2414', 1.8) +
      dots([[78, -52], [81, -42], [79, -32], [73, -22], [65, -13]], 2.3, '#3a2414'),
    hindPattern:
      line('M10,20 L24,14 L36,22 L48,16 L60,26', '#3a2414', 1.8) +
      dots([[62, 22], [66, 33], [63, 44], [54, 52], [43, 56], [31, 53]], 2.3, '#3a2414'),
  },
  cenicienta: {
    shape: shapes.pierid,
    fore: '#8f9be3',
    hind: '#a3adea',
    margin: '#4b4a72',
    marginWidth: 4,
    veins: '#6f78c4',
    veinWidth: 0.8,
    body: '#4b4a72',
    forePattern: blob(24, -18, 22, 12, -40, 'rgb(255 255 255 / 0.28)'),
    hindPattern:
      blob(22, 18, 20, 12, 40, 'rgb(255 255 255 / 0.28)') + dot(60, 48, 3, INK) + dot(51, 56, 2.4, INK) +
      dot(60, 48, 1, '#9fe0d8') + dot(51, 56, 0.8, '#9fe0d8'),
  },
  'cuatro-ojos': {
    shape: shapes.buckeye,
    fore: '#6d4a2c',
    hind: '#74502f',
    margin: '#3a2414',
    marginWidth: 4,
    veins: '#4f351f',
    veinWidth: 0.9,
    body: '#3a2414',
    forePattern:
      `<path d="M60,-66 C70,-52 84,-40 100,-36 L100,-20 C82,-24 62,-38 50,-58 Z" fill="#e9c27a"/>` +
      blob(24, -24, 6.5, 2.4, -58, '#f28c28') + blob(33, -30, 6.5, 2.4, -58, '#f28c28') +
      eyespot(68, -22, 10, '#f28c28', '#7e8fe0') + eyespot(86, -50, 4.4, '#f28c28', '#7e8fe0'),
    hindPattern:
      line('M70,14 C80,34 66,60 40,60', '#f28c28', 5) + eyespot(50, 22, 11, '#f28c28', '#7e8fe0') + eyespot(44, 45, 6, '#f28c28', '#7e8fe0'),
  },
  'dama-pintada': {
    shape: shapes.nymphalid,
    fore: '#ef8458',
    hind: '#f29468',
    margin: '#2a1a10',
    marginWidth: 5,
    veins: '#b2522a',
    veinWidth: 0.9,
    body: '#4a3222',
    forePattern:
      `<path d="${ladyApex}" fill="${INK}"/>` + blob(70, -50, 7, 3, -34, CREAM) + dots([[86, -58], [92, -48], [90, -38]], 2.2, CREAM) +
      blob(40, -30, 7, 4, -40, INK) + blob(54, -16, 7, 3.6, -20, INK) + blob(30, -12, 5, 3, -30, INK),
    hindPattern:
      eyespot(58, 34, 6.4, INK, '#6f8fe6') + eyespot(44, 50, 6.4, INK, '#6f8fe6') + dots([[68, 20], [30, 56]], 2.2, INK) +
      blob(20, 26, 12, 7, 50, 'rgb(74 50 34 / 0.35)'),
  },
  'dama-manchada': {
    shape: shapes.nymphalid,
    fore: '#e9743a',
    hind: '#ee8648',
    margin: '#2a1a10',
    marginWidth: 5,
    veins: '#a8481e',
    veinWidth: 0.9,
    body: '#4a3222',
    forePattern:
      `<path d="${ladyApex}" fill="${INK}"/>` + blob(70, -50, 7, 3, -34, '#f9b872') + dots([[86, -58], [92, -48], [90, -38]], 2.2, CREAM) +
      blob(42, -32, 6, 3.6, -40, INK) + blob(52, -17, 6.5, 3.2, -20, INK) + blob(32, -13, 5, 3, -30, INK),
    hindPattern:
      [[65, 22], [65, 34], [59, 45], [49, 53]].map(([x, y]) => eyespot(x, y, 3.8, INK, '#6f8fe6')).join('') +
      blob(20, 26, 12, 7, 50, 'rgb(74 50 34 / 0.35)'),
  },
  bataraza: {
    shape: shapes.nymphalid,
    fore: '#3c2b1f',
    hind: '#45311f',
    margin: '#1f1813',
    marginWidth: 4,
    veins: '#2a1d14',
    veinWidth: 0.9,
    body: '#1f1813',
    forePattern:
      dots([[44, -40], [58, -47], [71, -41], [84, -53]], 3.6, CREAM) + dots([[60, -27], [74, -25], [48, -16]], 3, '#f6e6b4') +
      dots([[86, -38], [80, -14]], 2, CREAM),
    hindPattern:
      line('M12,14 C32,9 54,15 66,30', '#f6e6b4', 8) + blob(62, 44, 3.4, 1.8, 120, '#f28c28') + blob(52, 54, 3.4, 1.8, 150, '#f28c28') +
      blob(40, 58, 3.4, 1.8, 175, '#f28c28'),
  },
};

// Venas compartidas por todas las especies: salen de la base del ala hacia el borde.
export const foreVeins = 'M4,-4 L92,-64 M4,-4 L100,-46 M4,-4 L92,-26 M4,-4 L76,-10 M4,-4 L56,-1';
export const hindVeins = 'M4,2 L72,14 M4,2 L79,36 M4,2 L66,58 M4,2 L44,64 M4,2 L24,56';
