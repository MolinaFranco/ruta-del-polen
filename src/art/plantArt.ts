// Una ilustración por planta, armada con las piezas de plantKit.
import { BASE_X, BASE_Y, angleOn, backAlong, circle, cluster, daisy, jitter, leaf, palmateLeaf, petalFlower, pinnateLeaf, plume, pointOn, stem, tubeFlower, twig, upright } from './plantKit';
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
  const leafSpots: [number, number, number][] = [[0, 0.45, -150], [0, 0.9, 20], [1, 0.62, 10], [1, 0.95, 170], [2, 0.5, -170], [2, 1, -40]];
  leafSpots.forEach(([segment, t, angle]) => {
    const [x, y] = pointOn(vine[segment], t);
    drawing += palmateLeaf(x, y, angle, 30, 5, green.mid, green.dark);
  });
  // Zarcillos: salen de la guía y se enrulan.
  const [tx1, ty1] = pointOn(vine[1], 0.45);
  const [tx2, ty2] = pointOn(vine[2], 0.2);
  drawing += `<path d="M${tx1},${ty1} c8,-2 14,4 10,9 c-3,3 -7,0 -4,-3" fill="none" stroke="${green.light}" stroke-width="1.6" stroke-linecap="round"/>`;
  drawing += `<path d="M${tx2},${ty2} c-8,-3 -15,3 -11,8 c3,3 7,0 4,-3" fill="none" stroke="${green.light}" stroke-width="1.6" stroke-linecap="round"/>`;

  const passionFlower = (x: number, y: number, r: number) => {
    let flower = petalFlower(x, y, r, 10, CREAM, '#efe3bd', CREAM);
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * Math.PI * 2;
      flower += `<path d="M${x + Math.cos(a) * r * 0.2},${y + Math.sin(a) * r * 0.2} L${x + Math.cos(a) * r * 0.7},${y + Math.sin(a) * r * 0.7}" stroke="${i % 2 ? '#5b6fd1' : '#8e6bbf'}" stroke-width="1.5" stroke-linecap="round"/>`;
    }
    return flower + circle(x, y, r * 0.2, '#efe3bd') + circle(x, y, r * 0.11, '#7fb04f') + circle(x - r * 0.12, y - r * 0.18, 1.6, '#f6c435') + circle(x + r * 0.16, y - r * 0.1, 1.6, '#f6c435') + circle(x, y + r * 0.2, 1.6, '#f6c435');
  };
  // Cada flor nace de un nudo de la guía, con un pedicelo que la sostiene.
  const node1 = pointOn(vine[1], 0.28);
  const node2 = pointOn(vine[2], 0.35);
  const flower1: [number, number] = [node1[0] + 26, node1[1] + 4];
  const flower2: [number, number] = [node2[0] - 24, node2[1] + 12];
  drawing += twig(node1, flower1, 2, green.dark, -0.2) + twig(node2, flower2, 2, green.dark, 0.2);
  drawing += passionFlower(flower1[0], flower1[1], 21) + passionFlower(flower2[0], flower2[1], 17);
  // Fruto colgando de la guía.
  const fruitNode = pointOn(vine[0], 0.62);
  const fruit: [number, number] = [fruitNode[0] - 10, fruitNode[1] + 24];
  drawing += twig(fruitNode, [fruit[0], fruit[1] - 11], 1.8, green.dark, 0.15);
  drawing += `<ellipse cx="${fruit[0]}" cy="${fruit[1]}" rx="9" ry="12" fill="#f28c28"/><ellipse cx="${fruit[0] - 3}" cy="${fruit[1] - 4}" rx="3" ry="5" fill="rgb(255 255 255 / 0.3)"/>`;
  return drawing;
}

