const preview = import.meta.env.PUBLIC_PREVIEW === '1';

/** Link naar een pagina, werkt zowel in productie als in de platte preview. */
export const href = (slug: string) => (preview ? `${slug || 'index'}.html` : `/${slug ? slug + '/' : ''}`);

/** Pad naar een bestand in public/, relatief in de preview en absoluut in productie. */
export const asset = (p: string) => (/^https?:/.test(p) ? p : preview ? p : `/${p}`);
