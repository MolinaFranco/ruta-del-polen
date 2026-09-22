// Copia los .svg generados en el build a la carpeta svg/ del proyecto.
// Uso: npm run export:svg
import { cp, rm, readdir } from 'node:fs/promises';

await rm('svg', { recursive: true, force: true });
await cp('dist/svg', 'svg', { recursive: true });

await cp('scripts/svg-readme.md', 'svg/README.md');

const folders = await readdir('svg', { withFileTypes: true });
for (const folder of folders.filter((entry) => entry.isDirectory())) {
  const files = await readdir(`svg/${folder.name}`);
  console.log(`${folder.name}: ${files.length} archivos`);
}
