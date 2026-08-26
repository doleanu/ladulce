/* ---------------------------------------------------------------------------
   Homepage copy in Spanish and English. HomeView.tsx renders from one of these
   dictionaries depending on locale. Business facts (phone, address, hours,
   rating) live in site.ts and are not duplicated here.
   --------------------------------------------------------------------------- */

export type Locale = "es" | "en" | "de" | "fr";

export type Highlight = { image: string; name: string; note: string; price: string };
export type Feature = { icon: string; label: string };
export type Faq = { q: string; a: string };
export type Review = { text: string; tone: number };

export type HomeCopy = {
  locale: Locale;
  langLabel: string; // label of the OTHER language
  langHref: string; // path to the OTHER language home
  cartaHref: string;
  nav: { carta: string; reservar: string };

  hero: {
    kicker: string;
    tagline: string;
    ctaMenu: string;
    ctaReserve: string;
    barraquito: string;
  };

  marquee: string[];

  destacados: {
    kicker: string;
    title: string;
    intro: string;
    items: Highlight[];
    cta: string;
    ctaNote: string;
  };

  barraquito: { kicker: string; title: string; body: string; caption: string };

  terraza: { kicker: string; title: string; body1: string; body2: string };

  info: {
    kicker: string;
    title: string;
    hoursLabel: string;
    hoursValue: string;
    hoursNote: string;
    addressLabel: string;
    reservarLabel: string;
    reservarHint: string;
    directions: string;
    features: Feature[];
  };

  reviews: {
    kicker: string;
    title: string;
    intro: string;
    ratingAria: string;
    ratingCaption: string;
    strips: Review[];
  };

  gallery: { kicker: string; title: string; images: { src: string; alt: string }[] };

  reservar: { kicker: string; title: string; body: string };

  faq: { kicker: string; title: string; items: Faq[] };

  footer: {
    tagline: string;
    rights: string;
    webBy: string;
    legal: { avisoLegal: string; privacidad: string; cookies: string };
  };
};

const MARQUEE_ES = [
  "Barraquito", "Pancakes", "Smash Burger", "Eggs Benedict", "Tostada de aguacate",
  "Cheesecake", "Smoothies", "Zumo natural", "Cappuccino", "Croquetas", "Brunch",
];
const MARQUEE_EN = [
  "Barraquito", "Pancakes", "Smash Burger", "Eggs Benedict", "Avocado toast",
  "Cheesecake", "Smoothies", "Fresh juice", "Cappuccino", "Croquettes", "Brunch",
];
const MARQUEE_DE = [
  "Barraquito", "Pancakes", "Smash Burger", "Eggs Benedict", "Avocado-Toast",
  "Cheesecake", "Smoothies", "Frischer Saft", "Cappuccino", "Kroketten", "Brunch",
];
const MARQUEE_FR = [
  "Barraquito", "Pancakes", "Smash Burger", "Eggs Benedict", "Toast à l'avocat",
  "Cheesecake", "Smoothies", "Jus frais", "Cappuccino", "Croquettes", "Brunch",
];

