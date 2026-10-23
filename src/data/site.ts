// Alle inhoud van de huidige site (starsolutions-service.be), op één plek.
import { serviceMedia, serviceVideos, pageMedia, type Img, type Vid } from './media';

export const company = {
  name: 'Star Solutions',
  tagline: 'Wij zorgen voor een efficiënte werkplaats',
  subline: 'Van uw huis tot de industrie, van uw tuin tot de toekomst!',
  street: 'Frans Van Ryhovelaan 93',
  city: '9000 Gent',
  phone: '0473 48 48 94',
  phoneHref: 'tel:+32473484894',
  email: 'info@starsolutions-service.be',
  vat: 'BE 0750 516 615',
  availability: '7 op 7 bereikbaar',
  logo: 'media/logo-180.png',
  favicon: 'media/favicon-32.png',
  heroImage: pageMedia.hero,
};

export const sectors = [
  {
    title: 'Woningrenovatie',
    text: 'Renovatieoplossingen op maat van uw wensen en budget, van sloop tot volledige afwerking.',
    image: pageMedia['sector-bouw'],
    href: 'bouw-renovatie',
  },
  {
    title: 'Industrieel onderhoud',
    text: 'Reiniging en onderhoud van industriële installaties, magazijnen en productielijnen.',
    image: pageMedia['sector-industrie'],
    href: 'industriele-reiniging',
  },
  {
    title: 'Tuinwerkzaamheden',
    text: 'Aanleg en onderhoud van groene buitenruimtes, eenmalig of periodiek.',
    image: pageMedia['sector-tuin'],
    href: 'groenonderhoud-tuinwerken',
  },
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  group: 'Bouw' | 'Schoonmaak' | 'Industrie' | 'Buiten' | 'Logistiek' | 'Hygiëne';
  parent?: string;
  intro: string[];
  lists: { title?: string; items: string[] }[];
  highlights?: string[];
  image?: Img;
  gallery?: Img[];
  video?: Vid;
};

