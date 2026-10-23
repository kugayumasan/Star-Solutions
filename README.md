# Star Solutions website

De nieuwe website van **Star Solutions** uit Gent, een bedrijf voor bouw & renovatie, schoonmaak, industriële reiniging, groenonderhoud, logistiek en desinfectie.
Alle teksten, foto's en video's komen van de vorige site, [starsolutions-service.be](https://starsolutions-service.be/). Het ontwerp, de structuur en de techniek zijn volledig nieuw.

## Tech

| Onderdeel | Keuze |
| --- | --- |
| Framework | [Astro 5](https://astro.build/), dat statische HTML genereert zonder database of server |
| Taal | TypeScript voor de data en `.astro`-componenten voor de pagina's |
| Styling | Eén CSS-bestand met gewone CSS en CSS-variabelen, zonder framework. Er is een lichte en een donkere modus |
| JavaScript | Een klein stukje vanilla JS voor het menu, de scroll-animaties, de fotogalerij en scroll-naar-boven. Er wordt niets extra geladen |
| Lettertypes | Archivo (titels), Figtree (tekst) en JetBrains Mono (labels) via Google Fonts |
| Media | WebP-foto's in twee formaten (groot en `-sm` voor gsm) en MP4-video's, gemaakt met Python (Pillow) en ffmpeg |
| Node | 18.20.8 of nieuwer, 22 LTS aangeraden (`.nvmrc`) |

| Script | Wat het doet |
| --- | --- |
| `npm run dev` | Ontwikkelserver op http://localhost:4321 |
| `npm run build` | Productieversie in `dist/` met mooie URL's (`/over-ons/`) |
| `npm run preview` | De gebouwde versie lokaal bekijken |
| `npm run build:preview` | Platte versie (`over-ons.html`) die zonder webserver werkt |

## De site

**Pagina's (15)**

- **Home**: een hero met teamfoto, de drie werkterreinen (woningrenovatie, industrieel onderhoud en tuinwerkzaamheden), alle diensten, een blok over het tekort aan personeel, de aanpak in vijf stappen en de waarden
- **Diensten**: een overzicht van de tien diensten, gegroepeerd per domein
- **Tien dienstpagina's**: Bouw & Renovatie, Opleveringsschoonmaak, Algemene schoonmaak, Bekleding & zetelreiniging, Car detailing, Industriële reiniging, Sanering & afvalbeheer, Groenonderhoud & tuinwerken, Logistiek & inpak en Desinfectie
- **Aanpak**: de vijf stappen van eerste gesprek tot opvolging
- **Over ons**: de missie, de doelen en de strategiekaart
- **Contact**: de gegevens (7 op 7 bereikbaar) en een offerteformulier

**Op elke dienstpagina**

- Een grote foto, een uitleg, een checklist van wat er gedaan wordt en de pluspunten
- Een fotogalerij "Uit ons werk" met echte projectfoto's. Een foto opent op volledig scherm, en je bladert met pijlen, swipen of de pijltjestoetsen
- Een video, op Zetelreiniging en Desinfectie
- Een offertekaartje dat meescrolt op desktop, links naar verwante diensten en een knop naar de volgende dienst
- Een terugknop en een kruimelpad bovenaan

**Overal**

- Volledig responsive voor gsm, tablet en desktop, zonder horizontaal scrollen
- Een header die verdwijnt bij naar beneden scrollen, een mobiel menu op volledig scherm en een belknop die zichtbaar blijft op gsm
- Elke pagina opent bovenaan, ook via knoppen en footerlinks
- Rustige animaties bij het scrollen, die uitgeschakeld worden als de bezoeker "minder beweging" heeft ingesteld
- Afbeeldingen laden pas wanneer ze in beeld komen, en gsm's krijgen de kleine versie

## Structuur

```
├── public/media/           Foto's en video's, per dienst in een eigen map
├── scripts/
│   ├── download-media.mjs  Haalt alle originele media op uit de oude WordPress-site
│   ├── process-media.py    Ontdubbelt, verkleint en zet om; schrijft src/data/media.ts
│   └── build-preview.mjs   Voor npm run build:preview
└── src/
    ├── data/site.ts        Alle tekst: bedrijfsgegevens, diensten, stappen, waarden, menu
    ├── data/media.ts       Welke foto's en video's bij welke dienst horen (gegenereerd)
    ├── components/         Herbruikbare blokken (foto, terugknop, CTA, iconen, ...)
    ├── layouts/Base.astro  Header, menu, footer, meta-tags en de JavaScript voor de hele site
    ├── pages/              Eén bestand per pagina; [slug].astro maakt alle dienstpagina's
    ├── styles/global.css   Alle vormgeving; kleuren en lettertypes staan bovenaan als variabelen
    └── lib.ts              Hulpfuncties voor links en paden
```

## Inhoud aanpassen

- **Telefoon, e-mail, adres en btw-nummer** staan in `company`, bovenaan `src/data/site.ts`, en worden overal automatisch gebruikt.
- **Een dienst** pas je aan in `services` in hetzelfde bestand. Voeg je er één toe, dan verschijnt die automatisch als pagina, in het menu, op de dienstenpagina en in de footer.
- **Kleuren** zijn de variabelen in `:root` in `src/styles/global.css`. Zo is `--accent` het geel.
- **Foto's per dienst** worden ingesteld in het `plan` bovenaan `scripts/process-media.py`. Voer daarna het script opnieuw uit.

## Nog open

- Het contactformulier opent nu het e-mailprogramma van de bezoeker (`mailto:`). Voor echte verzending is een formulierdienst nodig.
- Op de oude site staan twee huisnummers, 93 en 95 Frans Van Ryhovelaan. De site gebruikt nu 93.
- Sanering & afvalbeheer heeft nog geen eigen foto's.
