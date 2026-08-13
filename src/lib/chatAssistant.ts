// Copy + small helpers for the AI chat widget. Self-contained, rule-based
// (regex intent matching), no external API. Every fact below is sourced
// directly from src/app/page.tsx and src/app/layout.tsx — nothing invented.
//
// La Dulce is a café / brunch spot with a terrace in Los Abrigos. It has no
// table-reservation system on the site (no "reservar" CTA anywhere) and no
// WhatsApp number — every CTA on the real site is either "Llama" (tel:) or
// "Cómo llegar" (Maps). So the assistant's booking-style flow here is a
// lightweight "pedido" (order) collector — para llevar / a domicilio / en
// el local — that hands off to a phone call, since that's the only real
// ordering channel the business actually offers.

export const business = {
  name: "La Dulce",
  tagline: "Café · Brunch · Terraza — Los Abrigos",
  phone: "922 74 92 19",
  tel: "tel:+34922749219",
  address: "Av. los Abrigos, 2, 38618 Los Abrigos, Santa Cruz de Tenerife",
  maps: "https://www.google.com/maps/search/?api=1&query=La+Dulce+Av.+los+Abrigos+2+38618+Los+Abrigos",
  hoursLine: "Abierto todos los días, hasta las 21:30",
  rating: "4,4 sobre 5, con 742 reseñas en Google",
};

// A short, representative slice of the real carta (src/app/page.tsx MENU),
// favouring the items the copy itself calls out as review favourites.
export const signatureMenu = [
  { name: "Barraquito", note: "la especialidad de la casa, en capas" },
  { name: "Pancakes", price: "8 €", note: "los más nombrados en las reseñas" },
  { name: "Eggs Benedict", price: "14,95 €" },
  { name: "Tostada de aguacate", price: "7,60 €" },
  { name: "Cheesecake", price: "2,20 € – 5 €" },
];

type OrderKind = "Para llevar" | "A domicilio" | "En el local";
type OrderWhen = "Ahora" | "En 30 min" | "Más tarde";

export const orderKindOptions: OrderKind[] = ["Para llevar", "A domicilio", "En el local"];
export const orderWhenOptions: OrderWhen[] = ["Ahora", "En 30 min", "Más tarde"];

export const quickReplies = {
  hours: "Horario",
  menu: "Ver carta",
  order: "Hacer un pedido",
  location: "Cómo llegar",
};
export const mainQuickReplies = [quickReplies.hours, quickReplies.menu, quickReplies.order, quickReplies.location];

export const copy = {
  greeting:
    `¡Hola! Soy el asistente de ${business.name} 👋 Puedo ayudarte con el horario, la carta, hacer un pedido o cómo llegar. ¿En qué te ayudo?`,
  greetingReply: "¿Quieres saber el horario, ver la carta, hacer un pedido o cómo llegar?",
  unknownReply: "No estoy seguro de haber entendido, pero puedo ayudarte con esto:",

  hours: `${business.hoursLine}. ¿Te ayudo con la carta o quieres hacer un pedido?`,

  menu: () =>
    `Algunos de nuestros favoritos: ${signatureMenu
      .map((i) => (i.price ? `${i.name} (${i.price})` : i.name))
      .join(", ")}. La carta completa está más arriba en la web — precio medio entre 10 y 20 € por persona. ¿Hacemos un pedido?`,

  location: `Estamos en ${business.address}. ${business.hoursLine}. ¿Te ayudo a hacer un pedido?`,

  orderStart: "¡Genial! ¿Para llevar, a domicilio, o para tomar en el local?",
  askWhen: (kind: string) => `Perfecto, ${kind.toLowerCase()}. ¿Para cuándo lo quieres?`,
  askName: "Última cosa — ¿a nombre de quién lo apunto?",
  confirm: (name: string, kind: string, when: string) =>
    `¡Listo, ${name}! Apunto: ${kind.toLowerCase()}, ${when.toLowerCase()}. Para confirmarlo, llama directamente a La Dulce — lo prepararán al momento.`,

  ratingLine: `Nos valoran con ${business.rating}.`,

  callCta: `Llamar · ${business.phone}`,
  mapsCta: "Cómo llegar",

  inputPlaceholder: "Escribe tu pregunta…",
  sendLabel: "Enviar",
  openLabel: "Abrir asistente",
  closeLabel: "Cerrar asistente",
  headerTitle: `Asistente ${business.name}`,
  headerStatus: "Responde al instante",
};

type Intent = "hours" | "menu" | "order" | "location" | "greeting" | "unknown";

const INTENT_PATTERNS: Record<Exclude<Intent, "unknown">, RegExp> = {
  greeting: /hola|buenas|hey|qué tal|que tal/i,
  hours: /hora|horario|abiert|cerrad/i,
  menu: /carta|men[uú]|comida|desayun|brunch|barraquito|pancake|precio/i,
  order: /pedid|pedir|encarg|llevar|domicilio|reserv|mesa/i,
  location: /d[oó]nde|ubicaci|direcci|llegar|maps|avenida/i,
};

export function matchIntent(raw: string): Intent {
  if (INTENT_PATTERNS.greeting.test(raw)) return "greeting";
  if (INTENT_PATTERNS.hours.test(raw)) return "hours";
  if (INTENT_PATTERNS.menu.test(raw)) return "menu";
  if (INTENT_PATTERNS.order.test(raw)) return "order";
  if (INTENT_PATTERNS.location.test(raw)) return "location";
  return "unknown";
}