export const services: Service[] = [
  {
    slug: 'bouw-renovatie',
    title: 'Bouw & Renovatie',
    short: 'Van totaalrenovatie tot kleine klusjes, van sloop tot afwerking.',
    group: 'Bouw',
    intro: [
      'Star Solutions uit Gent voert renovaties uit, van totaalprojecten tot kleinere verbouwingen. We werken van afbraak tot volledige afwerking, met specialisaties in vloeren, sanitair, schilderwerk en isolatie.',
      'Ons team werkt gemotiveerd en met oog voor kwaliteit en persoonlijk contact. We zijn gevestigd in Gent, rijden tot 80 km ver en maken voor elk project een offerte op maat.',
      'Voor klusjesdiensten en bouwwerken stemmen we de oplossing af op uw wensen en uw budget. We werken voor particulieren, bedrijven en overheden.',
    ],
    lists: [
      {
        items: [
          'Totaalrenovatie',
          'Renovatie & afwerking van gebouwen',
          'Uitbreidingen aan gebouwen',
          'Afbraakwerken en voorbereiding voor bouw',
          'Gyprocwerken',
          'Renovatie badkamer',
          'Schilderen van gebouwen',
          'Pleisterwerken',
          'Vloerwerken',
          'Vloertegels, laminaat en parket leggen in renovatie en nieuwbouw',
          'Isolatiewerkzaamheden',
          'Verwarming',
          'Elektriciteit',
          'Opkuis bouwwerf',
          'Markeringen op parkeerplaatsen',
          'Klusjesdiensten',
          'Tuinwerken',
        ],
      },
    ],
    highlights: ['Tot 80 km rond Gent', 'Offerte op maat', 'Particulier, bedrijf & overheid'],
  },
  {
    slug: 'opleveringsschoonmaak',
    title: 'Opleveringsschoonmaak',
    short: 'Nieuwe en verbouwde panden klaar om in gebruik te nemen.',
    group: 'Bouw',
    parent: 'bouw-renovatie',
    intro: [
      'Wij reinigen nieuwe gebouwen zodra de bouwwerken zijn afgerond.',
      'Na elke bouwklus maken we woningen, kantoren, scholen, fabrieken en andere panden schoon, voor bedrijven en particulieren, zodat ze meteen klaar zijn voor gebruik.',
      'Na de eerste opkuis bieden we ook periodieke schoonmaak aan. Op basis van een analyse stellen we een schoonmaakplan voor, uitgevoerd door goed opgeleide medewerkers.',
    ],
    lists: [
      {
        items: [
          'Verwijderen van cement-, verf- en betonresten',
          'Reiniging van glaswerk',
          'Afstoffen en schoonmaken van vloeren, plinten, wanden en plafonds',
          'Verwijderen van bouwstof, bouwafval en alle resten',
          'Dieptereiniging van sanitaire ruimtes',
          'Reinigen van trappen en trapleuningen',
          'Opkuis van opslagruimtes, kelders en garages',
          'Schoonmaak van vast meubilair',
          'Reinigen van koepels',
          'Verwijderen van etiketten, stickers en beschermfolie',
        ],
      },
    ],
  },
  {
    slug: 'algemeen-schoonmaak',
    title: 'Algemene schoonmaak',
    short: 'Dagelijkse en periodieke schoonmaak van kantoren tot parkings.',
    group: 'Schoonmaak',
    intro: [
      'Een propere werkplaats is een efficiënte werkplaats. Daarom zorgen we voor dagelijkse en periodieke reiniging van kantoren, fabrieken, scholen, appartementsgebouwen, parkings en tuinen.',
    ],
    lists: [
      {
        items: [
          'Dagelijkse schoonmaak',
          'Periodieke reinigingswerken binnen én buiten',
          'Schoonmaak van burelen, vergaderzalen, refters en lokalen',
          'Opleveringsschoonmaak',
          'Reinigen van het interieur van allerlei gebouwen: kantoren, fabrieken, werkplaatsen, commerciële panden, appartementsgebouwen, scholen',
          'Opkuisen van parkings en tuinen',
          'Verwijderen van olie en hardnekkige vlekken',
          'Schoonmaken van moeilijk bereikbare plaatsen',
          'Glasreinigen',
          'Ruimte-, voertuig- en oppervlaktedesinfectie',
        ],
      },
    ],
  },
  {
    slug: 'bekleding-zetelreiniging',
    title: 'Bekleding & zetelreiniging',
    short: 'Dieptereiniging van zetels, tapijten, matrassen en autostoelen.',
    group: 'Schoonmaak',
    parent: 'algemeen-schoonmaak',
    intro: [
      'Wij bieden een grondige reiniging van alle soorten bekleding.',
      'De zetelreiniging gebeurt ter plaatse, bij u thuis of op kantoor, overal in België.',
    ],
    lists: [
      {
        title: 'Dieptereiniging van',
        items: [
          'Stoffen meubilair',
          'Bureau- en vergaderstoelen',
          'Lederen meubilair',
          'Vast tapijt',
          'Vloerkleden',
          'Autostoelen en -interieur (inclusief laadruimte)',
          'Radiatoren',
          'Matrassen',
          'Stoomreiniging',
        ],
      },
    ],
    highlights: ['Antibacteriële behandeling', 'Snelle service', 'Topresultaat', 'Klanttevredenheid', 'Ecologisch', 'Aan huis in heel België'],
  },
  {
    slug: 'detailing-service',
    title: 'Car detailing',
    short: 'Dieptereiniging van voertuigen, binnen en buiten.',
    group: 'Schoonmaak',
    parent: 'algemeen-schoonmaak',
    intro: [
      'Contacteer Star Solutions voor een grondige reiniging of detailing van uw wagen. We halen de wagen op of behandelen hem ter plaatse.',
    ],
    lists: [
      {
        title: 'Dieptereiniging interieur',
        items: [
          'Zetels, bekleding en vloermatten',
          'Lederbehandeling',
          'Kunststof reiniging',
          'Dashboard',
          'Stuur',
          'Ruiten',
          'Laadruimte',
          'Stoombehandeling',
          'Ontgeuren',
          'Desinfectie',
          'Details',
        ],
      },
      {
        title: 'Exterieur reiniging',
        items: [
          'Voorreinigen',
          'Schuimbehandeling',
          'Wassen',
          'Ruiten',
          'Velgen',
          'Wielreiniging',
          'Reinigen van extreme vervuiling',
        ],
      },
    ],
  },
  {
    slug: 'industriele-reiniging',
    title: 'Industriële reiniging',
    short: 'Reiniging en onderhoud voor elk bedrijf met magazijn of productielijn.',
    group: 'Industrie',
    intro: [
      'Een propere werkplaats is een efficiënte werkplaats. Wij verzorgen industriële reiniging en onderhoud voor alle bedrijven met een magazijn of productielijn.',
      'Naast industriële reiniging bieden we ook algemene schoonmaak van kantoren, werkplaatsen en gebouwen.',
    ],
    lists: [
      {
        items: [
          'Reinigen van industriële machines',
          'Binnen- en buitenreiniging van gebouwen',
          'Schoorsteenvegen, reinigen van haarden, kachels, ovens, cv-ketels, ventilatiekanalen en afvoersystemen',
          'Onderhoud binnen de industrie',
          'Rioolreiniging',
          'Havenreiniging',
          'Reinigen en desinfecteren van voedingsproductie en -machines',
          'Stoomreiniging',
          'Ontroesten, zandstralen, trommelpolijsten en reinigen van metaal',
          'Containerreiniging',
          'Chemische reiniging',
          'Reiniging na brand- of waterschade',
          'Hogedrukreiniging',
          'Reiniging van tanks, opslagruimten en opslaginstallaties',
          'Reiniging van treinstations en luchthavens',
          'Verwijderen van olie en hardnekkige vloeistofvlekken',
          'Reiniging van moeilijk bereikbare plaatsen',
          'Dieptereiniging',
        ],
      },
      {
        title: 'Sectoren',
        items: ['Automobielsector', 'Bouwsector', 'Chemische industrie', 'Houtindustrie', 'Logistiek en transport', 'Metaalindustrie', 'Voedingssector', 'Textiel'],
      },
    ],
  },
  {
    slug: 'afvalbeheer',
    title: 'Sanering & afvalbeheer',
    short: 'Intern afvalbeheer op maat, veilig en continu verbeterd.',
    group: 'Industrie',
    parent: 'industriele-reiniging',
    intro: [
      'Afvalbeheer gaat verder dan sorteren. Het gaat ook om het veilig omgaan met (chemische) producten die mens, milieu en bedrijf kunnen schaden. Slecht afvalbeheer kost geld en verstoort de werking.',
      'Elk bedrijf heeft andere afvalstromen, dus werken we op maat. Met milieuzorgsystemen en de PDCA-cyclus (de kwaliteitscirkel van Deming) verbeteren we het afvalbeheer continu.',
    ],
    lists: [
      {
        title: 'Onze aanpak',
        items: [
          'Alle binnengebrachte producten worden goedgekeurd en geregistreerd met naam, hoeveelheid en veiligheidsvoorschriften',
          'Per product een fiche over gebruik, risico’s, maatregelen en de juiste afvalsoort',
          'Vaten op lekbakken die de volledige inhoud kunnen opvangen',
          'Voldoende absorberend materiaal binnen handbereik',
          'Een verantwoordelijke of noodnummer voor milieu-incidenten',
          'Gescheiden inzameling met een eigen kleur en duidelijke markering per afvaltype',
        ],
      },
    ],
  },
  {
    slug: 'groenonderhoud-tuinwerken',
    title: 'Groenonderhoud & tuinwerken',
    short: 'Aanleg en onderhoud van tuinen, parken en groene zones.',
    group: 'Buiten',
    intro: [
      'Wij verzorgen groenonderhoud voor particulieren, bedrijven, recreatiedomeinen, grote tuinen, stadszones, parken en begraafplaatsen.',
      'We werken tot in de details en bieden zowel eenmalig als periodiek onderhoud.',
    ],
    lists: [
      {
        items: [
          'Maaien en onderhouden van grasoppervlakten',
          'Snoeien van bomen en heggen',
          'Aanleggen en onderhouden van tuinen, parken en het groen van sportvelden',
          'Landschapsverzorging',
          'Vellen van bomen',
          'Snoeien en knotten van bomen en struikgewas',
          'Scheren van hagen en opruimen van snoeiafval',
          'Nieuwe beplanting',
          'Bladafval opruimen',
          'Grasmaaien',
          'Verwijderen van onkruid',
        ],
      },
    ],
  },
  {
    slug: 'logistiek-inpak',
    title: 'Logistiek & inpak',
    short: 'Stockeren, orderpicken, inpakken en kwaliteitscontrole.',
    group: 'Logistiek',
    intro: [
      'Bedrijven met een personeelstekort kunnen op ons rekenen als partner in werkkrachten. We bieden oplossingen op maat voor productie, logistiek, onderhoud, inpak en de vlees- en voedingssector.',
    ],
    lists: [
      {
        items: [
          'Stockeren van goederen',
          'Orderpicken en bestellingen klaarmaken',
          'Laden en lossen',
          'Kwaliteitscontrole',
          'Voeding inpakken: vlees, diepvries, maaltijden, aperitief',
          'Inpakken en verpakken van alle goederen',
          'Sorteren',
        ],
      },
    ],
  },
  {
    slug: 'desinfectie',
    title: 'Desinfectie',
    short: 'Gecertificeerde desinfectie van gebouwen, kantoren en transport.',
    group: 'Hygiëne',
    intro: [
      'Virussen verspreiden zich snel via druppels die op oppervlakken achterblijven. Professionele desinfectie van gebouwen, sanitaire ruimtes, kantoren, opleidingsruimten, openbaar vervoer en publieke ingangen voorkomt besmetting, vooral op plaatsen met veel publiek en contactpunten.',
      'Onze medewerkers werken met beschermingsmiddelen en gecertificeerde desinfectiemiddelen. We desinfecteren preventief, of na een besmetting op uw verzoek. We combineren het besproeien van oppervlakken met het vernevelen van ruimten met een elektrische ULV-vernevelaar.',
      'Na de werken ontvangt u een certificaat en attest als bewijs van professionele desinfectie.',
    ],
    lists: [
      {
        title: 'Zo werken we',
        items: [
          'Plan op maat bespreken',
          'Voorbereiding: oppervlakken grondig reinigen en drogen',
          'Desinfectie volgens de gebruiksaanwijzing',
          'Ventilatie en droging',
        ],
      },
    ],
    highlights: [
      'Gecertificeerde, erkende producten, ook voor voedingsruimtes',
      'Duurzaam en biologisch afbreekbaar',
      'Professionele aanpak',
      'Certificaat na afloop',
      '24/7 beschikbaar',
      'Aanvaardbare prijzen',
    ],
  },
];

