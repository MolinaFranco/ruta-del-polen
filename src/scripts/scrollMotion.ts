// Animaciones ligadas al scroll (GSAP + ScrollTrigger).
// No se secuestra el scroll: la página se desplaza de forma nativa y las animaciones
// solo "siguen" la posición. Todo se declara con atributos data-* en el HTML:
//
//   data-reveal             aparece al entrar en pantalla (data-reveal-delay="0.1" opcional)
//   data-parallax="0.3"     se mueve más lento (positivo) o más rápido (negativo) que el scroll
//   data-draw               trazo SVG que se dibuja a medida que cruza la pantalla
//   data-grow               elemento que crece desde su base al cruzar la pantalla
//   data-flyer              mariposa fija que recorre la página siguiendo el scroll
//   data-pan                escena más ancha que la pantalla que se desplaza al scrollear

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function revealOnEnter() {
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%',
    once: true,
    onEnter: (elements) =>
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.09,
        delay: (_index, element) => Number((element as HTMLElement).dataset.revealDelay ?? 0),
      }),
  });
}

function parallaxLayers() {
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((layer) => {
    const speed = Number(layer.dataset.parallax);
    const trigger = layer.closest<HTMLElement>('[data-parallax-scene]') ?? layer;
    gsap.fromTo(
      layer,
      { yPercent: -speed * 50 },
      { yPercent: speed * 50, ease: 'none', scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });
}

function drawStrokes() {
  gsap.utils.toArray<SVGPathElement>('[data-draw]').forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: `0.1 ${length}`, strokeDashoffset: 0 });
    gsap.to(path, {
      strokeDasharray: `${length} ${length}`,
      ease: 'none',
      scrollTrigger: { trigger: path.closest('svg'), start: 'top 75%', end: 'bottom 55%', scrub: 0.6 },
    });
  });
}

function growElements() {
  gsap.utils.toArray<SVGElement>('[data-grow]').forEach((element) => {
    const order = Number(element.dataset.grow);
    gsap.fromTo(
      element,
      { scale: 0, transformOrigin: '50% 100%' },
      {
        scale: 1,
        ease: 'back.out(1.6)',
        scrollTrigger: { trigger: element.closest('svg'), start: `top ${78 - order * 5}%`, end: `top ${48 - order * 5}%`, scrub: 0.6 },
      },
    );
  });
}

// La mariposa viajera: recorre la pantalla según el avance total de la página y bate las alas
// en función de los píxeles recorridos (si el scroll se detiene, planea).
// En pantallas anchas vuela en zigzag; en el celular se queda cerca del borde derecho
// para no pasar por encima de los textos.
const flightPaths = {
  wide: [
    { x: 78, y: 62, rotation: -18 },
    { x: 10, y: 30, rotation: 22 },
    { x: 90, y: 20, rotation: -26 },
    { x: 8, y: 64, rotation: 16 },
    { x: 92, y: 74, rotation: -12 },
    { x: 88, y: 30, rotation: 8 },
  ],
  narrow: [
    { x: 86, y: 70, rotation: -14 },
    { x: 91, y: 38, rotation: 12 },
    { x: 87, y: 22, rotation: -18 },
    { x: 92, y: 56, rotation: 10 },
    { x: 88, y: 76, rotation: -8 },
    { x: 91, y: 34, rotation: 6 },
  ],
};

function flyAlongPage() {
  const flyer = document.querySelector<HTMLElement>('[data-flyer]');
  if (!flyer) return;

  // Las alas se pliegan con el atributo SVG `transform` y no con CSS: el atributo siempre escala
  // alrededor de x = 0 del dibujo, que es el eje del cuerpo, en cualquier navegador y dispositivo.
  // Con CSS (transform-origin + transform-box) cada motor ubica el origen distinto y las alas se despegaban.
  const wings = flyer.querySelectorAll<SVGGElement>('[data-wing]');
  const setFlap = (flap: number) => {
    const scale = (1 - flap * 0.6).toFixed(3);
    wings.forEach((wing) => wing.setAttribute('transform', `scale(${scale} 1)`));
  };

  const fly = (waypoints: typeof flightPaths.wide) => {
    gsap.set(flyer, { left: `${waypoints[0].x}vw`, top: `${waypoints[0].y}vh`, rotation: waypoints[0].rotation, opacity: 1 });
    const timeline = gsap.timeline({
      scrollTrigger: {
        start: 0,
        end: 'max',
        scrub: 0.8,
        onUpdate: (self) => setFlap(Math.abs(Math.sin(self.scroll() / 42))),
      },
    });
    waypoints.slice(1).forEach((point) => {
      timeline.to(flyer, { left: `${point.x}vw`, top: `${point.y}vh`, rotation: point.rotation, ease: 'sine.inOut' });
    });
  };

  // matchMedia rearma el vuelo si se gira el celular o se cambia el tamaño de la ventana.
  const media = gsap.matchMedia();
  media.add('(max-width: 47.99rem)', () => fly(flightPaths.narrow));
  media.add('(min-width: 48rem)', () => fly(flightPaths.wide));
}

// Escenas más anchas que la pantalla (en el celular): se desplazan de izquierda a derecha
// mientras se scrollea, como una cámara que sigue la ruta.
function panWideScenes() {
  gsap.utils.toArray<HTMLElement>('[data-pan]').forEach((scene) => {
    const art = scene.firstElementChild as HTMLElement;
    const overflow = () => Math.max(art.getBoundingClientRect().width - scene.clientWidth, 0);
    gsap.fromTo(
      art,
      { x: 0 },
      {
        x: () => -overflow(),
        ease: 'none',
        scrollTrigger: { trigger: scene, start: 'top 75%', end: 'bottom 55%', scrub: 0.6, invalidateOnRefresh: true },
      },
    );
  });
}

// Los links a anclas de la misma página se desplazan suave. Se hace acá y no con
// `scroll-behavior: smooth` en CSS porque esa regla interfiere con los cálculos de ScrollTrigger.
function smoothAnchorLinks() {
  document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = new URL(link.href);
      if (target.pathname !== location.pathname || !target.hash) return;
      const section = document.querySelector(target.hash);
      if (!section) return;
      event.preventDefault();
      section.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', target.hash);
    });
  });
}

export function initScrollMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  smoothAnchorLinks();

  gsap.registerPlugin(ScrollTrigger);
  revealOnEnter();
  parallaxLayers();
  drawStrokes();
  growElements();
  panWideScenes();
  flyAlongPage();

  // Las fuentes y las imágenes cambian alturas: se recalculan las posiciones al terminar de cargar.
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