export const HOME_ES: HomeCopy = {
  locale: "es",
  langLabel: "English",
  langHref: "/en",
  cartaHref: "/carta",
  nav: { carta: "Carta", reservar: "Reservar" },

  hero: {
    kicker: "Café · Brunch · Terraza — Los Abrigos",
    tagline:
      "Barraquitos, pancakes y mañanas largas junto al mar. De martes a domingo, de 8:30 a 22:30.",
    ctaMenu: "Ver la carta",
    ctaReserve: "Reservar mesa",
    barraquito: "Conoce el barraquito ↓",
  },

  marquee: MARQUEE_ES,

  destacados: {
    kicker: "Lo que más nos piden",
    title: "Nuestros imprescindibles",
    intro:
      "Del desayuno tranquilo al brunch de fin de semana, en el sur de Tenerife. Estos son los platos que más se repiten en las reseñas — la carta completa tiene mucho más.",
    items: [
      { image: "/photos/pancake-pistacho.jpg", name: "Pancakes", note: "Esponjosos y dorados, con sirope, fruta o pistacho.", price: "8 €" },
      { image: "/photos/sandwiches.jpg", name: "Club Sandwich", note: "Pollo, beicon, queso, salsa de aguacate y papas.", price: "8,90 €" },
      { image: "/menu/tostas.jpg", name: "Tosta de salmón", note: "Salmón, aguacate, huevos revueltos y rúcula.", price: "9 €" },
      { image: "/photos/burger.jpg", name: "Smash Burger", note: "Doble smash, doble cheddar y salsa de la casa.", price: "12,90 €" },
      { image: "/photos/barraquito.jpg", name: "Barraquito", note: "El café canario por excelencia, capa a capa.", price: "2,50 €" },
      { image: "/menu/tartas.jpg", name: "Cheesecake y tartas", note: "Cremosa de verdad. Otra favorita de las reseñas.", price: "5 €" },
    ],
    cta: "Ver la carta completa →",
    ctaNote: "Todos los platos y bebidas, con fotos y precios.",
  },

  barraquito: {
    kicker: "La especialidad de la casa",
    title: "El barraquito",
    body:
      "El café canario por excelencia, capa a capa. En La Dulce se sirve como manda la tradición: sin remover, para bebérselo por pisos.",
    caption: "Pídelo en la terraza, recién hecho.",
  },

  terraza: {
    kicker: "La terraza",
    title: "Ver pasar Los Abrigos",
    body1:
      "Terraza cubierta para desayunos largos y tardes sin reloj: el mejor sitio del pueblo para ver la vida pasar con un barraquito delante. Dentro, un interior moderno y con estilo.",
    body2:
      "Con peques sois más que bienvenidos — hay sitio para el carrito — y las raciones son generosas, a un precio justo.",
  },

  info: {
    kicker: "Info útil",
    title: "Todo lo que necesitas saber",
    hoursLabel: "Horario",
    hoursValue: "Martes a domingo · 8:30 – 22:30",
    hoursNote: "Lunes cerrado",
    addressLabel: "Dónde estamos",
    reservarLabel: "Reservas",
    reservarHint: "Escríbenos por WhatsApp",
    directions: "Cómo llegar →",
    features: [
      { icon: "awning", label: "Terraza cubierta" },
      { icon: "stroller", label: "Ideal para ir con peques" },
      { icon: "bag", label: "También para llevar" },
      { icon: "card", label: "Se paga con tarjeta" },
    ],
  },

  reviews: {
    kicker: "Lo que se comenta",
    title: "Boca a boca",
    intro: "Lo que se repite, una y otra vez, en las reseñas de Google — en nuestras palabras:",
    ratingAria: "4,4 sobre 5, con 760 reseñas en Google",
    ratingCaption: "en Google",
    strips: [
      { text: "“Desayunos y brunch que enamoran”", tone: 0 },
      { text: "“Servicio cercano y atento, de diez”", tone: 1 },
      { text: "“Raciones generosas a precio justo”", tone: 2 },
      { text: "“Una joya escondida en Los Abrigos”", tone: 3 },
      { text: "“Perfecto para ir con peques”", tone: 0 },
    ],
  },

  gallery: {
    kicker: "Un vistazo",
    title: "Así es La Dulce",
    images: [
      { src: "/photos/brunch.jpg", alt: "Brunch con pancakes, huevos y fruta fresca" },
      { src: "/photos/guy-eating.jpg", alt: "Cliente con una smash burger en la terraza" },
      { src: "/photos/interior-bar.jpg", alt: "Interior de La Dulce: barra y taburetes" },
      { src: "/photos/aperol.jpg", alt: "Dos Aperol Spritz para brindar" },
      { src: "/photos/frozen-cocktail.jpg", alt: "Daiquiri de fresa frozen" },
      { src: "/photos/sandwiches.jpg", alt: "Club sandwich con papas fritas" },
      { src: "/photos/salad-plate.jpg", alt: "Ensalada César con pollo" },
      { src: "/photos/pancakes-mimosa.jpg", alt: "Pancakes con cóctel mimosa" },
    ],
  },

  reservar: {
    kicker: "Reservas",
    title: "Reserva tu mesa",
    body:
      "Rellena tus datos y se abre WhatsApp con la reserva ya escrita — solo tienes que enviarla. También puedes escribirnos directamente al 615 02 99 41.",
  },

  faq: {
    kicker: "Preguntas frecuentes",
    title: "Antes de venir",
    items: [
      {
        q: "¿Cuál es el horario de La Dulce?",
        a: "Abrimos de martes a domingo, de 8:30 a 22:30 (los lunes permanecemos cerrados). El brunch se sirve hasta las 14:00 y las hamburguesas a partir de las 12:00.",
      },
      {
        q: "¿Dónde está La Dulce?",
        a: "En la Avenida los Abrigos, 2, en Los Abrigos (Granadilla de Abona), al sur de Tenerife, junto al puerto pesquero.",
      },
      {
        q: "¿Dónde desayunar en Los Abrigos, Tenerife?",
        a: "En La Dulce, en pleno pueblo de Los Abrigos, junto al puerto pesquero. Servimos desayuno y brunch de martes a domingo, de 8:30 a 22:30, con opciones dulces y saladas y una terraza con vistas al mar.",
      },
      {
        q: "¿Hace falta reservar?",
        a: "No es imprescindible, pero en fines de semana y temporada alta recomendamos reservar mesa por WhatsApp para asegurar sitio en la terraza.",
      },
      {
        q: "¿Tenéis opciones veganas y sin gluten?",
        a: "Sí. Contamos con hamburguesa vegana HEÜRA, bowls, ensaladas y tostas, además de versión sin gluten en las pulgas (consulta disponibilidad).",
      },
      {
        q: "¿Es un sitio para ir con niños?",
        a: "Totalmente. Es un local familiar, con espacio para el carrito y terraza cubierta.",
      },
      {
        q: "¿Se puede pedir para llevar?",
        a: "Sí, puedes pedir para llevar llamando al 922 74 92 19.",
      },
      {
        q: "¿Qué tipo de comida servís?",
        a: "Café de especialidad, brunch, pancakes, tostas, bagels, hamburguesas, ensaladas y repostería casera. El precio medio es de 10–20 € por persona.",
      },
      {
        q: "¿Tenéis cortado natural y café de especialidad?",
        a: "Sí. Preparamos cortado natural, café con leche, cappuccino y nuestro barraquito canario tradicional, capa a capa — todo con café de especialidad, recién hecho en la terraza.",
      },
    ],
  },

  footer: {
    tagline: "Café · Brunch · Terraza — Los Abrigos, Tenerife",
    rights: "Todos los derechos reservados.",
    webBy: "Web de",
    legal: { avisoLegal: "Aviso legal", privacidad: "Privacidad", cookies: "Cookies" },
  },
};

