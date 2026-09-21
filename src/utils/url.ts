// Arma links internos respetando la base del sitio (por si se publica en una subcarpeta).
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
