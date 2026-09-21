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
  swallowtail: {
    fore: 'M3,-8 C18,-46 60,-78 104,-72 C108,-48 96,-18 64,-2 C42,6 16,6 3,0 Z',
    hind: 'M3,-2 C30,-8 64,-2 76,20 C80,28 75,32 79,39 C80,46 71,47 71,55 C67,61 60,58 55,64 C48,69 43,62 37,64 C20,60 6,32 3,4 Z',
  },
  // Azufrada (Phoebis): ala delantera con la punta aguda y el borde externo casi recto.
  sulphur: {
    fore: 'M3,-8 C16,-44 56,-70 98,-68 C96,-48 88,-22 66,-3 C44,6 16,6 3,0 Z',
    hind: 'M3,-2 C28,-8 62,-4 75,20 C81,42 60,64 36,60 C16,56 6,30 3,4 Z',
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

const foreMarginDots: [number, number][] = [[102, -60], [105, -50], [103, -40], [98, -30], [91, -20], [82, -11], [71, -5]];
const hindMarginDots: [number, number][] = [[76, 24], [79, 35], [77, 46], [70, 55], [60, 61], [49, 63], [38, 60]];
const ladyApex = 'M58,-72 L112,-72 L112,-30 L80,-34 C70,-40 62,-52 58,-72 Z';

export const butterflyArt: Record<string, ButterflyArt> = {
  // Hembra de Phoebis sennae: amarillo limón liso, una mancha hueca en el ala delantera
  // y marcas negras en el borde. El macho es igual pero sin manchas.
  'limonera-grande': {
    shape: shapes.sulphur,
    fore: '#fbe234',
    hind: '#fde957',
    margin: '#e2b50c',
    marginWidth: 1.4,
    veins: '#e9c526',
    veinWidth: 0.6,
    body: '#9a8a3a',
    antennae: '#c75a6e',
    forePattern:
      blob(26, -20, 22, 11, -38, 'rgb(255 255 255 / 0.22)') +
      `<rect x="44" y="-38" width="9" height="8" rx="3" fill="none" stroke="#2f2412" stroke-width="2.4" transform="rotate(-24 48.5 -34)"/>` +
      [[96, -62, -70], [95, -52, -60], [92, -41, -50], [87, -30, -40], [80, -20, -32], [72, -11, -26]]
        .map(([x, y, a]) => `<path d="M0,-3 L7,0 L0,3 Z" fill="#2f2412" transform="translate(${x} ${y}) rotate(${a + 180})"/>`)
        .join(''),
    hindPattern:
      blob(22, 16, 20, 11, 40, 'rgb(255 255 255 / 0.22)') +
      dots([[76, 28], [75, 40], [69, 51], [58, 59]], 1.7, '#2f2412'),
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
