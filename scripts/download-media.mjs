// Downloadt alle afbeeldingen en video's uit de WordPress-mediabibliotheek van starsolutions-service.be.
// Gebruik (Node 18+), vanuit de projectmap: node scripts/download-media.mjs  → originelen komen in ./star-media/
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SITE = 'https://starsolutions-service.be';
const OUT = 'star-media';

const items = [];
for (let page = 1; ; page++) {
  const res = await fetch(`${SITE}/wp-json/wp/v2/media?per_page=100&page=${page}`);
  if (!res.ok) break;
  const batch = await res.json();
  if (!batch.length) break;
  items.push(...batch);
  if (page >= Number(res.headers.get('x-wp-totalpages') || page)) break;
}
console.log(`${items.length} mediabestanden gevonden`);

let ok = 0;
for (const m of items) {
  if (!/^(image|video)\//.test(m.mime_type || '')) continue;
  const url = m.source_url;
  const rel = url.split('/wp-content/uploads/')[1] || path.basename(url);
  const dest = path.join(OUT, rel);
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error(r.status);
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, Buffer.from(await r.arrayBuffer()));
    ok++;
    console.log('✓', rel);
  } catch (e) {
    console.log('✗', url, e.message);
  }
}
console.log(`Klaar: ${ok} bestanden in ./${OUT}/. Verwerk ze met: python3 scripts/process-media.py`);