// Ruda: subarbusto de hojas divididas color verde azulado y ramilletes de florcitas amarillas.
function ruda() {
  const glaucous = { color: '#8fb8a3', shade: '#6a937f' };
  return upright({
    stems: 7, height: 148, spread: 60, stemWidth: 2.2, stemColor: '#6a937f', leavesPerStem: 5, leafEnd: 0.8,
    drawLeaf: (x, y, angle, scale) => pinnateLeaf(x, y, angle, 26 * scale, 3, glaucous.color, glaucous.shade),
    drawTop: (x, y, angle, i) => {
      let flowers = '';
      const spots: [number, number][] = [[-10, -4], [9, -6], [-2, -13]];
      spots.forEach(([dx, dy], k) => {
        const end: [number, number] = [x + dx, y + dy];
        flowers += twig([x, y], end, 1.2, glaucous.shade, k % 2 ? -0.2 : 0.2) + petalFlower(end[0], end[1], 5.5, 4, '#ecd334', '#d9bd1f', '#9ab04a', (i + k) * 20);
      });
      return flowers + petalFlower(x, y, 5.5, 4, '#ecd334', '#d9bd1f', '#9ab04a', angle);
    },
  });
}

// Tasi: enredadera que se enrosca en una caña, con hojas opuestas, ramilletes de flores blancas
// y su fruto grande, verde y con forma de pera.
function tasi() {
  let drawing = `<path d="M100,214 L100,22" stroke="#c9a36a" stroke-width="4" stroke-linecap="round"/>`;
  [176, 132, 88, 48].forEach((y) => (drawing += `<path d="M97,${y} L103,${y}" stroke="#a88450" stroke-width="2.4" stroke-linecap="round"/>`));
  const vine: Curve[] = [
    { start: [100, 214], control: [76, 192], end: [100, 172] },
    { start: [100, 172], control: [124, 152], end: [100, 132] },
    { start: [100, 132], control: [76, 112], end: [100, 92] },
    { start: [100, 92], control: [124, 72], end: [100, 54] },
    { start: [100, 54], control: [80, 40], end: [104, 26] },
  ];
  vine.forEach((curve) => (drawing += stem(curve, 2.6, green.dark)));
  const leafColor = { color: '#7fa58a', shade: '#5d846a' };
  let front = '';
  vine.forEach((curve, i) => {
    const [x, y] = pointOn(curve, 0.5);
    const along = angleOn(curve, 0.5);
    // Hojas opuestas en cada nudo.
    drawing += leaf(x, y, along - 70, 26 - i * 2, 7, leafColor.color, leafColor.shade) + leaf(x, y, along + 70, 26 - i * 2, 7, leafColor.color, leafColor.shade);
    // Ramilletes de flores en los nudos 1 y 3.
    if (i === 1 || i === 3) {
      const side = i === 1 ? 1 : -1;
      const center: [number, number] = [x + side * 22, y - 6];
      front += twig([x, y], center, 1.4, green.dark, side * -0.2);
      [[0, 0], [side * 8, 7], [side * -3, 10]].forEach(([dx, dy], k) => {
        front += petalFlower(center[0] + dx, center[1] + dy, 7, 5, '#ffffff', '#efe6cf', '#e9c9a1', k * 36);
      });
    }
  });
  // Fruto colgando del nudo 2.
  const [nx, ny] = pointOn(vine[2], 0.5);
  const fruitTop: [number, number] = [nx - 20, ny + 12];
  front += twig([nx, ny], fruitTop, 1.8, green.dark, 0.2);
  const [fx, fy] = fruitTop;
  front += `<path d="M${fx},${fy} C${fx - 7},${fy + 4} ${fx - 14},${fy + 16} ${fx - 12},${fy + 28} C${fx - 10},${fy + 38} ${fx + 10},${fy + 38} ${fx + 12},${fy + 28} C${fx + 14},${fy + 16} ${fx + 7},${fy + 4} ${fx},${fy} Z" fill="#9cc26f"/>`;
  front += `<path d="M${fx},${fy} C${fx + 7},${fy + 4} ${fx + 14},${fy + 16} ${fx + 12},${fy + 28} C${fx + 10},${fy + 38} ${fx},${fy + 36} ${fx},${fy + 36} Z" fill="#7da655"/>`;
  front += `<path d="M${fx - 5},${fy + 8} C${fx - 8},${fy + 18} ${fx - 7},${fy + 28} ${fx - 4},${fy + 34} M${fx + 4},${fy + 8} C${fx + 7},${fy + 18} ${fx + 6},${fy + 28} ${fx + 3},${fy + 34}" fill="none" stroke="#6b9446" stroke-width="1"/>`;
  return drawing + front;
}

