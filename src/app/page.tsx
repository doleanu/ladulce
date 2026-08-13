import type { ComponentType, CSSProperties } from "react";
import Reveal from "@/components/Reveal";
import Barraquito from "@/components/Barraquito";
import { ReservationForm } from "@/components/ReservationForm";
import {
  AvoToast,
  AvocadoHalf,
  Benedict,
  Cheesecake,
  Croissant,
  Croquetas,
  FriedEgg,
  LeafSprig,
  OrangeSlice,
  Pancakes,
  SmashBurger,
  Smoothie,
  SteamCup,
  Strawberry,
  Sun,
} from "@/components/cutouts";

const TEL = "tel:+34922749219";
const MAPS =
  "https://www.google.com/maps/search/?api=1&query=La+Dulce+Av.+los+Abrigos+2+38618+Los+Abrigos";

/* ---------------------------------- hero ---------------------------------- */

function HeroPiece({
  className,
  r,
  d,
  children,
}: {
  className: string;
  r: number;
  d: number;
  children: React.ReactNode;
}) {
  return (
    <div
      aria-hidden="true"
      className={`settle absolute pointer-events-none ${className}`}
      style={{ "--r": `${r}deg`, "--d": `${d}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pt-32 pb-28 sm:pb-36">
      {/* scattered collage */}
      <HeroPiece
        className="left-[2%] top-[7%] w-16 sm:left-[3%] sm:top-[6%] sm:w-32 lg:w-40"
        r={-9}
        d={150}
      >
        <OrangeSlice />
      </HeroPiece>
      <HeroPiece
        className="right-[2%] top-[8%] w-20 sm:right-[4%] sm:w-36 lg:w-44"
        r={7}
        d={300}
      >
        <Croissant />
      </HeroPiece>
      <HeroPiece
        className="left-[3%] bottom-[3%] top-auto w-16 sm:left-[6%] sm:top-[58%] sm:bottom-auto sm:w-28 lg:w-32"
        r={-5}
        d={450}
      >
        <SteamCup />
      </HeroPiece>
      <HeroPiece
        className="right-[4%] bottom-[24%] top-auto w-12 sm:right-[7%] sm:top-[56%] sm:bottom-auto sm:w-20 lg:w-24"
        r={11}
        d={600}
      >
        <Strawberry />
      </HeroPiece>
      <HeroPiece className="hidden sm:block left-[22%] bottom-[4%] w-24 lg:w-28" r={5} d={750}>
        <FriedEgg />
      </HeroPiece>
      <HeroPiece className="right-[14%] bottom-[2%] w-14 sm:right-[18%] sm:bottom-[3%] sm:w-20 lg:w-24" r={-8} d={900}>
        <AvocadoHalf />
      </HeroPiece>
      <HeroPiece className="hidden md:block left-[30%] top-[3%] w-14 lg:w-16" r={14} d={1050}>
        <LeafSprig />
      </HeroPiece>
      <HeroPiece className="hidden md:block right-[27%] top-[2%] w-16 lg:w-20" r={-4} d={1150}>
        <Sun />
      </HeroPiece>

      <div className="relative mx-auto max-w-4xl text-center">
        <p
          className="ink text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-espresso/70"
          style={{ "--d": "80ms" } as CSSProperties}
        >
          Café · Brunch · Terraza — Los Abrigos
        </p>
        <h1
          className="ink font-display mt-4 text-[4.4rem] leading-[0.95] sm:text-8xl lg:text-[9.5rem] font-semibold text-espresso"
          style={{ "--d": "200ms" } as CSSProperties}
        >
          La&nbsp;Dulce
        </h1>
        <p
          className="ink mx-auto mt-6 max-w-md text-base sm:text-lg text-espresso/80"
          style={{ "--d": "380ms" } as CSSProperties}
        >
          Barraquitos, pancakes y mañanas largas junto al mar. Abierto todos los
          días, hasta las 21:30.
        </p>
        <div
          className="ink mt-9 flex flex-wrap items-center justify-center gap-4"
          style={{ "--d": "520ms" } as CSSProperties}
        >
          <a
            href={TEL}
            className="paper-card inline-block bg-terracota px-7 py-3.5 font-semibold text-crema"
            style={{ "--r": "-1.5deg" } as CSSProperties}
          >
            Llama · 922 74 92 19
          </a>
          <a
            href="#barraquito"
            className="paper-card inline-block px-7 py-3.5 font-semibold text-espresso"
            style={{ "--r": "1.5deg" } as CSSProperties}
          >
            El barraquito ↓
          </a>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- marquee --------------------------------- */

const MARQUEE_WORDS = [
  "Barraquito",
  "Pancakes",
  "Smash Burger",
  "Eggs Benedict",
  "Tostada de aguacate",
  "Cheesecake",
  "Smoothies",
  "Zumo natural",
  "Cappuccino",
  "Croquetas",
  "Brunch",
];
const MARQUEE_COLORS = [
  "var(--mantequilla)",
  "var(--pistacho)",
  "var(--melocoton)",
  "var(--crema)",
];

function MarqueeRun() {
  return (
    <>
      {MARQUEE_WORDS.map((w, i) => (
        <span
          key={w}
          className="font-display mx-5 flex items-center gap-10 whitespace-nowrap text-2xl sm:text-3xl font-semibold"
          style={{ color: MARQUEE_COLORS[i % MARQUEE_COLORS.length] }}
        >
          {w}
          <span aria-hidden="true" className="text-lg opacity-70">
            ✳
          </span>
        </span>
      ))}
    </>
  );
}

function Marquee() {
  return (
    <div
      className="relative overflow-hidden bg-espresso py-4 -rotate-1 scale-[1.02]"
      aria-hidden="true"
    >
      <div className="marquee-track">
        <div className="flex">
          <MarqueeRun />
        </div>
        <div className="flex">
          <MarqueeRun />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- barraquito ------------------------------- */

function BarraquitoSection() {
  return (
    <section id="barraquito" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-terracota">
            La especialidad de la casa
          </p>
          <h2 className="font-display mt-3 text-5xl sm:text-7xl font-semibold text-espresso">
            El barraquito
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-espresso/80">
            El café canario por excelencia, capa a capa. En La Dulce se sirve
            como manda la tradición: sin remover, para bebérselo por pisos.
          </p>
        </Reveal>
        <Reveal className="mt-10 sm:mt-14" delay={150} rotate={1.5}>
          <Barraquito className="mx-auto w-full max-w-3xl" />
        </Reveal>
        <Reveal className="mt-8 text-center" delay={250}>
          <a
            href={TEL}
            className="paper-card inline-block bg-mantequilla px-6 py-3 font-semibold text-espresso"
            style={{ "--r": "-1deg" } as CSSProperties}
          >
            Pide el tuyo en la terraza
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------- menu ---------------------------------- */

type MenuItem = {
  name: string;
  note: string;
  Icon: ComponentType<{ className?: string }>;
  bg: string;
  price?: string;
};

const MENU: MenuItem[] = [
  {
    name: "Pancakes",
    note: "Esponjosos y dorados. Los más nombrados en las reseñas.",
    Icon: Pancakes,
    bg: "var(--crema)",
    price: "8 €",
  },
  {
    name: "Eggs Benedict",
    note: "Huevo escalfado y salsa holandesa, un clásico del brunch.",
    Icon: Benedict,
    bg: "var(--crema)",
    price: "14,95 €",
  },
  {
    name: "Tostada de aguacate",
    note: "Verde, fresca y de las que se fotografían solas.",
    Icon: AvoToast,
    bg: "var(--crema)",
    price: "7,60 €",
  },
  {
    name: "Smash Burger",
    note: "Fina, jugosa y a la plancha. Para la tarde también hay plan.",
    Icon: SmashBurger,
    bg: "var(--crema)",
    price: "8 € – 12,95 €",
  },
  {
    name: "Smoothies y zumos",
    note: "Fruta fresca recién licuada, y cappuccino para los cafeteros.",
    Icon: Smoothie,
    bg: "var(--crema)",
    price: "4,90 €",
  },
  {
    name: "Cheesecake y postres",
    note: "Cremosa de verdad. Otra favorita de las reseñas.",
    Icon: Cheesecake,
    bg: "var(--crema)",
    price: "2,20 € – 5 €",
  },
  {
    name: "Croquetas",
    note: "Para compartir cuando el desayuno se alarga hasta la tarde.",
    Icon: Croquetas,
    bg: "var(--crema)",
    price: "6,50 €",
  },
  {
    name: "Huevos revueltos",
    note: "Sencillos y recién hechos, para empezar el día sin prisa.",
    Icon: FriedEgg,
    bg: "var(--crema)",
    price: "4 €",
  },
  {
    name: "English breakfast",
    note: "El desayuno inglés al completo, para los que llegan con hambre.",
    Icon: FriedEgg,
    bg: "var(--crema)",
    price: "8,50 €",
  },
  {
    name: "Ensaladas",
    note: "Frescas y ligeras, perfectas para el mediodía en la terraza.",
    Icon: LeafSprig,
    bg: "var(--crema)",
    price: "10,50 € – 11,50 €",
  },
  {
    name: "Sandwiches",
    note: "Rápidos y variados, para media mañana o media tarde.",
    Icon: AvoToast,
    bg: "var(--crema)",
    price: "3 € – 8,90 €",
  },
  {
    name: "Tortillas / omelettes",
    note: "Al gusto, con el relleno que prefieras.",
    Icon: Benedict,
    bg: "var(--crema)",
    price: "11,90 €",
  },
  {
    name: "Café",
    note: "De barra, para acompañar cualquier hora del día.",
    Icon: SteamCup,
    bg: "var(--crema)",
    price: "1,10 € – 5,10 €",
  },
  {
    name: "Vino (copa/botella)",
    note: "Para alargar la tarde en la terraza.",
    Icon: OrangeSlice,
    bg: "var(--crema)",
    price: "2,80 € – 18 €",
  },
];

function MenuSection() {
  return (
    <section id="carta" className="relative px-5 py-24 sm:py-32 bg-[#eef0d8]">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-pistacho-deep" style={{ color: "var(--pistacho-deep)" }}>
            Carta de mañana y tarde
          </p>
          <h2 className="font-display mt-3 text-5xl sm:text-7xl font-semibold text-espresso">
            Brunch &amp; carta
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-espresso/80">
            Del desayuno tranquilo a la merienda que se convierte en cena.
            Precio medio entre 10 y 20 € por persona.
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MENU.map(({ name, note, Icon, price }, i) => (
            <Reveal
              as="li"
              key={name}
              delay={(i % 3) * 120}
              rotate={i % 2 === 0 ? -3 : 3}
            >
              <div
                className="paper-card flex h-full items-center gap-5 p-5 sm:p-6"
                style={{ "--r": `${i % 2 === 0 ? -1.2 : 1.4}deg` } as CSSProperties}
              >
                <div className="w-20 shrink-0 sm:w-24">
                  <Icon />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="font-display text-2xl font-semibold text-espresso">
                      {name}
                    </h3>
                    {price && (
                      <span className="whitespace-nowrap text-sm font-semibold text-terracota">
                        {price}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-espresso/75">{note}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal as="li" delay={240} rotate={-2}>
            <div
              className="paper-card flex h-full flex-col items-center justify-center gap-2 bg-terracota p-6 text-center text-crema"
              style={{ "--r": "1.6deg" } as CSSProperties}
            >
              <p className="font-display text-2xl font-semibold">
                ¿Se te antoja algo?
              </p>
              <p className="text-sm opacity-90">
                Para llevar o a domicilio, también.
              </p>
              <a href={TEL} className="mt-2 font-semibold underline underline-offset-4">
                922 74 92 19
              </a>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}

/* --------------------------------- terraza --------------------------------- */

function Awning() {
  const stripes = Array.from({ length: 12 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 720 92"
      className="cut w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {stripes.map((i) => {
        const fill = i % 2 === 0 ? "var(--terracota)" : "var(--crema)";
        return (
          <g key={i} fill={fill}>
            <rect x={i * 60} y="0" width="60" height="60" />
            <path d={`M${i * 60} 58 a30 30 0 0 0 60 0 Z`} />
          </g>
        );
      })}
    </svg>
  );
}

function TerraceVignette() {
  return (
    <svg viewBox="0 0 340 220" className="cut w-full" aria-hidden="true">
      {/* sun */}
      <g transform="translate(288 36) scale(0.5)">
        <g fill="var(--terracota)">
          <path d="M0 -56 L8 -38 L-8 -37 Z" />
          <path d="M40 -40 L38 -20 L24 -29 Z" />
          <path d="M56 0 L38 9 L38 -8 Z" />
          <path d="M40 41 L21 32 L33 20 Z" />
          <path d="M0 56 L-8 38 L9 37 Z" />
          <path d="M-41 40 L-38 21 L-24 31 Z" />
          <path d="M-56 0 L-38 -7 L-38 10 Z" />
          <path d="M-40 -39 L-22 -31 L-34 -20 Z" />
        </g>
        <path
          d="M-27 -2 C-25 -19 -11 -30 5 -28 C21 -26 32 -13 30 4 C28 21 13 32 -3 30 C-19 28 -29 15 -27 -2 Z"
          fill="var(--mantequilla)"
        />
      </g>

      {/* two figures at a table, watching the street */}
      <path
        d="M64 118 C62 104 74 94 88 96 C101 98 108 108 105 120 C110 122 112 128 108 131 L62 131 C58 128 60 122 64 118 Z"
        fill="var(--melocoton-deep)"
      />
      <path
        d="M74 92 C72 80 82 71 93 74 C103 77 106 89 99 96 C91 101 79 100 74 92 Z"
        fill="var(--terracota)"
      />
      <path
        d="M232 116 C230 102 242 92 256 94 C269 96 276 106 273 118 C278 120 280 126 276 129 L230 129 C226 126 228 120 232 116 Z"
        fill="var(--pistacho-deep)"
      />
      <path
        d="M240 90 C238 78 248 69 259 72 C269 75 272 87 265 94 C257 99 245 98 240 90 Z"
        fill="var(--pistacho)"
      />

      {/* table */}
      <path
        d="M126 132 C126 126 134 122 170 122 C206 122 214 126 214 132 C214 137 206 140 170 140 C134 140 126 137 126 132 Z"
        fill="var(--crema)"
      />
      <path d="M164 140 L162 196 L178 196 L176 140 Z" fill="var(--espresso-soft)" />

      {/* cups on the table */}
      <path
        d="M148 112 C147 121 151 126 158 126 C165 126 169 121 168 112 C161 110 155 110 148 112 Z"
        fill="var(--mantequilla)"
      />
      <path
        d="M182 108 C181 119 185 125 192 125 C199 125 203 119 202 108 C195 106 189 106 182 108 Z"
        fill="var(--melocoton)"
      />
      <path
        className="steam-line"
        d="M192 100 C189 94 194 90 191 84"
        stroke="var(--espresso-soft)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />

      {/* pavement */}
      <path
        d="M18 200 C120 192 220 192 322 200"
        stroke="var(--espresso-soft)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />

      {/* stroller wheel + leaf: family-friendly hint */}
      <g transform="translate(38 158)">
        <path
          d="M-14 0 C-13 -8 -6 -14 2 -13 C10 -12 15 -5 13 3 C11 11 3 15 -5 12 C-11 10 -14 6 -14 0 Z"
          fill="var(--mantequilla)"
        />
        <path d="M-1 -1 L1 1" stroke="var(--espresso)" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g transform="translate(312 168) rotate(14) scale(0.5)">
        <path
          d="M0 40 C-2 20 0 0 6 -34"
          stroke="var(--pistacho-deep)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M4 -24 C14 -32 26 -32 32 -26 C28 -15 16 -10 6 -13 Z" fill="var(--pistacho)" />
        <path d="M0 0 C-11 -7 -23 -5 -28 2 C-23 12 -11 15 -1 11 Z" fill="var(--pistacho)" />
      </g>
    </svg>
  );
}

function TerraceSection() {
  return (
    <section id="terraza" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <Awning />
          </div>
        </Reveal>
        <div className="mt-12 grid items-center gap-10 sm:mt-16 sm:grid-cols-2">
          <Reveal rotate={-2}>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-terracota">
              La terraza
            </p>
            <h2 className="font-display mt-3 text-5xl sm:text-6xl font-semibold text-espresso">
              Ver pasar Los&nbsp;Abrigos
            </h2>
            <p className="mt-5 text-espresso/80">
              Terraza cubierta para desayunos largos y tardes sin reloj:
              el mejor sitio del pueblo para ver la vida pasar con un
              barraquito delante. Dentro, un interior moderno y con estilo.
            </p>
            <p className="mt-4 text-espresso/80">
              Con peques sois más que bienvenidos — hay sitio para el carrito
              — y las raciones son generosas, a un precio justo.
            </p>
          </Reveal>
          <Reveal delay={150} rotate={2.5}>
            <div className="paper-card p-6" style={{ "--r": "1.2deg" } as CSSProperties}>
              <TerraceVignette />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- reseñas --------------------------------- */

function Medallion() {
  const lobes = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    return { cx: 110 + Math.cos(a) * 90, cy: 110 + Math.sin(a) * 90 };
  });
  const STAR =
    "M0 -9 L2.6 -2.8 L9 -2.4 L4 1.8 L5.6 8.4 L0 4.8 L-5.6 8.4 L-4 1.8 L-9 -2.4 L-2.6 -2.8 Z";
  return (
    <svg
      viewBox="0 0 220 220"
      className="cut-deep mx-auto w-64 sm:w-72"
      role="img"
      aria-label="4,4 sobre 5, con 742 reseñas en Google"
    >
      <g fill="var(--mantequilla)">
        {lobes.map((l, i) => (
          <circle key={i} cx={l.cx} cy={l.cy} r="15" />
        ))}
        <circle cx="110" cy="110" r="96" />
      </g>
      <path
        d="M110 34 C153 32 187 66 188 109 C189 152 154 187 111 186 C68 187 33 153 32 110 C31 67 67 36 110 34 Z"
        fill="var(--crema)"
      />
      <text
        x="110"
        y="102"
        textAnchor="middle"
        fontSize="58"
        fontWeight="600"
        fontFamily="var(--font-display), serif"
        fill="var(--espresso)"
      >
        4,4
      </text>
      <g transform="translate(110 128)">
        {[-2, -1, 0, 1, 2].map((i) => (
          <path
            key={i}
            d={STAR}
            transform={`translate(${i * 22} 0) rotate(${i * 4})`}
            fill="var(--terracota)"
            opacity={i === 2 ? 0.35 : 1}
          />
        ))}
      </g>
      <text
        x="110"
        y="162"
        textAnchor="middle"
        fontSize="14"
        fontWeight="600"
        fontFamily="var(--font-sans), sans-serif"
        fill="var(--espresso-soft)"
      >
        742 reseñas
      </text>
      <text
        x="110"
        y="180"
        textAnchor="middle"
        fontSize="12"
        fontFamily="var(--font-sans), sans-serif"
        fill="var(--espresso-soft)"
      >
        en Google
      </text>
    </svg>
  );
}

const STRIPS = [
  { text: "“Desayunos y brunch que enamoran”", bg: "var(--melocoton)", r: -2 },
  { text: "“Servicio cercano y atento, de diez”", bg: "var(--pistacho)", r: 1.5 },
  { text: "“Raciones generosas a precio justo”", bg: "var(--mantequilla)", r: -1 },
  { text: "“Una joya escondida en Los Abrigos”", bg: "var(--crema)", r: 2 },
  { text: "“Perfecto para ir con peques”", bg: "var(--melocoton)", r: -1.5 },
];

function ReviewsSection() {
  return (
    <section id="resenas" className="px-5 py-24 sm:py-32 bg-[#f8ecc7]">
      <div className="mx-auto max-w-4xl">
        <div className="grid items-center gap-12 sm:grid-cols-2">
          <Reveal rotate={3}>
            <div className="-rotate-3">
              <Medallion />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-terracota">
                Lo que se comenta
              </p>
              <h2 className="font-display mt-3 text-5xl font-semibold text-espresso">
                Boca a boca
              </h2>
              <p className="mt-4 text-sm text-espresso/70">
                Lo que se repite, una y otra vez, en las reseñas de Google
                — en nuestras palabras:
              </p>
            </Reveal>
            <ul className="mt-8 space-y-4">
              {STRIPS.map((s, i) => (
                <Reveal as="li" key={s.text} delay={i * 110} rotate={s.r * 2}>
                  <div
                    className="torn inline-block px-5 py-3 font-medium text-espresso"
                    style={{
                      background: s.bg,
                      transform: `rotate(${s.r}deg)`,
                      boxShadow: "3px 4px 0 var(--sombra)",
                    }}
                  >
                    {s.text}
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- visita --------------------------------- */

function VisitSection() {
  return (
    <section id="visita" className="relative overflow-hidden px-5 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[1%] top-[3%] w-14 rotate-[-10deg] sm:w-24"
      >
        <LeafSprig />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[3%] bottom-[6%] w-24 rotate-[8deg] sm:w-32"
      >
        <OrangeSlice />
      </div>

      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-terracota">
            Visita y pedidos
          </p>
          <h2 className="font-display mt-3 text-5xl sm:text-7xl font-semibold text-espresso">
            Nos vemos en la avenida
          </h2>
        </Reveal>

        <Reveal delay={150} rotate={-2}>
          <div
            className="paper-card mx-auto mt-12 max-w-xl p-8 text-center sm:p-10"
            style={{ "--r": "-0.8deg" } as CSSProperties}
          >
            <p className="font-display text-2xl font-semibold text-espresso">
              Av. los Abrigos, 2
            </p>
            <p className="mt-1 text-espresso/75">
              38618 Los Abrigos, Santa Cruz de Tenerife
            </p>
            <p className="mt-5 font-medium text-espresso">
              Abierto todos los días · hasta las 21:30
            </p>
            <p className="mt-1 text-sm text-espresso/70">
              Para tomar en el local o pedir a domicilio
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={TEL}
                className="paper-card inline-block bg-terracota px-7 py-3.5 font-semibold text-crema"
                style={{ "--r": "-1.5deg" } as CSSProperties}
              >
                922 74 92 19
              </a>
              <a
                href={MAPS}
                target="_blank"
                rel="noopener noreferrer"
                className="paper-card inline-block bg-pistacho px-7 py-3.5 font-semibold text-espresso"
                style={{ "--r": "1.5deg" } as CSSProperties}
              >
                Cómo llegar →
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={220} rotate={0}>
          <ReservationForm />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- footer --------------------------------- */

function Footer() {
  return (
    <footer className="bg-espresso px-5 py-12 text-center text-crema">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo/ladulce-logo.png"
        alt="La Dulce — Los Abrigos"
        className="mx-auto h-16 w-16"
      />
      <p className="mt-4 font-display text-3xl font-semibold">La Dulce</p>
      <p className="mt-2 text-sm opacity-80">
        Café · Brunch · Terraza — Los Abrigos, Tenerife
      </p>
      <p className="mx-auto mt-6 max-w-md text-xs leading-relaxed opacity-60">
        Sitio de demostración — propuesta de diseño no oficial. No afiliado al
        establecimiento.
      </p>
          <p className="mt-2 text-[0.65rem] opacity-60">
            Web de{" "}
            <a
              href="https://mojoweb.es"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-current/50 underline-offset-2 hover:opacity-100"
            >
              MojoWeb
            </a>
          </p>
    </footer>
  );
}

/* ----------------------------------- page ---------------------------------- */

export default function Page() {
  return (
    <main>
      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4 sm:px-8">
        <a href="#" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/ladulce-logo.png"
            alt="La Dulce — Los Abrigos"
            className="h-10 w-10 sm:h-12 sm:w-12"
          />
          <span className="font-display text-xl font-semibold text-espresso">
            La Dulce
          </span>
        </a>
        <div className="flex items-center gap-3">
          <a href="/carta" className="text-sm font-bold text-espresso hover:text-terracota">
            Carta
          </a>
          <a
            href={TEL}
            className="paper-card px-4 py-2 text-sm font-semibold text-espresso"
            style={{ "--r": "0deg" } as CSSProperties}
          >
            922 74 92 19
          </a>
        </div>
      </header>

      <Hero />
      <Marquee />
      <BarraquitoSection />
      <MenuSection />
      <TerraceSection />
      <ReviewsSection />
      <VisitSection />
      <Footer />
    </main>
  );
}
