import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Barraquito from "@/components/Barraquito";
import { ReservationForm } from "@/components/ReservationForm";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { SITE, FULL_ADDRESS } from "@/content/site";
import type { HomeCopy } from "@/content/home";
import {
  AvocadoHalf,
  Croissant,
  FriedEgg,
  LeafSprig,
  OrangeSlice,
  SteamCup,
  Strawberry,
  Sun,
} from "@/components/cutouts";

const WA = `https://wa.me/${SITE.whatsapp}`;

function waReserva(locale: "es" | "en") {
  const text =
    locale === "en"
      ? "Hi La Dulce! I'd like to book a table on the terrace."
      : "¡Hola La Dulce! Me gustaría reservar mesa en la terraza.";
  return `${WA}?text=${encodeURIComponent(text)}`;
}

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

function Hero({ copy }: { copy: HomeCopy }) {
  return (
    <section className="relative overflow-hidden px-5 pt-32 pb-28 sm:pb-36">
      <HeroPiece className="hidden sm:block left-[3%] top-[30%] sm:w-24 lg:w-32" r={-9} d={150}>
        <OrangeSlice />
      </HeroPiece>
      <HeroPiece className="hidden sm:block right-[3%] top-[26%] sm:w-28 lg:w-36" r={7} d={300}>
        <Croissant />
      </HeroPiece>
      <HeroPiece className="left-[3%] bottom-[3%] top-auto w-16 sm:left-[6%] sm:top-[58%] sm:bottom-auto sm:w-28 lg:w-32" r={-5} d={450}>
        <SteamCup />
      </HeroPiece>
      <HeroPiece className="right-[4%] bottom-[24%] top-auto w-12 sm:right-[7%] sm:top-[56%] sm:bottom-auto sm:w-20 lg:w-24" r={11} d={600}>
        <Strawberry />
      </HeroPiece>
      <HeroPiece className="hidden sm:block left-[22%] bottom-[4%] w-24 lg:w-28" r={5} d={750}>
        <FriedEgg />
      </HeroPiece>
      <HeroPiece className="right-[14%] bottom-[2%] w-14 sm:right-[18%] sm:bottom-[3%] sm:w-20 lg:w-24" r={-8} d={900}>
        <AvocadoHalf />
      </HeroPiece>
      <HeroPiece className="hidden lg:block left-[13%] top-[20%] w-12 lg:w-14" r={14} d={1050}>
        <LeafSprig />
      </HeroPiece>
      <HeroPiece className="hidden lg:block right-[13%] top-[17%] w-14 lg:w-16" r={-4} d={1150}>
        <Sun />
      </HeroPiece>

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="ink text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-espresso/70" style={{ "--d": "80ms" } as CSSProperties}>
          {copy.hero.kicker}
        </p>
        <h1 className="ink font-display mt-4 text-[4.4rem] leading-[0.95] sm:text-8xl lg:text-[9.5rem] font-semibold text-espresso" style={{ "--d": "200ms" } as CSSProperties}>
          La&nbsp;Dulce
        </h1>
        <p className="ink mx-auto mt-6 max-w-md text-base sm:text-lg text-espresso/80" style={{ "--d": "380ms" } as CSSProperties}>
          {copy.hero.tagline}
        </p>
        <div className="ink mt-9 flex flex-wrap items-center justify-center gap-4" style={{ "--d": "520ms" } as CSSProperties}>
          <Link
            href={copy.cartaHref}
            prefetch
            className="paper-card inline-block bg-azul px-8 py-4 text-lg font-semibold text-crema"
            style={{ "--r": "-1.5deg" } as CSSProperties}
          >
            {copy.hero.ctaMenu}
          </Link>
          <a
            href="#reservar"
            className="paper-card inline-block px-7 py-3.5 font-semibold text-espresso"
            style={{ "--r": "1.5deg" } as CSSProperties}
          >
            {copy.hero.ctaReserve}
          </a>
        </div>
        <p className="ink mt-6" style={{ "--d": "640ms" } as CSSProperties}>
          <a href="#barraquito" className="text-sm font-semibold text-espresso/60 underline decoration-espresso/20 underline-offset-4 hover:text-terracota">
            {copy.hero.barraquito}
          </a>
        </p>
      </div>
    </section>
  );
}

/* --------------------------------- marquee --------------------------------- */

const MARQUEE_COLORS = ["var(--rosa)", "var(--turquesa)", "var(--crema)", "var(--turquesa)"];