// Peine de mono: enredadera leñosa que trepa por un alambrado, con hojas de dos folíolos,
// zarcillos, trompetas blanco crema y el fruto erizado que le da el nombre.
function peineDeMono() {
  // Postes a 56 y 144: en el jardín son un alambrado; en la maceta quedan clavados en el borde, como un enrejado.
  let drawing =
    `<path d="M56,214 L56,64 M144,214 L144,64" stroke="#9a7a55" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="M56,82 L144,82 M56,140 L144,140" stroke="#8d8a80" stroke-width="1.4"/>`;
  const vines: Curve[] = [
    { start: [BASE_X, BASE_Y], control: [96, 170], end: [76, 140] },
    { start: [76, 140], control: [66, 136], end: [58, 141] },
    { start: [BASE_X, BASE_Y], control: [104, 170], end: [124, 140] },
    { start: [124, 140], control: [134, 136], end: [142, 141] },
    { start: [BASE_X, BASE_Y], control: [98, 130], end: [98, 82] },
    { start: [98, 82], control: [78, 76], end: [58, 83] },
    { start: [98, 82], control: [120, 76], end: [142, 83] },
  ];
  vines.forEach((curve) => (drawing += stem(curve, 2.6, '#5a4630')));
  let front = '';
  const nodes: [number, number, number][] = [];
  vines.forEach((curve, i) => {
    [0.35, 0.8].forEach((t, k) => {
      const [x, y] = pointOn(curve, t);
      const along = angleOn(curve, t);
      const up = along - 90 * (i === 4 ? (k % 2 ? 1 : -1) : 1);
      const rad = (up * Math.PI) / 180;
      const [px, py] = [x + Math.cos(rad) * 7, y + Math.sin(rad) * 7];
      // Hoja de dos folíolos sobre un pecíolo, más un zarcillo enrulado.
      drawing += `<path d="M${x.toFixed(1)},${y.toFixed(1)} L${px.toFixed(1)},${py.toFixed(1)}" stroke="${green.dark}" stroke-width="1.4" stroke-linecap="round"/>`;
      drawing += leaf(px, py, up - 34, 17, 7, green.mid, green.dark, 'heart') + leaf(px, py, up + 34, 17, 7, green.mid, green.dark, 'heart');
      drawing += `<path d="M${px.toFixed(1)},${py.toFixed(1)} c${(Math.cos(rad) * 8).toFixed(1)},${(Math.sin(rad) * 8).toFixed(1)} 6,-2 3,3 c-2,3 -5,0 -3,-2" fill="none" stroke="${green.light}" stroke-width="1.2" stroke-linecap="round"/>`;
      nodes.push([x, y, i]);
    });
  });
  // Trompetas colgando de los tallos que corren por los alambres.
  [nodes[3], nodes[7], nodes[11], nodes[13]].forEach(([x, y], k) => {
    const tip: [number, number] = [x + (k % 2 ? 4 : -4), y + 8];
    front += twig([x, y], tip, 1.3, green.dark, 0.1) + tubeFlower(tip[0], tip[1], 90 + (k % 2 ? -14 : 14), 28, '#f7efd2', '#e6d8a6', green.light);
  });
  // El fruto: una cápsula elíptica cubierta de cerdas, como un peine.
  const [cx0, cy0] = nodes[9];
  const capsule: [number, number] = [cx0 + 6, cy0 + 26];
  front += twig([cx0, cy0], [capsule[0], capsule[1] - 15], 1.6, '#5a4630', -0.1);
  let bristles = '';
  for (let k = 0; k < 26; k++) {
    const a = (k / 26) * Math.PI * 2;
    const [bx, by] = [capsule[0] + Math.cos(a) * 7, capsule[1] + Math.sin(a) * 14];
    const [ex, ey] = [capsule[0] + Math.cos(a) * 11, capsule[1] + Math.sin(a) * 18];
    bristles += `<path d="M${bx.toFixed(1)},${by.toFixed(1)} L${ex.toFixed(1)},${ey.toFixed(1)}" stroke="#7a8a3c" stroke-width="1.2" stroke-linecap="round"/>`;
  }
  front += bristles + `<ellipse cx="${capsule[0]}" cy="${capsule[1]}" rx="8" ry="15" fill="#8faa4c"/><path d="M${capsule[0]},${capsule[1] - 15} A8,15 0 0 1 ${capsule[0]},${capsule[1] + 15} Z" fill="#76913a"/>`;
  return drawing + front;
}

