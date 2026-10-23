"""Ontdubbelt de gedownloade media, zet ze om naar WebP/MP4 en schrijft public/media + src/data/media.ts.

Gebruik (vanuit de projectmap, na `node scripts/download-media.mjs`):
    pip install pillow   # en ffmpeg moet geïnstalleerd zijn
    python3 scripts/process-media.py
"""
import glob, json, os, re, subprocess, sys
from PIL import Image, ImageOps

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.environ.get('MEDIA_SRC', f'{SITE}/star-media')
OUT = f'{SITE}/public/media'

def g(*pats):
    files = []
    for p in pats:
        files += sorted(glob.glob(f'{SRC}/{p}'), key=lambda f: [int(t) if t.isdigit() else t for t in re.split(r'(\d+)', f)])
    return files

U = '2022/02/WhatsApp-Image-2022-02-20-at-'
# hero first, then gallery. Flyers/logos/QR codes/stock pictures are left out of galleries.
plan = {
    'bouw-renovatie': g('2022/02/WhatsApp-Image-2022-02-20-at-19.19.57-10.jpeg', U + '19.1[489]*', U + '19.2[2]*', U + '19.31*', U + '19.43*'),
    'opleveringsschoonmaak': g('2021/04/schoonmaakstarsolutions5.jpg', '2021/04/schoonmaakstarsolutions7.jpg', '2021/04/schoonmaakstarsolutions9.jpg', '2021/04/schoonmaakstarsolutions1[01].jpg'),
    'algemeen-schoonmaak': g('2021/04/dddd.png', '2021/04/schoonmaakstarsolutions1.jpg', '2021/04/schoonmaakstarsolutions2.jpg', '2021/04/schoonmaakstarsolutions[34678].jpg', '2021/04/schoonmaakstarsolutions1[2-8].jpg', '2021/04/[123]-1.jpg', '2021/04/3.jpg'),
    'bekleding-zetelreiniging': g('2021/04/Zetel_Star_Solutions-1.jpg', '2021/04/Zetel_Star_Solutions.jpg'),
    'detailing-service': g('2021/03/WhatsApp-Image-2021-03-27-at-22.45.23-2.jpeg', '2021/03/WhatsApp-Image-*'),
    'industriele-reiniging': g('2025/05/industrie-star-solutions.jpeg', '2022/02/indutriele-reiniging-1.jpeg', '2022/02/1i*.jpeg', '2022/02/i*.jpeg'),
    'groenonderhoud-tuinwerken': g('2025/05/Tuin-grond-en-groen-star.jpeg', U + '19.29*', '2022/02/dvssd*.jpeg', '2021/04/[12].jpg', '2020/*/groen*.png'),
    'logistiek-inpak': g('2021/04/inpak.png', '2021/04/Inpak.jpg', '2021/04/vlees.jpg'),
    'desinfectie': g('2020/*/WINKEL-DESINFECTIE*', '2020/11/thumbnail_Screenshot_20201117-051200_Instagram.jpg', '2021/04/10.jpg', '2021/04/0*.jpg', '2021/04/1-2.jpg', '2021/04/2-2.jpg', '2021/04/3-1.jpg', '2021/04/[4-9].jpg', '2021/04/10-1.jpg', '2021/04/1[1-9].jpg', '2021/04/2[0-3].jpg'),
}
singles = {
    'hero': '2022/02/i13.jpeg',
    'sector-bouw': '2025/05/bouw-star-solutions.jpg',
    'sector-industrie': '2025/05/industrie-star-solutions.jpeg',
    'sector-tuin': '2025/05/Tuin-grond-en-groen-star.jpeg',
    'over-ons': '2020/11/image.png',
    'aanpak': '2025/05/aanpak-1.png',
    'logo-card': '2025/05/star-solutions-fotoss.jpg',
}
videos = {
    'bekleding-zetelreiniging': '2021/04/73633494_1040079763159159_7700309135218227819_n.mp4',
    'desinfectie': '2020/04/WhatsApp-Video-2020-04-20-at-10.24.10.mp4',
}

