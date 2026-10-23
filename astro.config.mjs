import { defineConfig } from 'astro/config';

// PUBLIC_PREVIEW=1 bouwt een platte versie (pagina.html) voor de online preview.
const preview = process.env.PUBLIC_PREVIEW === '1';

export default defineConfig({
  site: 'https://starsolutions-service.be',
  build: {
    format: preview ? 'file' : 'directory',
    inlineStylesheets: 'always',
  },
});