// Aristolochia fimbriata: tallos rastreros, hojas acorazonadas con nervaduras plateadas y flores
// que nacen en las axilas de las hojas. La flor parece un patito: la base inflada es el cuerpo,
// el tubo curvo es el cuello y el disco con flecos es la cabeza.
function patito() {
  const runners: Curve[] = [
    { start: [BASE_X, BASE_Y], control: [64, 196], end: [22, 196] },
    { start: [BASE_X, BASE_Y], control: [140, 194], end: [180, 190] },
    { start: [BASE_X, BASE_Y], control: [76, 172], end: [48, 138] },
    { start: [BASE_X, BASE_Y], control: [126, 170], end: [154, 132] },
    { start: [BASE_X, BASE_Y], control: [96, 164], end: [102, 118] },
  ];

  const veinedLeaf = (x: number, y: number, angle: number, size: number) => {
    const leafShape = leaf(0, 0, 0, size, size * 0.42, '#5f9a52', '#3f7a3c', 'heart');
    const vein = '#dcebd0';
    const veins =
      `<path d="M${size * 0.14},0 L${size * 0.9},0" stroke="${vein}" stroke-width="1" stroke-linecap="round"/>` +
      `<path d="M${size * 0.16},0 C${size * 0.3},${-size * 0.26} ${size * 0.52},${-size * 0.3} ${size * 0.68},${-size * 0.18}" fill="none" stroke="${vein}" stroke-width="0.8" stroke-linecap="round"/>` +
      `<path d="M${size * 0.16},0 C${size * 0.3},${size * 0.26} ${size * 0.52},${size * 0.3} ${size * 0.68},${size * 0.18}" fill="none" stroke="${vein}" stroke-width="0.8" stroke-linecap="round"/>`;
    return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${angle.toFixed(1)})">${leafShape}${veins}</g>`;
  };

  // Flor dibujada con origen en la punta del pedicelo; flip = -1 la espeja.
  const duckFlower = (x: number, y: number, flip: number) => {
    let fringe = '';
    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2;
      const [cx, cy] = [14 + Math.cos(a) * 10.5, -38 + Math.sin(a) * 10.5];
      const [fx, fy] = [14 + Math.cos(a) * 16, -38 + Math.sin(a) * 16];
      fringe += `<path d="M${cx.toFixed(1)},${cy.toFixed(1)} L${fx.toFixed(1)},${fy.toFixed(1)}" stroke="#5a2616" stroke-width="1.1" stroke-linecap="round"/><circle cx="${fx.toFixed(1)}" cy="${fy.toFixed(1)}" r="1.1" fill="#5a2616"/>`;
    }
    const speckles = [[12, -40], [16, -36], [11, -35], [17, -41], [14, -43]].map(([sx, sy]) => `<circle cx="${sx}" cy="${sy}" r="0.9" fill="#6e2f1e"/>`).join('');
    return (
      `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${flip} 1)">` +
      `<path d="M1,-11 C2,-20 9,-21 12,-29" fill="none" stroke="#cdc57a" stroke-width="4.6" stroke-linecap="round"/>` +
      `<ellipse cx="0" cy="-6" rx="5.6" ry="7" fill="#ddd79a"/><path d="M0,-13 A5.6,7 0 0 1 0,1 Z" fill="#c4bd74"/>` +
      `<path d="M-2.5,-11 C-3.5,-7 -3.5,-4 -2,-1 M2.5,-11 C3.5,-7 3.5,-4 2,-1" fill="none" stroke="#8a6a3a" stroke-width="0.7"/>` +
      fringe +
      `<circle cx="14" cy="-38" r="10.5" fill="#6e2f1e"/><circle cx="14" cy="-38" r="5.6" fill="#e5d58a"/>${speckles}<circle cx="14" cy="-38" r="1.9" fill="#2a120a"/>` +
      `</g>`
    );
  };

  let drawing = '';
  const nodes: [number, number][][] = [];
  runners.forEach((curve, index) => {
    drawing += stem(curve, 2.4, green.dark);
    const runnerNodes: [number, number][] = [];
    [0.4, 0.7, 1].forEach((t, k) => {
      const [x, y] = pointOn(curve, t);
      // De los dos lados posibles se elige el que apunta más hacia arriba: en una planta rastrera
      // las hojas se levantan buscando luz, nunca cuelgan hacia la tierra.
      const along = angleOn(curve, t);
      const [up, down] = [along - 58, along + 58].sort((a, b) => Math.sin((a * Math.PI) / 180) - Math.sin((b * Math.PI) / 180));
      const direction = k % 2 && Math.sin((down * Math.PI) / 180) < 0.35 ? down : up;
      const rad = (direction * Math.PI) / 180;
      const [px, py] = [x + Math.cos(rad) * 8, y + Math.sin(rad) * 8];
      drawing += `<path d="M${x.toFixed(1)},${y.toFixed(1)} L${px.toFixed(1)},${py.toFixed(1)}" stroke="${green.dark}" stroke-width="1.5" stroke-linecap="round"/>`;
      drawing += veinedLeaf(px, py, direction, 30 - t * 6 - (index > 1 ? 2 : 0));
      runnerNodes.push([x, y]);
    });
    nodes.push(runnerNodes);
  });

  // Dos flores sobre los tallos que suben, cada una mirando hacia afuera con su pedicelo.
  const flowerSpots: [[number, number], number][] = [
    [nodes[2][0], -1],
    [nodes[3][0], 1],
  ];
  flowerSpots.forEach(([[x, y], flip]) => {
    const tip: [number, number] = [x + flip * 5, y - 12];
    drawing += twig([x, y], tip, 1.7, green.dark, flip * -0.3) + duckFlower(tip[0], tip[1], flip);
  });
  return drawing;
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
    const curve: Curve = { start: [BASE_X + t * 8, BASE_Y], control: [BASE_X + t * 24, BASE_Y - height * 0.55], end: [topX, topY] };
    drawing += `<path d="M${BASE_X + t * 8},${BASE_Y} Q${BASE_X + t * 24},${BASE_Y - height * 0.55} ${topX},${topY}" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round" stroke-dasharray="17 2.5"/>`;
    drawing += `<path d="M${BASE_X + t * 8},${BASE_Y} Q${BASE_X + t * 24},${BASE_Y - height * 0.55} ${topX},${topY}" fill="none" stroke="${green.dark}" stroke-width="1.2" stroke-linecap="round"/>`;
    drawing += cluster(topX, topY, 8, 8, 2.6, '#ffffff', '#ecd98f');
    if (i % 3 === 0) {
      const [mx, my] = pointOn(curve, 0.78);
      drawing += cluster(mx, my, 4, 4, 2, '#ffffff', '#ecd98f');
    }
  }
  return drawing;
}

