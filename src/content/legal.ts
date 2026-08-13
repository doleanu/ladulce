/* ---------------------------------------------------------------------------
   Legal pages copy (Aviso legal / Privacidad / Cookies) in ES and EN.
   ⚠️ Items in «brackets» are PLACEHOLDERS — the owner must supply the real
   registered name, NIF/CIF and any other legal identity before going live.
   --------------------------------------------------------------------------- */

import type { Locale } from "@/content/home";

export type LegalSection = { h?: string; body: string[] };
export type LegalDoc = {
  slug: "aviso-legal" | "privacidad" | "cookies";
  title: string;
  updated: string;
  sections: LegalSection[];
};

const UPDATED_ES = "Última actualización: agosto de 2026";
const UPDATED_EN = "Last updated: August 2026";

const ADDR = "Av. los Abrigos, 2, 38618 Los Abrigos, Granadilla de Abona (Santa Cruz de Tenerife)";
const EMAIL = "ladulcelosabrigos@gmail.com";
const PHONE = "922 74 92 19";

export const LEGAL: Record<Locale, Record<LegalDoc["slug"], LegalDoc>> = {
  es: {
    "aviso-legal": {
      slug: "aviso-legal",
      title: "Aviso legal",
      updated: UPDATED_ES,
      sections: [
        {
          h: "Titular del sitio web",
          body: [
            "En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:",
            "Titular: Genocorp Rancel, S.L.",
            "NIF/CIF: B22642805.",
            `Domicilio: ${ADDR}.`,
            `Correo electrónico: ${EMAIL}. Teléfono: ${PHONE}.`,
            "Nombre comercial: La Dulce.",
          ],
        },
        {
          h: "Objeto",
          body: [
            "Este sitio web tiene por objeto ofrecer información sobre la cafetería La Dulce (carta, horarios, ubicación) y facilitar el contacto y la solicitud de reservas.",
          ],
        },
        {
          h: "Condiciones de uso",
          body: [
            "El acceso y uso del sitio atribuye la condición de usuario, que acepta las presentes condiciones. El usuario se compromete a hacer un uso adecuado de los contenidos y a no emplearlos para actividades ilícitas.",
            "Los precios y la disponibilidad de los productos mostrados son orientativos y pueden variar; la carta vigente es la disponible en el local.",
          ],
        },
        {
          h: "Propiedad intelectual",
          body: [
            "Los contenidos del sitio (textos, imágenes, marcas y diseño) están protegidos por derechos de propiedad intelectual e industrial. Queda prohibida su reproducción sin autorización del titular.",
          ],
        },
        {
          h: "Responsabilidad",
          body: [
            "El titular no se hace responsable de los daños derivados del uso del sitio ni de la indisponibilidad temporal del mismo por causas técnicas.",
          ],
        },
        {
          h: "Legislación aplicable",
          body: [
            "Las presentes condiciones se rigen por la legislación española. Para cualquier controversia serán competentes los juzgados y tribunales que correspondan conforme a la normativa aplicable.",
          ],
        },
      ],
    },
    privacidad: {
      slug: "privacidad",
      title: "Política de privacidad",
      updated: UPDATED_ES,
      sections: [
        {
          h: "Responsable del tratamiento",
          body: [
            "Responsable: Genocorp Rancel, S.L., NIF/CIF B22642805.",
            `Domicilio: ${ADDR}. Correo: ${EMAIL}.`,
          ],
        },
        {
          h: "Datos que tratamos y finalidad",
          body: [
            "Cuando solicitas una reserva a través del formulario, tratamos los datos que nos facilitas (nombre, fecha, hora, número de personas y comentario opcional) con la finalidad de gestionar tu reserva y atender tu solicitud.",
            "Importante: el formulario de reserva abre WhatsApp para enviarnos el mensaje. Por tanto, esos datos se transmiten y tratan también a través de WhatsApp (Meta Platforms Ireland Ltd.), conforme a sus propias políticas.",
          ],
        },
        {
          h: "Legitimación",
          body: ["La base legal es tu consentimiento al enviar la solicitud de reserva o contacto."],
        },
        {
          h: "Conservación",
          body: ["Conservamos los datos el tiempo necesario para gestionar tu reserva y, en su caso, durante los plazos legalmente exigibles."],
        },
        {
          h: "Destinatarios",
          body: [
            "No cedemos tus datos a terceros salvo obligación legal. El envío de la reserva se realiza a través de WhatsApp, por lo que Meta actúa como proveedor del servicio de mensajería.",
          ],
        },
        {
          h: "Tus derechos",
          body: [
            `Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${EMAIL}.`,
            "Si consideras que el tratamiento no se ajusta a la normativa, puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).",
          ],
        },
      ],
    },
    cookies: {
      slug: "cookies",
      title: "Política de cookies",
      updated: UPDATED_ES,
      sections: [
        {
          h: "Uso de cookies",
          body: [
            "Este sitio web no utiliza cookies de analítica, publicidad ni seguimiento de terceros.",
            "Las tipografías se sirven de forma local desde el propio sitio y no instalan cookies de terceros.",
          ],
        },
        {
          h: "Cookies técnicas",
          body: [
            "En su caso, solo se emplean cookies técnicas estrictamente necesarias para el funcionamiento del sitio, que están exentas del deber de consentimiento.",
          ],
        },
        {
          h: "Cambios futuros",
          body: [
            "Si en el futuro se incorporan herramientas de analítica o mapas embebidos que instalen cookies, se actualizará esta política y se solicitará tu consentimiento previo mediante un aviso de cookies.",
          ],
        },
      ],
    },
  },

  en: {
    "aviso-legal": {
      slug: "aviso-legal",
      title: "Legal notice",
      updated: UPDATED_EN,
      sections: [
        {
          h: "Website owner",
          body: [
            "In compliance with Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE), the details of the owner of this website are:",
            "Owner: Genocorp Rancel, S.L.",
            "Tax ID (NIF/CIF): B22642805.",
            `Address: ${ADDR}.`,
            `Email: ${EMAIL}. Phone: ${PHONE}.`,
            "Trade name: La Dulce.",
          ],
        },
        {
          h: "Purpose",
          body: [
            "This website provides information about the café La Dulce (menu, opening hours, location) and makes it easy to get in touch and request a reservation.",
          ],
        },
        {
          h: "Terms of use",
          body: [
            "Accessing and using the site makes you a user and implies acceptance of these terms. You agree to use the content properly and not for unlawful purposes.",
            "Prices and availability shown are indicative and may change; the menu in force is the one available at the premises.",
          ],
        },
        {
          h: "Intellectual property",
          body: [
            "The site's content (text, images, trademarks and design) is protected by intellectual and industrial property rights. Reproduction without the owner's authorisation is prohibited.",
          ],
        },
        {
          h: "Liability",
          body: [
            "The owner is not liable for damages arising from use of the site or for its temporary unavailability due to technical reasons.",
          ],
        },
        {
          h: "Applicable law",
          body: [
            "These terms are governed by Spanish law. Any dispute will be subject to the courts that apply under the relevant regulations.",
          ],
        },
      ],
    },
    privacidad: {
      slug: "privacidad",
      title: "Privacy policy",
      updated: UPDATED_EN,
      sections: [
        {
          h: "Data controller",
          body: ["Controller: Genocorp Rancel, S.L., Tax ID B22642805.", `Address: ${ADDR}. Email: ${EMAIL}.`],
        },
        {
          h: "Data we process and purpose",
          body: [
            "When you request a reservation through the form, we process the data you provide (name, date, time, number of people and an optional comment) in order to manage your booking and handle your request.",
            "Important: the reservation form opens WhatsApp to send us the message. Those data are therefore also transmitted and processed via WhatsApp (Meta Platforms Ireland Ltd.), under its own policies.",
          ],
        },
        {
          h: "Legal basis",
          body: ["The legal basis is your consent when you send the reservation or contact request."],
        },
        {
          h: "Retention",
          body: ["We keep the data for as long as needed to manage your booking and, where applicable, for legally required periods."],
        },
        {
          h: "Recipients",
          body: [
            "We do not share your data with third parties except where legally required. Reservations are sent via WhatsApp, so Meta acts as the messaging service provider.",
          ],
        },
        {
          h: "Your rights",
          body: [
            `You can exercise your rights of access, rectification, erasure, objection, restriction and portability by writing to ${EMAIL}.`,
            "If you believe the processing does not comply with the law, you may lodge a complaint with the Spanish Data Protection Agency (www.aepd.es).",
          ],
        },
      ],
    },
    cookies: {
      slug: "cookies",
      title: "Cookie policy",
      updated: UPDATED_EN,
      sections: [
        {
          h: "Use of cookies",
          body: [
            "This website does not use analytics, advertising or third-party tracking cookies.",
            "Fonts are served locally from the site itself and do not set third-party cookies.",
          ],
        },
        {
          h: "Technical cookies",
          body: [
            "Where applicable, only strictly necessary technical cookies are used for the site to work, which are exempt from the consent requirement.",
          ],
        },
        {
          h: "Future changes",
          body: [
            "If analytics tools or embedded maps that set cookies are added in the future, this policy will be updated and your prior consent will be requested via a cookie notice.",
          ],
        },
      ],
    },
  },
};