def load(path):
    im = Image.open(path)
    im = ImageOps.exif_transpose(im)
    if im.mode == 'CMYK':
        im = im.convert('RGB')
    if im.mode in ('P', 'LA', 'RGBA'):
        im = im.convert('RGBA')
        bg = Image.new('RGB', im.size, 'white'); bg.paste(im, mask=im.split()[3]); im = bg
    return im.convert('RGB')

def dhash(im, n=12):
    s = im.convert('L').resize((n + 1, n), Image.LANCZOS)
    px = list(s.get_flattened_data() if hasattr(s, 'get_flattened_data') else s.getdata())
    return sum(1 << i for i in range(n * n) if px[(i // n) * (n + 1) + i % n] > px[(i // n) * (n + 1) + i % n + 1])

def save(im, dest, long_side, q=78):
    im = im.copy(); im.thumbnail((long_side, long_side), Image.LANCZOS)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    im.save(dest, 'WEBP', quality=q, method=6)
    return im.size

media, seen_global = {}, []
for slug, files in plan.items():
    hashes, items = [], []
    for f in dict.fromkeys(files):
        im = load(f)
        h = dhash(im)
        if any(bin(h ^ o).count('1') <= 10 for o in hashes):
            continue  # near duplicate (-1, -kopie, re-uploads)
        hashes.append(h)
        n = len(items) + 1
        w, hgt = save(im, f'{OUT}/{slug}/{n:02d}.webp', 1600 if n == 1 else 1400)
        save(im, f'{OUT}/{slug}/{n:02d}-sm.webp', 720, 74)
        items.append({'src': f'media/{slug}/{n:02d}.webp', 'sm': f'media/{slug}/{n:02d}-sm.webp', 'w': w, 'h': hgt, 'from': os.path.relpath(f, SRC)})
    media[slug] = {'image': items[0], 'gallery': items[1:]}
    print(slug, len(files), '->', len(items))

single = {}
for key, rel in singles.items():
    im = load(f'{SRC}/{rel}')
    w, h = save(im, f'{OUT}/{key}.webp', 1800 if key == 'hero' else 1400)
    save(im, f'{OUT}/{key}-sm.webp', 720, 74)
    single[key] = {'src': f'media/{key}.webp', 'sm': f'media/{key}-sm.webp', 'w': w, 'h': h, 'from': rel}

# favicon / logo from the CMYK logo
logo = load(f'{SRC}/2020/04/cropped-Star-solutions-Logo-scaled-1.jpg')
logo.resize((180, 180), Image.LANCZOS).save(f'{OUT}/logo-180.png', optimize=True)
logo.resize((32, 32), Image.LANCZOS).save(f'{OUT}/favicon-32.png', optimize=True)

vids = {}
for slug, rel in videos.items():
    dest = f'{OUT}/{slug}/video.mp4'; poster = f'{OUT}/{slug}/video-poster.webp'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{SRC}/{rel}', '-c:v', 'libx264', '-crf', '26', '-preset', 'slow',
                    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-c:a', 'aac', '-b:a', '96k', dest], check=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', '1', '-i', dest, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '75', poster], check=True)
    vids[slug] = {'src': f'media/{slug}/video.mp4', 'poster': f'media/{slug}/video-poster.webp', 'from': rel}

ts = ('// Gegenereerd door process.py uit de mediabibliotheek van starsolutions-service.be. Niet met de hand aanpassen.\n'
      'export type Img = { src: string; sm: string; w: number; h: number; from: string };\n'
      'export type Vid = { src: string; poster: string; from: string };\n'
      f'export const serviceMedia: Record<string, {{ image: Img; gallery: Img[] }}> = {json.dumps(media, indent=2, ensure_ascii=False)};\n'
      f'export const pageMedia: Record<string, Img> = {json.dumps(single, indent=2, ensure_ascii=False)};\n'
      f'export const serviceVideos: Record<string, Vid> = {json.dumps(vids, indent=2, ensure_ascii=False)};\n')
open(f'{SITE}/src/data/media.ts', 'w').write(ts)