const uprightPlants: Record<string, () => string> = {
  malva: () =>
    upright({
      stems: 4, height: 168, spread: 50, stemWidth: 3, stemColor: green.dark, leavesPerStem: 4,
      drawLeaf: (x, y, angle, scale) => palmateLeaf(x, y, angle, 24 * scale, 5, green.mid, green.dark, 'ovate'),
      drawTop: (x, y, angle, i) => {
        const mallow = (fx: number, fy: number, r: number) => {
          let flower = petalFlower(fx, fy, r, 5, '#c48ad6', '#b377c8', '#f3e2a0', i * 13);
          for (let k = 0; k < 5; k++) flower += `<path d="M${fx},${fy} L${fx + Math.cos(((i * 13 + k * 72) * Math.PI) / 180) * r * 0.8},${fy + Math.sin(((i * 13 + k * 72) * Math.PI) / 180) * r * 0.8}" stroke="#7a3f94" stroke-width="1"/>`;
          return flower + circle(fx, fy, r * 0.2, '#f3e2a0');
        };
        const node = backAlong(x, y, angle, 24);
        const second: [number, number] = [node[0] + (i % 2 ? 15 : -15), node[1] - 2];
        return twig(node, second, 1.6, green.dark, i % 2 ? -0.25 : 0.25) + mallow(second[0], second[1], 10) + mallow(x, y, 13);
      },
    }),
  'malva-blanca': () =>
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
      drawTop: (x, y, _angle, i) => {
        const tip: [number, number] = [x, y];
        const ends: [number, number][] = [[x - 14, y - 9], [x + 14, y - 7], [x + 1, y - 17]];
        const twigs = ends.map((end, k) => twig(tip, end, 1.5, green.dark, k === 0 ? 0.2 : k === 1 ? -0.2 : 0)).join('');
        const heads = ends.map(([ex, ey], k) => cluster(ex, ey, k === 2 ? 8 + (i % 2) : 6.5, k === 2 ? 11 : 8, 2.4, '#a57bd6', '#c9a8ea')).join('');
        return twigs + heads;
      },
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
      drawTop: (x, y, angle) => {
        const [bx, by] = backAlong(x, y, angle, 6);
        return plume(x, y, angle, 44, 11, 46, '#f6c435', '#eeb21e') + plume(bx, by, angle + 38, 24, 6, 18, '#f6c435', '#eeb21e') + plume(bx, by, angle - 38, 24, 6, 18, '#f6c435', '#eeb21e');
      },
    }),
  chinita: () =>
    upright({
      stems: 5, height: 166, spread: 62, stemWidth: 2.4, stemColor: green.dark, leavesPerStem: 5,
      drawLeaf: simpleLeaf(24, 7, green.light, green.mid, 'ovate'),
      drawTop: (x, y, _angle, i) => daisy(x, y - 2, 15 - (i % 2) * 2, 10, i % 2 ? '#e0432b' : '#f0622a', i % 2 ? '#c2301c' : '#d94a1c', '#f6c435'),
    }),
  'cedron-del-monte': () =>
    upright({
      stems: 7, height: 180, spread: 82, stemWidth: 2.4, stemColor: '#8a7350', leavesPerStem: 8,
      drawLeaf: simpleLeaf(15, 4, green.light, green.mid, 'ovate'),
      drawTop: (x, y, angle) => {
        const [bx, by] = backAlong(x, y, angle, 10);
        return plume(x, y, angle, 38, 4.5, 30, '#ffffff', '#ecd98f') + plume(bx, by, angle + 32, 24, 3.5, 16, '#ffffff', '#ecd98f') + plume(bx, by, angle - 32, 24, 3.5, 16, '#ffffff', '#ecd98f');
      },
    }),
};

const specialPlants: Record<string, () => string> = { ruda, tasi, 'peine-de-mono': peineDeMono, mburucuya, patito, 'margarita-punzo': margaritaPunzo, carqueja };

export function drawPlant(id: string): string {
  const draw = uprightPlants[id] ?? specialPlants[id];
  if (!draw) throw new Error(`No illustration for plant: ${id}`);
  return draw();
}