// Foto's en video's uit de mediabibliotheek koppelen aan elke dienst.
for (const s of services) {
  const m = serviceMedia[s.slug];
  if (m) { s.image = m.image; s.gallery = m.gallery; }
  s.video = serviceVideos[s.slug];
}

export const steps = [
  { title: 'Kennismaking & analyse', text: 'In een persoonlijk gesprek brengen we uw noden en verwachtingen in kaart, of het nu gaat om renovatie, industriële reiniging of tuinonderhoud.' },
  { title: 'Inspectie ter plaatse', text: 'Onze experts komen langs voor een grondige beoordeling en verzamelen plannen, maten en foto’s, zodat er later geen verrassingen zijn.' },
  { title: 'Offerte op maat', text: 'U ontvangt een vrijblijvende offerte met transparante prijzen en een concreet stappenplan.' },
  { title: 'Uitvoering door vakmensen', text: 'Gecertificeerde teams voeren het werk uit zoals afgesproken, met respect voor planning, veiligheid en kwaliteit.' },
  { title: 'Oplevering & opvolging', text: 'Na afloop volgt een kwaliteitscontrole. Ook daarna blijven we bereikbaar voor feedback of extra ondersteuning.' },
];

export const values = [
  { title: 'Smart, Safe, Sustainable & Support', text: 'Vier principes die elke opdracht sturen.' },
  { title: 'Technologische innovatie', text: 'Moderne technieken en materialen voor een beter resultaat.' },
  { title: 'Betaalbaar', text: 'Aanvaardbare prijzen voor advies én uitvoering.' },
  { title: 'Realistische doelen', text: 'Doelstellingen die relevant en haalbaar zijn voor elke klant.' },
];

export const goals = [
  'Een sterke marktpositie als innovatief en duurzaam bedrijf',
  'Minder afval en minder onderhoudswerk',
  'Meerwaarde creëren voor elke klant',
  'Milieuvriendelijke producten gebruiken',
  'Minder arbeidsongevallen',
  'Meer welzijn op het werk',
];

export const nav = [
  { label: 'Home', href: '' },
  { label: 'Diensten', href: 'diensten' },
  { label: 'Aanpak', href: 'aanpak' },
  { label: 'Over ons', href: 'over-ons' },
  { label: 'Contact', href: 'contact' },
];
