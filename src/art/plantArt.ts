// Una ilustración por planta, armada con las piezas de plantKit.
import { BASE_X, BASE_Y, angleOn, circle, cluster, daisy, jitter, leaf, palmateLeaf, petalFlower, pinnateLeaf, plume, pointOn, stem, tubeFlower, upright } from './plantKit';
import type { Curve } from './plantKit';

const green = { dark: '#2c5e33', mid: '#4f8a3c', light: '#7fb04f', pale: '#a5cd72', grey: '#9db59a', greyShade: '#7a9679' };
const CREAM = '#fff6dc';

const simpleLeaf = (length: number, width: number, color: string, shade: string, kind: Parameters<typeof leaf>[7] = 'lance') =>
  (x: number, y: number, angle: number, scale: number) => leaf(x, y, angle, length * scale, width * scale, color, shade, kind);

// Espiga de flores tubulares a lo largo de la punta del tallo (salvias, canario rojo).
const tubeSpike = (count: number, length: number, color: string, shade: string, calyx: string) => (x: number, y: number, angle: number) => {
  let drawing = '';
  for (let i = 0; i < count; i++) {
    const back = i * 7;
    const rad = (angle * Math.PI) / 180;
    const side = i % 2 ? 1 : -1;
    drawing += tubeFlower(x - Math.cos(rad) * back, y - Math.sin(rad) * back, angle + side * (38 + i * 4), length * (0.75 + i * 0.07), color, shade, calyx);
  }
  return drawing;
};

function mburucuya() {
  const vine: Curve[] = [
    { start: [BASE_X, BASE_Y], control: [60, 170], end: [96, 132] },
    { start: [96, 132], control: [136, 96], end: [96, 62] },
    { start: [96, 62], control: [70, 40], end: [108, 22] },
  ];
  let drawing = `<path d="M100,214 L100,14" stroke="#b98a5a" stroke-width="3" stroke-linecap="round"/><path d="M70,150 L130,150 M70,84 L130,84" stroke="#b98a5a" stroke-width="2.4" stroke-linecap="round"/>`;
  vine.forEach((curve) => (drawing += stem(curve, 3, green.dark)));
  const leafSpots: [number, number, number][] = [[0, 0.45, -150], [0, 0.9, 20], [1, 0.3, -20], [1, 0.62, 10], [1, 0.95, 170], [2, 0.5, -170], [2, 1, -40]];
  leafSpots.forEach(([segment, t, angle]) => {
    const [x, y] = pointOn(vine[segment], t);
    drawing += palmateLeaf(x, y, angle, 30, 5, green.mid, green.dark);
  });
  // Zarcillos
  drawing += `<path d="M118,100 c10,-2 12,8 5,9 c-5,0 -5,-6 0,-6 M80,48 c-10,-2 -12,8 -5,9 c5,0 5,-6 0,-6" fill="none" stroke="${green.light}" stroke-width="1.6" stroke-linecap="round"/>`;
  const passionFlower = (x: number, y: number, r: number) => {
    let flower = petalFlower(x, y, r, 10, CREAM, '#efe3bd', CREAM);
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * Math.PI * 2;
      flower += `<path d="M${x + Math.cos(a) * r * 0.2},${y + Math.sin(a) * r * 0.2} L${x + Math.cos(a) * r * 0.7},${y + Math.sin(a) * r * 0.7}" stroke="${i % 2 ? '#5b6fd1' : '#8e6bbf'}" stroke-width="1.5" stroke-linecap="round"/>`;
    }
    return flower + circle(x, y, r * 0.2, '#efe3bd') + circle(x, y, r * 0.11, '#7fb04f') + circle(x - r * 0.12, y - r * 0.18, 1.6, '#f6c435') + circle(x + r * 0.16, y - r * 0.1, 1.6, '#f6c435') + circle(x, y + r * 0.2, 1.6, '#f6c435');
  };
  drawing += passionFlower(136, 118, 22) + passionFlower(62, 66, 18);
  drawing += `<ellipse cx="128" cy="176" rx="9" ry="12" fill="#f28c28"/><ellipse cx="125" cy="172" rx="3" ry="5" fill="rgb(255 255 255 / 0.3)"/><path d="M128,164 L120,150" stroke="${green.dark}" stroke-width="1.6"/>`;
  return drawing;
}