export const HOME_EN: HomeCopy = {
  locale: "en",
  langLabel: "Español",
  langHref: "/",
  cartaHref: "/en/carta",
  nav: { carta: "Menu", reservar: "Book" },

  hero: {
    kicker: "Coffee · Brunch · Terrace — Los Abrigos",
    tagline:
      "Barraquitos, pancakes and long mornings by the sea. Tuesday to Sunday, 8:30 to 22:30.",
    ctaMenu: "See the menu",
    ctaReserve: "Book a table",
    barraquito: "Meet the barraquito ↓",
  },

  marquee: MARQUEE_EN,

  destacados: {
    kicker: "What people order most",
    title: "Our must-haves",
    intro:
      "From a quiet breakfast to weekend brunch, in the south of Tenerife. These are the dishes reviewers mention again and again — the full menu has plenty more.",
    items: [
      { image: "/photos/pancake-pistacho.jpg", name: "Pancakes", note: "Fluffy and golden, with syrup, fruit or pistachio.", price: "€8" },
      { image: "/photos/sandwiches.jpg", name: "Club Sandwich", note: "Chicken, bacon, cheese, avocado sauce and fries.", price: "€8.90" },
      { image: "/menu/tostas.jpg", name: "Salmon toast", note: "Salmon, avocado, scrambled eggs and rocket.", price: "€9" },
      { image: "/photos/burger.jpg", name: "Smash Burger", note: "Double smash, double cheddar and house sauce.", price: "€12.90" },
      { image: "/photos/barraquito.jpg", name: "Barraquito", note: "The classic Canarian coffee, layer by layer.", price: "€2.50" },
      { image: "/menu/tartas.jpg", name: "Cheesecake & cakes", note: "Properly creamy. Another review favourite.", price: "€5" },
    ],
    cta: "See the full menu →",
    ctaNote: "Every dish and drink, with photos and prices.",
  },

  barraquito: {
    kicker: "The house speciality",
    title: "The barraquito",
    body:
      "The classic Canarian coffee, built layer by layer. At La Dulce it's served the traditional way: unstirred, to be sipped floor by floor.",
    caption: "Order one on the terrace, freshly made.",
  },

  terraza: {
    kicker: "The terrace",
    title: "Watch Los Abrigos go by",
    body1:
      "A covered terrace for long breakfasts and unhurried afternoons: the best spot in town to watch life go by over a barraquito. Inside, a modern, stylish space.",
    body2:
      "Little ones are more than welcome — there's room for the stroller — and portions are generous, at a fair price.",
  },

  info: {
    kicker: "Good to know",
    title: "Everything you need",
    hoursLabel: "Hours",
    hoursValue: "Tuesday to Sunday · 8:30 – 22:30",
    hoursNote: "Closed Mondays",
    addressLabel: "Where we are",
    reservarLabel: "Reservations",
    reservarHint: "Message us on WhatsApp",
    directions: "Get directions →",
    features: [
      { icon: "awning", label: "Covered terrace" },
      { icon: "stroller", label: "Great with kids" },
      { icon: "bag", label: "Takeaway too" },
      { icon: "card", label: "Card accepted" },
    ],
  },

  reviews: {
    kicker: "What people say",
    title: "Word of mouth",
    intro: "What comes up, again and again, in the Google reviews — in our words:",
    ratingAria: "4.4 out of 5, with 760 reviews on Google",
    ratingCaption: "on Google",
    strips: [
      { text: "“Breakfasts and brunch to fall for”", tone: 0 },
      { text: "“Warm, attentive service, top marks”", tone: 1 },
      { text: "“Generous portions, fair prices”", tone: 2 },
      { text: "“A hidden gem in Los Abrigos”", tone: 3 },
      { text: "“Perfect for coming with kids”", tone: 0 },
    ],
  },

  gallery: {
    kicker: "A look inside",
    title: "This is La Dulce",
    images: [
      { src: "/photos/brunch.jpg", alt: "Brunch with pancakes, eggs and fresh fruit" },
      { src: "/photos/guy-eating.jpg", alt: "A guest with a smash burger on the terrace" },
      { src: "/photos/interior-bar.jpg", alt: "Inside La Dulce: the bar and stools" },
      { src: "/photos/aperol.jpg", alt: "Two Aperol Spritz for a toast" },
      { src: "/photos/frozen-cocktail.jpg", alt: "Frozen strawberry daiquiri" },
      { src: "/photos/sandwiches.jpg", alt: "Club sandwich with fries" },
      { src: "/photos/salad-plate.jpg", alt: "Caesar salad with chicken" },
      { src: "/photos/pancakes-mimosa.jpg", alt: "Pancakes with a mimosa cocktail" },
    ],
  },

  reservar: {
    kicker: "Reservations",
    title: "Book your table",
    body:
      "Fill in your details and WhatsApp opens with the booking ready written — just hit send. You can also message us directly on 615 02 99 41.",
  },

  faq: {
    kicker: "Frequently asked",
    title: "Before you come",
    items: [
      {
        q: "What are La Dulce's opening hours?",
        a: "We're open Tuesday to Sunday, 8:30 to 22:30 (closed on Mondays). Brunch is served until 14:00 and burgers from 12:00.",
      },
      {
        q: "Where is La Dulce?",
        a: "At Avenida los Abrigos, 2, in Los Abrigos (Granadilla de Abona), southern Tenerife, next to the fishing harbour.",
      },
      {
        q: "Where can I get breakfast in Los Abrigos, Tenerife?",
        a: "At La Dulce, right in the village of Los Abrigos, next to the fishing harbour. We serve breakfast and brunch Tuesday to Sunday, 8:30 to 22:30, with sweet and savoury options and a terrace overlooking the sea.",
      },
      {
        q: "Do I need to book?",
        a: "It's not essential, but at weekends and in high season we recommend booking a table by WhatsApp to secure a spot on the terrace.",
      },
      {
        q: "Do you have vegan and gluten-free options?",
        a: "Yes. We have the vegan HEÜRA burger, bowls, salads and toasts, plus a gluten-free version of the pulga rolls (ask for availability).",
      },
      {
        q: "Is it a good place to go with children?",
        a: "Absolutely. It's a family-friendly spot with room for strollers and a covered terrace.",
      },
      {
        q: "Can I get takeaway?",
        a: "Yes, you can order takeaway by calling 922 74 92 19.",
      },
      {
        q: "What kind of food do you serve?",
        a: "Specialty coffee, brunch, pancakes, toasts, bagels, burgers, salads and homemade cakes. Average price is €10–20 per person.",
      },
      {
        q: "Do you serve natural cortado and specialty coffee?",
        a: "Yes. We make cortado natural, café con leche, cappuccino and our traditional Canarian barraquito, layer by layer — all with specialty coffee, freshly made on the terrace.",
      },
    ],
  },

  footer: {
    tagline: "Coffee · Brunch · Terrace — Los Abrigos, Tenerife",
    rights: "All rights reserved.",
    webBy: "Website by",
    legal: { avisoLegal: "Legal notice", privacidad: "Privacy", cookies: "Cookies" },
  },
};

