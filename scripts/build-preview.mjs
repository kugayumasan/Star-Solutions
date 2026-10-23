// Bouwt een platte versie (pagina.html, relatieve paden) die je zonder server kunt openen
// of als losse bestanden kunt delen. Werkt op Windows, macOS en Linux.
import { spawnSync } from 'node:child_process';

const r = spawnSync('npx', ['astro', 'build'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: { ...process.env, PUBLIC_PREVIEW: '1' },
});
process.exit(r.status ?? 1);