function patito() {
  const runners: Curve[] = [
    { start: [BASE_X, BASE_Y], control: [70, 150], end: [34, 168] },
    { start: [BASE_X, BASE_Y], control: [120, 140], end: [168, 150] },
    { start: [BASE_X, BASE_Y], control: [96, 150], end: [84, 104] },
    { start: [BASE_X, BASE_Y], control: [124, 176], end: [156, 198] },
  ];
  let drawing = '';
  runners.forEach((curve, index) => {
    drawing += stem(curve, 2.4, green.dark);
    [0.35, 0.62, 0.95].forEach((t, k) => {
      const [x, y] = pointOn(curve, t);
      const heart = leaf(x, y, angleOn(curve, t) + (k % 2 ? 60 : -60), 24, 9, green.mid, green.dark, 'heart');
      const [vx, vy] = pointOn(curve, t);
      drawing += heart + `<g opacity="0.7">${leaf(vx, vy, angleOn(curve, t) + (k % 2 ? 60 : -60), 20, 1, '#d8e8d0', '#d8e8d0', 'narrow')}</g>`;
    });
    if (index > 2) return;
  });
  // La flor en pipa: tubo curvo amarillento y un disco castaño con flecos.
  const pipe = (x: number, y: number, flip: number) => {
    let flower = `<g transform="translate(${x} ${y}) scale(${flip} 1)"><path d="M0,0 C-10,2 -14,-12 -4,-16 C4,-19 8,-14 10,-20" fill="none" stroke="#c9c46a" stroke-width="7" stroke-linecap="round"/>`;
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      flower += `<path d="M${12 + Math.cos(a) * 11},${-26 + Math.sin(a) * 11} L${12 + Math.cos(a) * 18},${-26 + Math.sin(a) * 18}" stroke="#6b3a1f" stroke-width="1.2" stroke-linecap="round"/>`;
    }
    return flower + `<circle cx="12" cy="-26" r="12" fill="#7a4424"/><circle cx="12" cy="-26" r="12" fill="none" stroke="#e7d98a" stroke-width="1.6" stroke-dasharray="3 3"/><circle cx="12" cy="-26" r="4" fill="#e7d98a"/><circle cx="12" cy="-26" r="1.8" fill="#3a1f10"/></g>`;
  };
  return drawing + pipe(60, 150, 1) + pipe(140, 128, -1);
}

function violeta() {
  let drawing = '';
  for (let i = 0; i < 11; i++) {
    const t = i / 10;
    const angle = -170 + t * 160;
    const length = 46 + jitter(i) * 26;
    const rad = (angle * Math.PI) / 180;
    const x = BASE_X + Math.cos(rad) * length;
    const y = BASE_Y + Math.sin(rad) * length * 0.95;
    drawing += `<path d="M${BASE_X},${BASE_Y} Q${BASE_X + Math.cos(rad) * length * 0.3},${y - 10} ${x},${y}" fill="none" stroke="${green.light}" stroke-width="1.8"/>`;
    drawing += leaf(x, y, angle + (i % 2 ? 25 : -25), 26, 11, i % 2 ? green.mid : green.light, green.dark, 'heart');
  }
  const violet = (x: number, y: number, r: number) =>
    `<path d="M${BASE_X},${BASE_Y} Q${x + 4},${y + 40} ${x},${y + r}" fill="none" stroke="${green.light}" stroke-width="1.6"/>` +
    petalFlower(x, y, r, 5, '#7b4fc0', '#5f379e', '#f6c435', -90) + circle(x, y + r * 0.3, r * 0.2, CREAM);
  return drawing + violet(74, 120, 13) + violet(112, 104, 14) + violet(140, 134, 12) + violet(96, 146, 11);
}

