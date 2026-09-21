// Animaciones ligadas al scroll (GSAP + ScrollTrigger).
// No se secuestra el scroll: la página se desplaza de forma nativa y las animaciones
// solo "siguen" la posición. Todo se declara con atributos data-* en el HTML:
//
//   data-reveal             aparece al entrar en pantalla (data-reveal-delay="0.1" opcional)
//   data-parallax="0.3"     se mueve más lento (positivo) o más rápido (negativo) que el scroll
//   data-draw               trazo SVG que se dibuja a medida que cruza la pantalla
//   data-grow               elemento que crece desde su base al cruzar la pantalla
//   data-flyer              mariposa fija que recorre la página siguiendo el scroll

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

// La mariposa viajera: recorre la pantalla en zigzag según el avance total de la página
// y bate las alas en función de los píxeles recorridos (si el scroll se detiene, planea).
function flyAlongPage() {
  const flyer = document.querySelector<HTMLElement>('[data-flyer]');
  if (!flyer) return;

  const waypoints = [
    { x: 78, y: 62, rotation: -18 },
    { x: 10, y: 30, rotation: 22 },
    { x: 90, y: 20, rotation: -26 },
    { x: 8, y: 64, rotation: 16 },
    { x: 92, y: 74, rotation: -12 },
    { x: 88, y: 30, rotation: 8 },
  ];

  const timeline = gsap.timeline({
    scrollTrigger: {
      start: 0,
      end: 'max',
      scrub: 0.8,
      onUpdate: (self) => {
        const flap = Math.abs(Math.sin(self.scroll() / 42));
        flyer.style.setProperty('--flap', flap.toFixed(3));
      },
    },
  });

  gsap.set(flyer, { left: `${waypoints[0].x}vw`, top: `${waypoints[0].y}vh`, rotation: waypoints[0].rotation, opacity: 1 });
  waypoints.slice(1).forEach((point) => {
    timeline.to(flyer, { left: `${point.x}vw`, top: `${point.y}vh`, rotation: point.rotation, ease: 'sine.inOut' });
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
  flyAlongPage();

  // Las fuentes y las imágenes cambian alturas: se recalculan las posiciones al terminar de cargar.
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
