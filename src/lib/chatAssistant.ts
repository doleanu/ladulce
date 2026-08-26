// Copy + helpers for the chat widget. Self-contained, rule-based (regex intent
// matching), no external API. Bilingual: getChat(locale) returns the ES or EN
// bundle. Facts come from src/content/site.ts and the Google Business Profile.
//
// Reservations are taken by WhatsApp (615 02 99 41); takeaway orders by phone.

import { SITE, FULL_ADDRESS } from "@/content/site";

export type Locale = "es" | "en" | "de";
export type Cta = { label: string; href: string };
export type Dish = { name: string; price: string };

const business = {
  name: SITE.name,
  phone: SITE.phoneDisplay,
  tel: `tel:${SITE.tel}`,
  whatsapp: SITE.whatsappDisplay,
  address: FULL_ADDRESS,
  maps: SITE.maps,
  instagram: SITE.instagram,
};

function waReserve(text: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

function menuText(intro: string, dishes: Dish[]) {
  return `${intro} ${dishes.map((d) => `${d.name} (${d.price})`).join(", ")}.`;
}

const RATING_ES = `${SITE.rating.value.toLocaleString("es-ES")} sobre 5, con ${SITE.rating.count} reseñas en Google`;
const RATING_EN = `${SITE.rating.value.toLocaleString("en-GB")} out of 5, with ${SITE.rating.count} Google reviews`;
const RATING_DE = `${SITE.rating.value.toLocaleString("de-DE")} von 5, mit ${SITE.rating.count} Google-Bewertungen`;

const SIGNATURE_ES: Dish[] = [
  { name: "Barraquito", price: "2,50 €" },
  { name: "Pancakes", price: "8 €" },
  { name: "Eggs Benedict", price: "9,50 €" },
  { name: "Smash Burger", price: "12,90 €" },
  { name: "Tostada de aguacate", price: "7,60 €" },
  { name: "Cheesecake", price: "5 €" },
];
const SIGNATURE_EN: Dish[] = [
  { name: "Barraquito", price: "€2.50" },
  { name: "Pancakes", price: "€8" },
  { name: "Eggs Benedict", price: "€9.50" },
  { name: "Smash Burger", price: "€12.90" },
  { name: "Avocado toast", price: "€7.60" },
  { name: "Cheesecake", price: "€5" },
];
const SIGNATURE_DE: Dish[] = [
  { name: "Barraquito", price: "2,50 €" },
  { name: "Pancakes", price: "8 €" },
  { name: "Eggs Benedict", price: "9,50 €" },
  { name: "Smash Burger", price: "12,90 €" },
  { name: "Avocado-Toast", price: "7,60 €" },
  { name: "Cheesecake", price: "5 €" },
];

const ES = {
  cartaHref: "/carta",
  whatsappLink: waReserve("¡Hola La Dulce! Me gustaría reservar mesa."),
  rating: RATING_ES,
  signature: SIGNATURE_ES,
  orderKindOptions: ["Para llevar", "En el local"],
  orderWhenOptions: ["Ahora", "En 30 min", "Más tarde"],
  quickReplies: { hours: "Horario", menu: "Ver carta", reserve: "Reservar mesa", order: "Pedir para llevar", location: "Cómo llegar" },
  copy: {
    greeting: `¡Hola! Soy el asistente de ${business.name} 👋 Puedo ayudarte con el horario, la carta, reservar mesa o cómo llegar. ¿En qué te ayudo?`,
    greetingReply: "¿Quieres saber el horario, ver la carta, reservar mesa o cómo llegar?",
    unknownReply: "No estoy seguro de haber entendido, pero puedo ayudarte con esto:",
    hours: "De martes a domingo, de 8:30 a 22:30 (lunes cerrado). El brunch se sirve hasta las 14:00. ¿Te ayudo con la carta o quieres reservar mesa?",
    menuIntro: "Algunos de nuestros favoritos:",
    menuTail: "Aquí tienes la carta completa 👇",
    menuCta: "Ver la carta completa",
    reserve: `¡Genial! Las reservas las gestionamos por WhatsApp, al ${business.whatsapp}. Te contestamos enseguida — pulsa el botón y ya está.`,
    location: `Estamos en ${business.address}. De martes a domingo, de 8:30 a 22:30. ¿Te ayudo a reservar mesa?`,
    orderStart: "¡Genial! ¿Para llevar o para tomar en el local?",
    askWhen: (kind: string) => `Perfecto, ${kind.toLowerCase()}. ¿Para cuándo lo quieres?`,
    askName: "Última cosa — ¿a nombre de quién lo apunto?",
    confirm: (name: string, kind: string, when: string) =>
      `¡Listo, ${name}! Apunto: ${kind.toLowerCase()}, ${when.toLowerCase()}. Para confirmarlo, llama a La Dulce — lo prepararán al momento.`,
    callCta: `Llamar · ${business.phone}`,
    waCta: "Reservar por WhatsApp",
    mapsCta: "Cómo llegar",
    inputPlaceholder: "Escribe tu pregunta…",
    sendLabel: "Enviar",
    openLabel: "Abrir asistente",
    closeLabel: "Cerrar asistente",
    headerTitle: `Asistente ${business.name}`,
    headerStatus: "Responde al instante",
  },
};

const EN: typeof ES = {
  cartaHref: "/en/carta",
  whatsappLink: waReserve("Hi La Dulce! I'd like to book a table."),
  rating: RATING_EN,
  signature: SIGNATURE_EN,
  orderKindOptions: ["Takeaway", "Eat in"],
  orderWhenOptions: ["Now", "In 30 min", "Later"],
  quickReplies: { hours: "Hours", menu: "See menu", reserve: "Book a table", order: "Order takeaway", location: "Get directions" },
  copy: {
    greeting: `Hi! I'm ${business.name}'s assistant 👋 I can help with opening hours, the menu, booking a table or directions. What do you need?`,
    greetingReply: "Would you like the opening hours, the menu, to book a table, or directions?",
    unknownReply: "I'm not sure I got that, but I can help with these:",
    hours: "Tuesday to Sunday, 8:30 to 22:30 (closed Mondays). Brunch is served until 14:00. Shall I show you the menu, or book a table?",
    menuIntro: "A few of our favourites:",
    menuTail: "Here's the full menu 👇",
    menuCta: "See the full menu",
    reserve: `Great! We take reservations on WhatsApp, at ${business.whatsapp}. We reply right away — just tap the button.`,
    location: `We're at ${business.address}. Tuesday to Sunday, 8:30 to 22:30. Shall I help you book a table?`,
    orderStart: "Great! Takeaway or eat in?",
    askWhen: (kind: string) => `Perfect, ${kind.toLowerCase()}. When would you like it?`,
    askName: "Last thing — what name should I put it under?",
    confirm: (name: string, kind: string, when: string) =>
      `All set, ${name}! I've noted: ${kind.toLowerCase()}, ${when.toLowerCase()}. To confirm, give La Dulce a call — they'll have it ready.`,
    callCta: `Call · ${business.phone}`,
    waCta: "Book on WhatsApp",
    mapsCta: "Get directions",
    inputPlaceholder: "Type your question…",
    sendLabel: "Send",
    openLabel: "Open assistant",
    closeLabel: "Close assistant",
    headerTitle: `${business.name} assistant`,
    headerStatus: "Replies instantly",
  },
};

const DE: typeof ES = {
  cartaHref: "/de/carta",
  whatsappLink: waReserve("Hallo La Dulce! Ich möchte gerne einen Tisch reservieren."),
  rating: RATING_DE,
  signature: SIGNATURE_DE,
  orderKindOptions: ["Zum Mitnehmen", "Vor Ort essen"],
  orderWhenOptions: ["Jetzt", "In 30 Min.", "Später"],
  quickReplies: { hours: "Öffnungszeiten", menu: "Speisekarte", reserve: "Tisch reservieren", order: "Zum Mitnehmen bestellen", location: "Route planen" },
  copy: {
    greeting: `Hallo! Ich bin der Assistent von ${business.name} 👋 Ich kann dir mit den Öffnungszeiten, der Speisekarte, einer Tischreservierung oder der Anfahrt helfen. Womit kann ich helfen?`,
    greetingReply: "Möchtest du die Öffnungszeiten wissen, die Speisekarte sehen, einen Tisch reservieren oder die Anfahrt?",
    unknownReply: "Ich bin nicht ganz sicher, was du meinst, aber ich kann dir hiermit helfen:",
    hours: "Dienstag bis Sonntag, 8:30 bis 22:30 Uhr (montags geschlossen). Brunch wird bis 14:00 Uhr serviert. Soll ich dir die Speisekarte zeigen oder einen Tisch reservieren?",
    menuIntro: "Ein paar unserer Favoriten:",
    menuTail: "Hier ist die vollständige Speisekarte 👇",
    menuCta: "Zur vollständigen Speisekarte",
    reserve: `Super! Reservierungen laufen über WhatsApp, unter ${business.whatsapp}. Wir antworten sofort — einfach auf den Button tippen.`,
    location: `Wir befinden uns in ${business.address}. Dienstag bis Sonntag, 8:30 bis 22:30 Uhr. Soll ich dir helfen, einen Tisch zu reservieren?`,
    orderStart: "Super! Zum Mitnehmen oder vor Ort essen?",
    askWhen: (kind: string) => `Perfekt, ${kind.toLowerCase()}. Für wann möchtest du es?`,
    askName: "Eine letzte Sache — auf welchen Namen soll ich es notieren?",
    confirm: (name: string, kind: string, when: string) =>
      `Alles klar, ${name}! Ich habe notiert: ${kind.toLowerCase()}, ${when.toLowerCase()}. Zur Bestätigung ruf bitte bei La Dulce an — es wird dann sofort vorbereitet.`,
    callCta: `Anrufen · ${business.phone}`,
    waCta: "Per WhatsApp reservieren",
    mapsCta: "Route planen",
    inputPlaceholder: "Schreib deine Frage…",
    sendLabel: "Senden",
    openLabel: "Assistent öffnen",
    closeLabel: "Assistent schließen",
    headerTitle: `${business.name} Assistent`,
    headerStatus: "Antwortet sofort",
  },
};

export function getChat(locale: Locale) {
  const c = locale === "en" ? EN : locale === "de" ? DE : ES;
  return {
    business,
    cartaHref: c.cartaHref,
    whatsappLink: c.whatsappLink,
    menuMessage: menuText(c.copy.menuIntro, c.signature) + " " + c.copy.menuTail,
    orderKindOptions: c.orderKindOptions,
    orderWhenOptions: c.orderWhenOptions,
    quickReplies: c.quickReplies,
    mainQuickReplies: [c.quickReplies.hours, c.quickReplies.menu, c.quickReplies.reserve, c.quickReplies.location],
    copy: c.copy,
  };
}

export type Intent = "hours" | "menu" | "reserve" | "order" | "location" | "greeting" | "unknown";

const INTENT_PATTERNS: Record<Exclude<Intent, "unknown">, RegExp> = {
  greeting: /hola|buenas|hey|qué tal|que tal|hello|\bhi\b|good morning|hallo|guten tag|servus|moin/i,
  hours: /hora|horario|abiert|cerrad|lunes|hour|open|clos|öffnungszeit|geöffnet|geschlossen|montag/i,
  reserve: /reserv|mesa|booking|book|table|tisch/i,
  order: /pedid|pedir|encarg|llevar|domicilio|take ?away|order|to go|mitnehmen|bestell|abholen/i,
  menu: /carta|men[uú]|comida|desayun|brunch|barraquito|pancake|precio|menu|food|dish|price|speisekarte|essen|frühstück|preis/i,
  location: /d[oó]nde|ubicaci|direcci|llegar|maps|avenida|where|address|direction|location|wo\b|adresse|anfahrt|route/i,
};

export function matchIntent(raw: string): Intent {
  if (INTENT_PATTERNS.greeting.test(raw)) return "greeting";
  if (INTENT_PATTERNS.hours.test(raw)) return "hours";
  if (INTENT_PATTERNS.reserve.test(raw)) return "reserve";
  if (INTENT_PATTERNS.order.test(raw)) return "order";
  if (INTENT_PATTERNS.menu.test(raw)) return "menu";
  if (INTENT_PATTERNS.location.test(raw)) return "location";
  return "unknown";
}