function margaritaPunzo() {
  const runners: Curve[] = [
    { start: [BASE_X, BASE_Y], control: [60, 176], end: [26, 190] },
    { start: [BASE_X, BASE_Y], control: [140, 172], end: [176, 186] },
    { start: [BASE_X, BASE_Y], control: [80, 160], end: [58, 142] },
    { start: [BASE_X, BASE_Y], control: [118, 156], end: [144, 140] },
    { start: [BASE_X, BASE_Y], control: [100, 170], end: [102, 132] },
  ];
  let drawing = '';
  runners.forEach((curve) => {
    drawing += stem(curve, 2, green.dark);
    [0.3, 0.5, 0.7, 0.88].forEach((t, k) => {
      const [x, y] = pointOn(curve, t);
      drawing += leaf(x, y, angleOn(curve, t) + (k % 2 ? 55 : -55), 13, 4, green.mid, green.dark, 'ovate');
    });
  });
  runners.forEach((curve) => (drawing += cluster(curve.end[0], curve.end[1] - 4, 13, 14, 3.4, '#d8322a', '#f05a3c')));
  return drawing;
}

function carqueja() {
  let drawing = '';
  for (let i = 0; i < 13; i++) {
    const t = (i / 12) * 2 - 1;
    const height = 120 - Math.abs(t) * 40 + jitter(i) * 18;
    const topX = BASE_X + t * 66;
    const topY = BASE_Y - height;
    const color = i % 2 ? green.mid : green.light;
    // Tallos alados y articulados: un trazo ancho con "cinturas".
    drawing += `<path d="M${BASE_X + t * 8},${BASE_Y} Q${BASE_X + t * 24},${BASE_Y - height * 0.55} ${topX},${topY}" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round" stroke-dasharray="17 2.5"/>`;
    drawing += `<path d="M${BASE_X + t * 8},${BASE_Y} Q${BASE_X + t * 24},${BASE_Y - height * 0.55} ${topX},${topY}" fill="none" stroke="${green.dark}" stroke-width="1.2" stroke-linecap="round"/>`;
    drawing += cluster(topX, topY, 8, 8, 2.6, '#ffffff', '#ecd98f');
    if (i % 3 === 0) drawing += cluster((BASE_X + t * 24 + topX) / 2 + 4, BASE_Y - height * 0.74, 4, 4, 2, CREAM, '#f3e2a0');
  }
  return drawing;
}

