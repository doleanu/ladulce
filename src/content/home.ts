/* ---------------------------------------------------------------------------
   Homepage copy in Spanish and English. HomeView.tsx renders from one of these
   dictionaries depending on locale. Business facts (phone, address, hours,
   rating) live in site.ts and are not duplicated here.
   --------------------------------------------------------------------------- */

export type Locale = "es" | "en";

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
      "Del desayuno tranquilo al brunch de fin de semana. Estos son los platos que más se repiten en las reseñas — la carta completa tiene mucho más.",
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
    ratingAria: "4,4 sobre 5, con 757 reseñas en Google",
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
      "From a quiet breakfast to weekend brunch. These are the dishes reviewers mention again and again — the full menu has plenty more.",
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
    ratingAria: "4.4 out of 5, with 757 reviews on Google",
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
    ],
  },

  footer: {
    tagline: "Coffee · Brunch · Terrace — Los Abrigos, Tenerife",
    rights: "All rights reserved.",
    webBy: "Website by",
    legal: { avisoLegal: "Legal notice", privacidad: "Privacy", cookies: "Cookies" },
  },
};

export const HOME: Record<Locale, HomeCopy> = { es: HOME_ES, en: HOME_EN };