export const HOME_DE: HomeCopy = {
  locale: "de",
  langLabel: "English",
  langHref: "/en",
  cartaHref: "/de/carta",
  nav: { carta: "Speisekarte", reservar: "Reservieren" },

  hero: {
    kicker: "Kaffee · Brunch · Terrasse — Los Abrigos",
    tagline:
      "Barraquitos, Pancakes und lange Vormittage am Meer. Dienstag bis Sonntag, 8:30 bis 22:30 Uhr.",
    ctaMenu: "Zur Speisekarte",
    ctaReserve: "Tisch reservieren",
    barraquito: "Den Barraquito entdecken ↓",
  },

  marquee: MARQUEE_DE,

  destacados: {
    kicker: "Das wird am meisten bestellt",
    title: "Unsere Klassiker",
    intro:
      "Vom ruhigen Frühstück bis zum Wochenend-Brunch, im Süden von Teneriffa. Das sind die Gerichte, die in den Bewertungen immer wieder erwähnt werden — die vollständige Speisekarte hat noch viel mehr.",
    items: [
      { image: "/photos/pancake-pistacho.jpg", name: "Pancakes", note: "Fluffig und goldbraun, mit Sirup, Obst oder Pistazie.", price: "8 €" },
      { image: "/photos/sandwiches.jpg", name: "Club Sandwich", note: "Hähnchen, Speck, Käse, Avocadosauce und Pommes.", price: "8,90 €" },
      { image: "/menu/tostas.jpg", name: "Lachs-Tosta", note: "Lachs, Avocado, Rührei und Rucola.", price: "9 €" },
      { image: "/photos/burger.jpg", name: "Smash Burger", note: "Doppelter Smash, doppelter Cheddar und Hausdressing.", price: "12,90 €" },
      { image: "/photos/barraquito.jpg", name: "Barraquito", note: "Der klassische kanarische Kaffee, Schicht für Schicht.", price: "2,50 €" },
      { image: "/menu/tartas.jpg", name: "Cheesecake & Torten", note: "Richtig cremig. Ein weiterer Bewertungs-Favorit.", price: "5 €" },
    ],
    cta: "Zur vollständigen Speisekarte →",
    ctaNote: "Alle Gerichte und Getränke, mit Fotos und Preisen.",
  },

  barraquito: {
    kicker: "Die Spezialität des Hauses",
    title: "Der Barraquito",
    body:
      "Der klassische kanarische Kaffee, Schicht für Schicht aufgebaut. Bei La Dulce wird er traditionell serviert: ungerührt, schluckweise von unten nach oben genossen.",
    caption: "Frisch zubereitet auf der Terrasse bestellen.",
  },

  terraza: {
    kicker: "Die Terrasse",
    title: "Los Abrigos vorbeiziehen sehen",
    body1:
      "Eine überdachte Terrasse für lange Frühstücke und entspannte Nachmittage: der beste Ort im Dorf, um bei einem Barraquito das Leben vorbeiziehen zu sehen. Drinnen ein moderner, stilvoller Raum.",
    body2:
      "Kleine Gäste sind herzlich willkommen — es ist Platz für den Kinderwagen — und die Portionen sind großzügig, zu einem fairen Preis.",
  },

  info: {
    kicker: "Gut zu wissen",
    title: "Alles, was du wissen musst",
    hoursLabel: "Öffnungszeiten",
    hoursValue: "Dienstag bis Sonntag · 8:30 – 22:30 Uhr",
    hoursNote: "Montags geschlossen",
    addressLabel: "Wo wir sind",
    reservarLabel: "Reservierungen",
    reservarHint: "Schreib uns auf WhatsApp",
    directions: "Route planen →",
    features: [
      { icon: "awning", label: "Überdachte Terrasse" },
      { icon: "stroller", label: "Ideal mit Kindern" },
      { icon: "bag", label: "Auch zum Mitnehmen" },
      { icon: "card", label: "Kartenzahlung möglich" },
    ],
  },

  reviews: {
    kicker: "Das sagen unsere Gäste",
    title: "Mundpropaganda",
    intro: "Was in den Google-Bewertungen immer wieder auftaucht — in unseren Worten:",
    ratingAria: "4,4 von 5, mit 760 Bewertungen auf Google",
    ratingCaption: "auf Google",
    strips: [
      { text: "„Frühstück und Brunch zum Verlieben“", tone: 0 },
      { text: "„Herzlicher, aufmerksamer Service, top“", tone: 1 },
      { text: "„Großzügige Portionen, faire Preise“", tone: 2 },
      { text: "„Ein verstecktes Juwel in Los Abrigos“", tone: 3 },
      { text: "„Perfekt mit Kindern“", tone: 0 },
    ],
  },

  gallery: {
    kicker: "Ein Einblick",
    title: "So ist La Dulce",
    images: [
      { src: "/photos/brunch.jpg", alt: "Brunch mit Pancakes, Eiern und frischem Obst" },
      { src: "/photos/guy-eating.jpg", alt: "Gast mit einem Smash Burger auf der Terrasse" },
      { src: "/photos/interior-bar.jpg", alt: "Innenbereich von La Dulce: Bar und Barhocker" },
      { src: "/photos/aperol.jpg", alt: "Zwei Aperol Spritz zum Anstoßen" },
      { src: "/photos/frozen-cocktail.jpg", alt: "Gefrorener Erdbeer-Daiquiri" },
      { src: "/photos/sandwiches.jpg", alt: "Club Sandwich mit Pommes" },
      { src: "/photos/salad-plate.jpg", alt: "Caesar-Salat mit Hähnchen" },
      { src: "/photos/pancakes-mimosa.jpg", alt: "Pancakes mit einem Mimosa-Cocktail" },
    ],
  },

  reservar: {
    kicker: "Reservierungen",
    title: "Reserviere deinen Tisch",
    body:
      "Trage deine Daten ein — WhatsApp öffnet sich mit der fertig geschriebenen Reservierung, du musst sie nur noch senden. Du kannst uns auch direkt unter 615 02 99 41 schreiben.",
  },

  faq: {
    kicker: "Häufige Fragen",
    title: "Bevor du kommst",
    items: [
      {
        q: "Wie sind die Öffnungszeiten von La Dulce?",
        a: "Wir haben von Dienstag bis Sonntag, 8:30 bis 22:30 Uhr, geöffnet (montags geschlossen). Brunch wird bis 14:00 Uhr serviert, Burger ab 12:00 Uhr.",
      },
      {
        q: "Wo befindet sich La Dulce?",
        a: "In der Avenida los Abrigos, 2, in Los Abrigos (Granadilla de Abona), im Süden von Teneriffa, direkt am Fischereihafen.",
      },
      {
        q: "Wo bekomme ich Frühstück in Los Abrigos, Teneriffa?",
        a: "Bei La Dulce, mitten im Dorf Los Abrigos, direkt am Fischereihafen. Wir servieren Frühstück und Brunch von Dienstag bis Sonntag, 8:30 bis 22:30 Uhr, mit süßen und herzhaften Optionen und einer Terrasse mit Meerblick.",
      },
      {
        q: "Muss ich reservieren?",
        a: "Nicht zwingend, aber an Wochenenden und in der Hochsaison empfehlen wir, per WhatsApp einen Tisch zu reservieren, um einen Platz auf der Terrasse zu sichern.",
      },
      {
        q: "Habt ihr vegane und glutenfreie Optionen?",
        a: "Ja. Wir bieten den veganen HEÜRA-Burger, Bowls, Salate und Tostas sowie eine glutenfreie Version der Pulga-Brötchen (bitte nach Verfügbarkeit fragen).",
      },
      {
        q: "Ist es ein guter Ort für Kinder?",
        a: "Auf jeden Fall. Es ist ein familienfreundlicher Ort mit Platz für Kinderwagen und einer überdachten Terrasse.",
      },
      {
        q: "Kann ich etwas zum Mitnehmen bestellen?",
        a: "Ja, du kannst unter 922 74 92 19 zum Mitnehmen bestellen.",
      },
      {
        q: "Was für Essen serviert ihr?",
        a: "Kaffeespezialitäten, Brunch, Pancakes, Tostas, Bagels, Burger, Salate und hausgemachtes Gebäck. Der Durchschnittspreis liegt bei 10–20 € pro Person.",
      },
      {
        q: "Habt ihr Cortado natural und Kaffeespezialitäten?",
        a: "Ja. Wir machen Cortado natural, Café con leche, Cappuccino und unseren traditionellen kanarischen Barraquito, Schicht für Schicht — alles mit Kaffeespezialitäten, frisch zubereitet auf der Terrasse.",
      },
    ],
  },

  footer: {
    tagline: "Kaffee · Brunch · Terrasse — Los Abrigos, Teneriffa",
    rights: "Alle Rechte vorbehalten.",
    webBy: "Website von",
    legal: { avisoLegal: "Impressum", privacidad: "Datenschutz", cookies: "Cookies" },
  },
};