const uprightPlants: Record<string, () => string> = {
  'sen-del-campo': () =>
    upright({
      stems: 5, height: 178, spread: 70, stemWidth: 3, stemColor: '#5a4630', leavesPerStem: 4,
      drawLeaf: (x, y, angle, scale) => pinnateLeaf(x, y, angle, 34 * scale, 4, green.mid, green.dark),
      drawTop: (x, y, _angle, i) =>
        petalFlower(x, y, 11, 5, '#f6c435', '#eeb21e', '#c9801a', i * 20) + petalFlower(x - 12, y + 10, 8, 5, '#f6c435', '#eeb21e', '#c9801a', 30) + petalFlower(x + 11, y + 12, 8, 5, '#f6c435', '#eeb21e', '#c9801a', 10),
    }),
  'bandera-espanola': () =>
    upright({
      stems: 4, height: 170, spread: 52, stemWidth: 2.6, stemColor: green.dark, leavesPerStem: 7,
      drawLeaf: simpleLeaf(30, 5.5, green.mid, green.dark),
      drawTop: (x, y) => cluster(x, y - 4, 16, 18, 3.4, '#d8322a', '#f6b62c'),
    }),
  'jazmin-del-cielo': () =>
    upright({
      stems: 6, height: 160, spread: 84, stemWidth: 2.2, stemColor: green.dark, leavesPerStem: 7,
      drawLeaf: simpleLeaf(17, 5.5, green.light, green.mid, 'ovate'),
      drawTop: (x, y, _angle, i) => {
        let bunch = '';
        [[0, 0], [-10, 6], [10, 5], [-3, -10], [7, -8]].forEach(([dx, dy], k) => (bunch += petalFlower(x + dx, y + dy, 7.5, 5, '#9cc4f2', '#7fadea', '#5b7fd1', (i + k) * 24)));
        return bunch;
      },
    }),
  ruellia: () =>
    upright({
      stems: 5, height: 160, spread: 58, stemWidth: 2.4, stemColor: '#5b4a6a', leavesPerStem: 6,
      drawLeaf: simpleLeaf(36, 3.6, green.dark, '#1f4527', 'narrow'),
      drawTop: (x, y, _angle, i) => petalFlower(x, y - 2, 14, 5, '#8e6bbf', '#7654aa', '#4d2f7a', i * 17) + circle(x, y - 2, 2, '#f3e2a0'),
    }),
  malva: () =>
    upright({
      stems: 4, height: 168, spread: 50, stemWidth: 3, stemColor: green.dark, leavesPerStem: 4,
      drawLeaf: (x, y, angle, scale) => palmateLeaf(x, y, angle, 24 * scale, 5, green.mid, green.dark, 'ovate'),
      drawTop: (x, y, _angle, i) => {
        const mallow = (fx: number, fy: number, r: number) => {
          let flower = petalFlower(fx, fy, r, 5, '#c48ad6', '#b377c8', '#f3e2a0', i * 13);
          for (let k = 0; k < 5; k++) flower += `<path d="M${fx},${fy} L${fx + Math.cos(((i * 13 + k * 72) * Math.PI) / 180) * r * 0.8},${fy + Math.sin(((i * 13 + k * 72) * Math.PI) / 180) * r * 0.8}" stroke="#7a3f94" stroke-width="1"/>`;
          return flower + circle(fx, fy, r * 0.2, '#f3e2a0');
        };
        return mallow(x, y, 13) + mallow(x + (i % 2 ? 14 : -14), y + 24, 10);
      },
    }),
  malvavisco: () =>
    upright({
      stems: 5, height: 172, spread: 62, stemWidth: 2.8, stemColor: green.greyShade, leavesPerStem: 5,
      drawLeaf: (x, y, angle, scale) => palmateLeaf(x, y, angle, 20 * scale, 3, green.grey, green.greyShade, 'ovate'),
      drawTop: (x, y, angle, i) => {
        const rad = (angle * Math.PI) / 180;
        let spike = '';
        for (let k = 0; k < 4; k++) spike += petalFlower(x - Math.cos(rad) * k * 15 + (k % 2 ? 5 : -5), y - Math.sin(rad) * k * 15, 9 - k, 5, '#f29a7a', '#ea8262', '#c94f3a', (i + k) * 30);
        return spike;
      },
    }),
  'canario-rojo': () =>
    upright({
      stems: 5, height: 160, spread: 62, stemWidth: 2.4, stemColor: green.dark, leavesPerStem: 6,
      drawLeaf: simpleLeaf(22, 7, green.mid, green.dark, 'ovate'),
      drawTop: tubeSpike(4, 26, '#e0432b', '#c2301c', green.light),
    }),
  'salvia-azul': () =>
    upright({
      stems: 5, height: 182, spread: 60, stemWidth: 2.6, stemColor: '#3a3358', leavesPerStem: 5, leafEnd: 0.7,
      drawLeaf: simpleLeaf(28, 10, green.mid, green.dark, 'heart'),
      drawTop: tubeSpike(5, 25, '#3f4fc4', '#2b378f', '#2a2350'),
    }),
  lantana: () =>
    upright({
      stems: 6, height: 158, spread: 76, stemWidth: 2.6, stemColor: '#5a4630', leavesPerStem: 5,
      drawLeaf: simpleLeaf(22, 8, green.mid, green.dark, 'ovate'),
      drawTop: (x, y, _angle, i) => cluster(x, y - 3, 15, 18, 3.3, i % 2 ? '#e0432b' : '#f28c28', '#f6c435'),
    }),
  verbena: () =>
    upright({
      stems: 6, height: 190, spread: 66, stemWidth: 1.8, stemColor: green.dark, leavesPerStem: 3, leafStart: 0.12, leafEnd: 0.5,
      drawLeaf: simpleLeaf(26, 4, green.mid, green.dark, 'narrow'),
      drawTop: (x, y, _angle, i) =>
        `<path d="M${x},${y + 22} L${x - 13},${y + 4} M${x},${y + 22} L${x + 13},${y + 6}" stroke="${green.dark}" stroke-width="1.5" stroke-linecap="round"/>` +
        cluster(x - 13, y + 2, 7, 9, 2.4, '#a57bd6', '#c9a8ea') + cluster(x + 13, y + 4, 7, 9, 2.4, '#a57bd6', '#c9a8ea') + cluster(x, y - 2, 9 + (i % 2), 12, 2.6, '#a57bd6', '#c9a8ea'),
    }),
  chilca: () =>
    upright({
      stems: 7, height: 176, spread: 84, stemWidth: 2.6, stemColor: '#5a4630', leavesPerStem: 8,
      drawLeaf: simpleLeaf(30, 4, green.light, green.mid, 'narrow'),
      drawTop: (x, y) => cluster(x, y - 2, 14, 16, 3, '#ffffff', '#ecd98f'),
    }),
  mariposera: () =>
    upright({
      stems: 5, height: 176, spread: 70, stemWidth: 2.6, stemColor: green.dark, leavesPerStem: 6,
      drawLeaf: simpleLeaf(32, 8, green.mid, green.dark),
      drawTop: (x, y) => cluster(x, y - 2, 21, 30, 3, '#ffffff', '#e6cfee') + cluster(x + 3, y - 3, 8, 6, 1.4, '#c7a7d8', '#c7a7d8'),
    }),
  'vara-de-oro': () =>
    upright({
      stems: 5, height: 150, spread: 50, stemWidth: 2.4, stemColor: green.dark, leavesPerStem: 9, leafEnd: 0.95,
      drawLeaf: simpleLeaf(26, 3.4, green.mid, green.dark, 'narrow'),
      drawTop: (x, y, angle) => plume(x, y, angle, 44, 11, 46, '#f6c435', '#eeb21e') + plume(x, y + 6, angle + 38, 24, 6, 18, '#f6c435', '#eeb21e') + plume(x, y + 6, angle - 38, 24, 6, 18, '#f6c435', '#eeb21e'),
    }),
  chinita: () =>
    upright({
      stems: 5, height: 166, spread: 62, stemWidth: 2.4, stemColor: green.dark, leavesPerStem: 5,
      drawLeaf: simpleLeaf(24, 7, green.light, green.mid, 'ovate'),
      drawTop: (x, y, _angle, i) => daisy(x, y - 2, 15 - (i % 2) * 2, 10, i % 2 ? '#e0432b' : '#f0622a', i % 2 ? '#c2301c' : '#d94a1c', '#f6c435'),
    }),
  'azahar-del-monte': () =>
    upright({
      stems: 7, height: 180, spread: 82, stemWidth: 2.4, stemColor: '#8a7350', leavesPerStem: 8,
      drawLeaf: simpleLeaf(15, 4, green.light, green.mid, 'ovate'),
      drawTop: (x, y, angle) => plume(x, y + 4, angle, 38, 4.5, 30, '#ffffff', '#ecd98f') + plume(x, y + 12, angle + 32, 24, 3.5, 16, '#ffffff', '#ecd98f') + plume(x, y + 12, angle - 32, 24, 3.5, 16, '#ffffff', '#ecd98f'),
    }),
};

const specialPlants: Record<string, () => string> = { mburucuya, patito, violeta, 'margarita-punzo': margaritaPunzo, carqueja };

export function drawPlant(id: string): string {
  const draw = uprightPlants[id] ?? specialPlants[id];
  if (!draw) throw new Error(`No illustration for plant: ${id}`);
  return draw();
}