function MarqueeRun({ words }: { words: string[] }) {
  return (
    <>
      {words.map((w, i) => (
        <span
          key={w}
          className="font-display mx-5 flex items-center gap-10 whitespace-nowrap text-2xl sm:text-3xl font-semibold"
          style={{ color: MARQUEE_COLORS[i % MARQUEE_COLORS.length] }}
        >
          {w}
          <span aria-hidden="true" className="text-lg opacity-70">✳</span>
        </span>
      ))}
    </>
  );
}

function Marquee({ words }: { words: string[] }) {
  return (
    <div className="relative overflow-hidden bg-espresso py-4 -rotate-1 scale-[1.02]" aria-hidden="true">
      <div className="marquee-track">
        <div className="flex"><MarqueeRun words={words} /></div>
        <div className="flex"><MarqueeRun words={words} /></div>
      </div>
    </div>
  );
}

/* ------------------------------- destacados -------------------------------- */

function Destacados({ copy }: { copy: HomeCopy }) {
  const d = copy.destacados;
  return (
    <section id="destacados" className="relative px-5 py-24 sm:py-32 bg-[var(--sec-a)]">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em]" style={{ color: "var(--azul-deep)" }}>
            {d.kicker}
          </p>
          <h2 className="font-display mt-3 text-5xl sm:text-7xl font-semibold text-espresso">{d.title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-espresso/80">{d.intro}</p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {d.items.map((item, i) => (
            <Reveal as="li" key={item.name} delay={(i % 3) * 120} rotate={i % 2 === 0 ? -3 : 3}>
              <div className="paper-card flex h-full items-center gap-4 p-4 sm:gap-5 sm:p-5" style={{ "--r": `${i % 2 === 0 ? -1.2 : 1.4}deg` } as CSSProperties}>
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl sm:h-24 sm:w-24">
                  <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="font-display text-2xl font-semibold text-espresso">{item.name}</h3>
                    <span className="whitespace-nowrap text-sm font-semibold text-terracota">{item.price}</span>
                  </div>
                  <p className="mt-1 text-sm text-espresso/75">{item.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 text-center sm:mt-16" delay={120}>
          <Link href={copy.cartaHref} prefetch className="paper-card inline-block bg-azul px-8 py-4 text-base font-semibold text-crema" style={{ "--r": "-1deg" } as CSSProperties}>
            {d.cta}
          </Link>
          <p className="mt-3 text-sm text-espresso/60">{d.ctaNote}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- barraquito ------------------------------- */

function BarraquitoSection({ copy }: { copy: HomeCopy }) {
  const b = copy.barraquito;
  return (
    <section id="barraquito" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-terracota">{b.kicker}</p>
          <h2 className="font-display mt-3 text-5xl sm:text-7xl font-semibold text-espresso">{b.title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-espresso/80">{b.body}</p>
        </Reveal>
        <Reveal className="mt-10 sm:mt-14" delay={150} rotate={1.5}>
          <Barraquito className="mx-auto w-full max-w-3xl" />
        </Reveal>
        <Reveal className="mt-8 text-center" delay={250}>
          <p className="font-display text-lg text-espresso/70">{b.caption}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- terraza --------------------------------- */

function Awning() {
  const stripes = Array.from({ length: 12 }, (_, i) => i);
  return (
    <svg viewBox="0 0 720 92" className="cut w-full" preserveAspectRatio="none" aria-hidden="true">
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

function TerraceSection({ copy }: { copy: HomeCopy }) {
  const t = copy.terraza;
  return (
    <section id="terraza" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="mx-auto max-w-3xl"><Awning /></div>
        </Reveal>
        <div className="mt-12 grid items-center gap-10 sm:mt-16 sm:grid-cols-2">
          <Reveal rotate={-2}>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-terracota">{t.kicker}</p>
            <h2 className="font-display mt-3 text-5xl sm:text-6xl font-semibold text-espresso">{t.title}</h2>
            <p className="mt-5 text-espresso/80">{t.body1}</p>
            <p className="mt-4 text-espresso/80">{t.body2}</p>
          </Reveal>
          <Reveal delay={150} rotate={2.5}>
            <div className="paper-card overflow-hidden p-0" style={{ "--r": "1.2deg" } as CSSProperties}>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/photos/terrace.jpg"
                  alt="La terraza de La Dulce en la avenida de Los Abrigos"
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- info ---------------------------------- */

function FeatureIcon({ name }: { name: string }) {
  const common = { className: "h-6 w-6", fill: "none", stroke: "var(--terracota)", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "awning":
      return <svg viewBox="0 0 24 24" {...common}><path d="M3 10h18l-1-4H4l-1 4Z" /><path d="M4 10v9h16v-9" /><path d="M9 10v4M15 10v4" /></svg>;
    case "stroller":
      return <svg viewBox="0 0 24 24" {...common}><path d="M4 5h3l3 7h9" /><path d="M19 12a7 7 0 0 0-9-7v7" /><circle cx="8" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></svg>;
    case "bag":
      return <svg viewBox="0 0 24 24" {...common}><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></svg>;
    case "card":
      return <svg viewBox="0 0 24 24" {...common}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18" /></svg>;
    default:
      return null;
  }
}

function InfoSection({ copy }: { copy: HomeCopy }) {
  const info = copy.info;
  return (
    <section id="info" className="px-5 py-24 sm:py-32 bg-crema">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-terracota">{info.kicker}</p>
          <h2 className="font-display mt-3 text-5xl sm:text-6xl font-semibold text-espresso">{info.title}</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Reveal rotate={-1.5}>
            <div className="paper-card h-full p-7" style={{ "--r": "-0.8deg" } as CSSProperties}>
              <p className="text-xs font-semibold uppercase tracking-wide text-espresso/50">{info.hoursLabel}</p>
              <p className="mt-1 font-display text-2xl font-semibold text-espresso">{info.hoursValue}</p>
              <p className="mt-0.5 text-sm font-semibold text-terracota">{info.hoursNote}</p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-espresso/50">{info.addressLabel}</p>
              <p className="mt-1 text-espresso">{FULL_ADDRESS}</p>
              <a href={SITE.maps} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-semibold text-terracota hover:underline">
                {info.directions}
              </a>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-espresso/50">{info.reservarLabel}</p>
              <a
                href={waReserva(copy.locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 font-display text-2xl font-semibold text-espresso hover:text-terracota"
              >
                <WhatsAppIcon className="h-6 w-6 text-[#25D366]" />
                {SITE.whatsappDisplay}
              </a>
              <span className="mt-0.5 block text-xs text-espresso/50">{info.reservarHint}</span>
            </div>
          </Reveal>
          <Reveal delay={120} rotate={1.5}>
            <ul className="paper-card grid h-full grid-cols-1 gap-4 p-7 sm:grid-cols-2" style={{ "--r": "0.8deg" } as CSSProperties}>
              {info.features.map((f) => (
                <li key={f.label} className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-crema">
                    <FeatureIcon name={f.icon} />
                  </span>
                  <span className="text-sm font-semibold text-espresso">{f.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- reseñas --------------------------------- */

function Medallion({ ratingAria, caption }: { ratingAria: string; caption: string }) {
  const lobes = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    return { cx: 110 + Math.cos(a) * 90, cy: 110 + Math.sin(a) * 90 };
  });
  const STAR = "M0 -9 L2.6 -2.8 L9 -2.4 L4 1.8 L5.6 8.4 L0 4.8 L-5.6 8.4 L-4 1.8 L-9 -2.4 L-2.6 -2.8 Z";
  const ratingText = SITE.rating.value.toLocaleString("es-ES");
  return (
    <svg viewBox="0 0 220 220" className="cut-deep mx-auto w-64 sm:w-72" role="img" aria-label={ratingAria}>
      <g fill="var(--turquesa)">
        {lobes.map((l, i) => (<circle key={i} cx={l.cx} cy={l.cy} r="15" />))}
        <circle cx="110" cy="110" r="96" />
      </g>
      <path d="M110 34 C153 32 187 66 188 109 C189 152 154 187 111 186 C68 187 33 153 32 110 C31 67 67 36 110 34 Z" fill="var(--crema)" />
      <text x="110" y="102" textAnchor="middle" fontSize="58" fontWeight="600" fontFamily="var(--font-display), serif" fill="var(--espresso)">
        {ratingText}
      </text>
      <g transform="translate(110 128)">
        {[-2, -1, 0, 1, 2].map((i) => (
          <path key={i} d={STAR} transform={`translate(${i * 22} 0) rotate(${i * 4})`} fill="var(--terracota)" opacity={i === 2 ? 0.35 : 1} />
        ))}
      </g>
      <text x="110" y="162" textAnchor="middle" fontSize="14" fontWeight="600" fontFamily="var(--font-sans), sans-serif" fill="var(--espresso-soft)">
        {SITE.rating.count} reseñas
      </text>
      <text x="110" y="180" textAnchor="middle" fontSize="12" fontFamily="var(--font-sans), sans-serif" fill="var(--espresso-soft)">
        {caption}
      </text>
    </svg>
  );
}

const STRIP_BG = ["var(--rosa)", "var(--turquesa)", "var(--rosa-soft)", "var(--crema)"];
const STRIP_ROT = [-2, 1.5, -1, 2, -1.5];

function ReviewsSection({ copy }: { copy: HomeCopy }) {
  const r = copy.reviews;
  return (
    <section id="resenas" className="px-5 py-24 sm:py-32 bg-[var(--sec-b)]">
      <div className="mx-auto max-w-4xl">
        <div className="grid items-center gap-12 sm:grid-cols-2">
          <Reveal rotate={3}>
            <div className="-rotate-3">
              <Medallion ratingAria={r.ratingAria} caption={r.ratingCaption} />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-terracota">{r.kicker}</p>
              <h2 className="font-display mt-3 text-5xl font-semibold text-espresso">{r.title}</h2>
              <p className="mt-4 text-sm text-espresso/70">{r.intro}</p>
            </Reveal>
            <ul className="mt-8 space-y-4">
              {r.strips.map((s, i) => (
                <Reveal as="li" key={s.text} delay={i * 110} rotate={STRIP_ROT[i % STRIP_ROT.length] * 2}>
                  <div
                    className="torn inline-block px-5 py-3 font-medium text-espresso"
                    style={{ background: STRIP_BG[s.tone % STRIP_BG.length], transform: `rotate(${STRIP_ROT[i % STRIP_ROT.length]}deg)`, boxShadow: "3px 4px 0 var(--sombra)" }}
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

/* ---------------------------------- galería -------------------------------- */

function GallerySection({ copy }: { copy: HomeCopy }) {
  const g = copy.gallery;
  return (
    <section id="galeria" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-terracota">{g.kicker}</p>
          <h2 className="font-display mt-3 text-5xl sm:text-6xl font-semibold text-espresso">{g.title}</h2>
        </Reveal>
        <Reveal className="mt-12" delay={120}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {g.images.map((img, i) => (
              <div
                key={img.src}
                className="relative aspect-square overflow-hidden rounded-2xl shadow-[2px_3px_0_var(--sombra)]"
                style={{ transform: `rotate(${i % 2 ? 0.8 : -0.8}deg)` }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- reservar -------------------------------- */

function ReservarSection({ copy }: { copy: HomeCopy }) {
  const r = copy.reservar;
  return (
    <section id="reservar" className="relative overflow-hidden px-5 py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute left-[1%] top-[3%] w-14 rotate-[-10deg] sm:w-24"><LeafSprig /></div>
      <div aria-hidden="true" className="pointer-events-none absolute right-[3%] bottom-[6%] w-24 rotate-[8deg] sm:w-32"><OrangeSlice /></div>

      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-terracota">{r.kicker}</p>
          <h2 className="font-display mt-3 text-5xl sm:text-7xl font-semibold text-espresso">{r.title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-espresso/80">{r.body}</p>
        </Reveal>

        <Reveal delay={150} rotate={-2}>
          <div className="paper-card mx-auto mt-10 max-w-xl p-8 text-center sm:p-10" style={{ "--r": "-0.8deg" } as CSSProperties}>
            <p className="font-display text-2xl font-semibold text-espresso">{SITE.street}</p>
            <p className="mt-1 text-espresso/75">{`${SITE.postalCode} ${SITE.city}, ${SITE.region}`}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a href={waReserva(copy.locale)} target="_blank" rel="noopener noreferrer" className="paper-card inline-flex items-center gap-2 bg-azul px-7 py-3.5 font-semibold text-crema" style={{ "--r": "-1.5deg" } as CSSProperties}>
                <WhatsAppIcon className="h-5 w-5" />
                {SITE.whatsappDisplay}
              </a>
              <a href={SITE.maps} target="_blank" rel="noopener noreferrer" className="paper-card inline-block bg-turquesa px-7 py-3.5 font-semibold text-espresso" style={{ "--r": "1.5deg" } as CSSProperties}>
                {copy.info.directions}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <ReservationForm locale={copy.locale} />
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------- faq ----------------------------------- */

function FaqSection({ copy }: { copy: HomeCopy }) {
  const f = copy.faq;
  return (
    <section id="faq" className="px-5 py-24 sm:py-32 bg-crema">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-terracota">{f.kicker}</p>
          <h2 className="font-display mt-3 text-5xl sm:text-6xl font-semibold text-espresso">{f.title}</h2>
        </Reveal>
        <Reveal className="mt-10" delay={120}>
          <ul className="space-y-3">
            {f.items.map((item) => (
              <li key={item.q}>
                <details className="group paper-card p-0" style={{ "--r": "0deg" } as CSSProperties}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-display text-lg font-semibold text-espresso">
                    {item.q}
                    <span aria-hidden="true" className="shrink-0 text-terracota transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="px-6 pb-5 text-espresso/75">{item.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- footer --------------------------------- */

function Footer({ copy }: { copy: HomeCopy }) {
  const base = copy.locale === "en" ? "/en" : "";
  return (
    <footer className="bg-espresso px-5 py-12 text-center text-crema">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo/ladulce-badge.jpg" alt="La Dulce — Los Abrigos" className="mx-auto h-20 w-20 rounded-full object-cover" />
      <p className="mt-4 font-display text-3xl font-semibold">La Dulce</p>
      <p className="mt-2 text-sm opacity-80">{copy.footer.tagline}</p>

      <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
        <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100">Instagram</a>
        <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100">Facebook</a>
        <Link href={`${base}/aviso-legal`} className="opacity-80 hover:opacity-100">{copy.footer.legal.avisoLegal}</Link>
        <Link href={`${base}/privacidad`} className="opacity-80 hover:opacity-100">{copy.footer.legal.privacidad}</Link>
        <Link href={`${base}/cookies`} className="opacity-80 hover:opacity-100">{copy.footer.legal.cookies}</Link>
      </nav>

      <p className="mt-6 text-xs opacity-60">© {SITE.name}. {copy.footer.rights}</p>
      <p className="mt-1 text-[0.65rem] opacity-60">
        {copy.footer.webBy}{" "}
        <a href="https://mojoweb.es" target="_blank" rel="noopener noreferrer" className="underline decoration-current/50 underline-offset-2 hover:opacity-100">
          MojoWeb
        </a>
      </p>
    </footer>
  );
}

/* ----------------------------------- page ---------------------------------- */

export default function HomeView({ copy }: { copy: HomeCopy }) {
  return (
    <main>
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-4 sm:px-8">
        <a href={copy.locale === "en" ? "/en" : "/"} className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/ladulce-badge.jpg" alt="La Dulce — Los Abrigos" className="h-10 w-10 rounded-full object-cover ring-1 ring-espresso/10 sm:h-12 sm:w-12" />
          <span className="font-display text-lg font-semibold text-espresso sm:text-xl">La Dulce</span>
        </a>
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="inline-flex items-center rounded-full border border-espresso/15 bg-crema/85 p-0.5 text-xs font-bold backdrop-blur">
            <a
              href="/"
              aria-label="Cambiar a español"
              className={`rounded-full px-3 py-1 transition-colors ${copy.locale === "es" ? "bg-terracota text-crema" : "text-espresso/55 hover:text-espresso"}`}
            >
              ES
            </a>
            <a
              href="/en"
              aria-label="Switch to English"
              className={`rounded-full px-3 py-1 transition-colors ${copy.locale === "en" ? "bg-terracota text-crema" : "text-espresso/55 hover:text-espresso"}`}
            >
              EN
            </a>
          </div>
          <a
            href="#reservar"
            className="inline-flex items-center gap-2 rounded-full bg-azul px-4 py-2 text-sm font-semibold text-crema shadow-[2px_3px_0_var(--sombra)] transition-transform hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {copy.nav.reservar}
          </a>
        </div>
      </header>

      <Hero copy={copy} />
      <Marquee words={copy.marquee} />
      <Destacados copy={copy} />
      <BarraquitoSection copy={copy} />
      <TerraceSection copy={copy} />
      <InfoSection copy={copy} />
      <ReviewsSection copy={copy} />
      <GallerySection copy={copy} />
      <ReservarSection copy={copy} />
      <FaqSection copy={copy} />
      <Footer copy={copy} />
    </main>
  );
}
