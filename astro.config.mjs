// @ts-check
import { defineConfig } from 'astro/config';

// Sitio 100% estático: se puede publicar en Cloudflare Pages o en cualquier hosting de archivos.
// Si alguna vez se sirve desde una subcarpeta, agregar acá `base: '/subcarpeta'`.
export default defineConfig({
  trailingSlash: 'always',
});