export const HOME_FR: HomeCopy = {
  locale: "fr",
  langLabel: "English",
  langHref: "/en",
  cartaHref: "/fr/carta",
  nav: { carta: "Carte", reservar: "Réserver" },

  hero: {
    kicker: "Café · Brunch · Terrasse — Los Abrigos",
    tagline:
      "Barraquitos, pancakes et longues matinées au bord de mer. Du mardi au dimanche, de 8h30 à 22h30.",
    ctaMenu: "Voir la carte",
    ctaReserve: "Réserver une table",
    barraquito: "Découvrir le barraquito ↓",
  },

  marquee: MARQUEE_FR,

  destacados: {
    kicker: "Ce qu'on nous demande le plus",
    title: "Nos incontournables",
    intro:
      "Du petit-déjeuner tranquille au brunch du week-end, dans le sud de Tenerife. Voici les plats qui reviennent le plus dans les avis — la carte complète a bien plus à offrir.",
    items: [
      { image: "/photos/pancake-pistacho.jpg", name: "Pancakes", note: "Moelleux et dorés, avec sirop, fruits ou pistache.", price: "8 €" },
      { image: "/photos/sandwiches.jpg", name: "Club Sandwich", note: "Poulet, bacon, fromage, sauce avocat et frites.", price: "8,90 €" },
      { image: "/menu/tostas.jpg", name: "Toast au saumon", note: "Saumon, avocat, œufs brouillés et roquette.", price: "9 €" },
      { image: "/photos/burger.jpg", name: "Smash Burger", note: "Double smash, double cheddar et sauce maison.", price: "12,90 €" },
      { image: "/photos/barraquito.jpg", name: "Barraquito", note: "Le café canarien par excellence, couche par couche.", price: "2,50 €" },
      { image: "/menu/tartas.jpg", name: "Cheesecake et gâteaux", note: "Vraiment crémeux. Un autre favori des avis.", price: "5 €" },
    ],
    cta: "Voir la carte complète →",
    ctaNote: "Tous les plats et boissons, avec photos et prix.",
  },

  barraquito: {
    kicker: "La spécialité de la maison",
    title: "Le barraquito",
    body:
      "Le café canarien par excellence, construit couche par couche. Chez La Dulce, il est servi comme le veut la tradition : sans remuer, à boire étage par étage.",
    caption: "Commandez-le en terrasse, fraîchement préparé.",
  },

  terraza: {
    kicker: "La terrasse",
    title: "Voir vivre Los Abrigos",
    body1:
      "Une terrasse couverte pour de longs petits-déjeuners et des après-midis sans montre : le meilleur endroit du village pour voir la vie passer avec un barraquito devant soi. À l'intérieur, un espace moderne et élégant.",
    body2:
      "Les tout-petits sont plus que bienvenus — il y a de la place pour la poussette — et les portions sont généreuses, à prix juste.",
  },

  info: {
    kicker: "Infos utiles",
    title: "Tout ce qu'il faut savoir",
    hoursLabel: "Horaires",
    hoursValue: "Du mardi au dimanche · 8h30 – 22h30",
    hoursNote: "Fermé le lundi",
    addressLabel: "Où nous trouver",
    reservarLabel: "Réservations",
    reservarHint: "Écrivez-nous sur WhatsApp",
    directions: "Itinéraire →",
    features: [
      { icon: "awning", label: "Terrasse couverte" },
      { icon: "stroller", label: "Idéal avec des enfants" },
      { icon: "bag", label: "Aussi à emporter" },
      { icon: "card", label: "Paiement par carte accepté" },
    ],
  },

  reviews: {
    kicker: "Ce qu'on en dit",
    title: "Le bouche-à-oreille",
    intro: "Ce qui revient, encore et encore, dans les avis Google — dans nos mots :",
    ratingAria: "4,4 sur 5, avec 760 avis sur Google",
    ratingCaption: "sur Google",
    strips: [
      { text: "« Des petits-déjeuners et un brunch à tomber »", tone: 0 },
      { text: "« Service chaleureux et attentionné, un sans-faute »", tone: 1 },
      { text: "« Portions généreuses, prix justes »", tone: 2 },
      { text: "« Une pépite cachée à Los Abrigos »", tone: 3 },
      { text: "« Parfait pour venir avec des enfants »", tone: 0 },
    ],
  },

  gallery: {
    kicker: "Un aperçu",
    title: "Voici La Dulce",
    images: [
      { src: "/photos/brunch.jpg", alt: "Brunch avec pancakes, œufs et fruits frais" },
      { src: "/photos/guy-eating.jpg", alt: "Client avec un smash burger en terrasse" },
      { src: "/photos/interior-bar.jpg", alt: "Intérieur de La Dulce : le bar et les tabourets" },
      { src: "/photos/aperol.jpg", alt: "Deux Aperol Spritz pour trinquer" },
      { src: "/photos/frozen-cocktail.jpg", alt: "Daiquiri glacé à la fraise" },
      { src: "/photos/sandwiches.jpg", alt: "Club sandwich avec frites" },
      { src: "/photos/salad-plate.jpg", alt: "Salade César au poulet" },
      { src: "/photos/pancakes-mimosa.jpg", alt: "Pancakes avec un cocktail mimosa" },
    ],
  },

  reservar: {
    kicker: "Réservations",
    title: "Réservez votre table",
    body:
      "Remplissez vos informations et WhatsApp s'ouvre avec la réservation déjà rédigée — il ne vous reste qu'à l'envoyer. Vous pouvez aussi nous écrire directement au 615 02 99 41.",
  },

  faq: {
    kicker: "Questions fréquentes",
    title: "Avant de venir",
    items: [
      {
        q: "Quels sont les horaires de La Dulce ?",
        a: "Nous sommes ouverts du mardi au dimanche, de 8h30 à 22h30 (fermé le lundi). Le brunch est servi jusqu'à 14h00 et les burgers à partir de 12h00.",
      },
      {
        q: "Où se trouve La Dulce ?",
        a: "Avenida los Abrigos, 2, à Los Abrigos (Granadilla de Abona), dans le sud de Tenerife, juste à côté du port de pêche.",
      },
      {
        q: "Où prendre le petit-déjeuner à Los Abrigos, Tenerife ?",
        a: "Chez La Dulce, en plein cœur du village de Los Abrigos, juste à côté du port de pêche. Nous servons petit-déjeuner et brunch du mardi au dimanche, de 8h30 à 22h30, avec des options sucrées et salées et une terrasse avec vue sur la mer.",
      },
      {
        q: "Faut-il réserver ?",
        a: "Ce n'est pas indispensable, mais le week-end et en haute saison, nous recommandons de réserver une table par WhatsApp pour garantir une place en terrasse.",
      },
      {
        q: "Avez-vous des options végétaliennes et sans gluten ?",
        a: "Oui. Nous proposons le burger végétalien HEÜRA, des bowls, des salades et des toasts, ainsi qu'une version sans gluten des pulgas (demandez la disponibilité).",
      },
      {
        q: "Est-ce un endroit adapté aux enfants ?",
        a: "Tout à fait. C'est un établissement familial, avec de la place pour la poussette et une terrasse couverte.",
      },
      {
        q: "Peut-on commander à emporter ?",
        a: "Oui, vous pouvez commander à emporter en appelant le 922 74 92 19.",
      },
      {
        q: "Quel type de cuisine proposez-vous ?",
        a: "Café de spécialité, brunch, pancakes, toasts, bagels, burgers, salades et pâtisseries maison. Le prix moyen est de 10 à 20 € par personne.",
      },
      {
        q: "Avez-vous du cortado natural et du café de spécialité ?",
        a: "Oui. Nous préparons cortado natural, café con leche, cappuccino et notre barraquito canarien traditionnel, couche par couche — le tout avec du café de spécialité, fraîchement préparé en terrasse.",
      },
    ],
  },

  footer: {
    tagline: "Café · Brunch · Terrasse — Los Abrigos, Tenerife",
    rights: "Tous droits réservés.",
    webBy: "Site web par",
    legal: { avisoLegal: "Mentions légales", privacidad: "Confidentialité", cookies: "Cookies" },
  },
};

export const HOME: Record<Locale, HomeCopy> = { es: HOME_ES, en: HOME_EN, de: HOME_DE, fr: HOME_FR };
