/**
 * Anatomía de un barraquito — cut-paper diagram.
 * A tall glass built from stacked paper bands, each layer annotated
 * with a dotted leader line and a numbered paper chip.
 */

const CHIP =
  "M0 -13.5 C7.5 -13 13 -7.5 13.5 0.5 C13 8 7 13.5 -0.5 13 C-8 13.5 -13.5 7.5 -13 -0.5 C-13.5 -8 -7.5 -14 0 -13.5 Z";

function Chip({
  x,
  y,
  fill,
  ink,
  n,
}: {
  x: number;
  y: number;
  fill: string;
  ink: string;
  n: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={CHIP} fill={fill} stroke="var(--espresso)" strokeWidth="2" />
      <text
        y="5.5"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fontFamily="var(--font-sans), sans-serif"
        fill={ink}
      >
        {n}
      </text>
    </g>
  );
}

function Label({
  x,
  y,
  side,
  name,
  caption,
}: {
  x: number;
  y: number;
  side: "left" | "right";
  name: string;
  caption: string;
}) {
  const anchor = side === "left" ? "end" : "start";
  return (
    <g fill="var(--espresso)">
      <text
        x={x}
        y={y}
        textAnchor={anchor}
        fontSize="27"
        fontFamily="var(--font-display), serif"
        style={{ fontVariationSettings: "'SOFT' 100, 'opsz' 60" }}
        fontWeight="600"
      >
        {name}
      </text>
      <text
        x={x}
        y={y + 22}
        textAnchor={anchor}
        fontSize="14.5"
        fontFamily="var(--font-sans), sans-serif"
        fill="var(--espresso-soft)"
      >
        {caption}
      </text>
    </g>
  );
}

function Leader({ d }: { d: string }) {
  return (
    <path
      d={d}
      fill="none"
      stroke="var(--espresso-soft)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeDasharray="0.5 8"
    />
  );
}

export default function Barraquito({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 28 764 480"
      className={className}
      role="img"
      aria-label="Diagrama de las capas de un barraquito: leche condensada, Licor 43, café espresso, leche caliente, espuma, canela y corteza de limón"
    >
      <defs>
        <clipPath id="vaso">
          <path d="M284 116 C282 200 281 300 294 444 C297 462 314 470 350 471 C386 470 403 462 406 444 C419 300 418 200 416 116 C372 108 328 108 284 116 Z" />
        </clipPath>
      </defs>

      {/* saucer */}
      <path
        d="M258 470 C256 484 296 492 350 492 C404 492 444 484 442 470 C414 464 286 464 258 470 Z"
        fill="var(--melocoton)"
        className="cut"
      />

      {/* the glass, as stacked paper bands */}
      <g clipPath="url(#vaso)">
        {/* 1 · leche condensada */}
        <rect x="270" y="404" width="180" height="80" fill="var(--crema)" />
        {/* 2 · licor 43 */}
        <path
          d="M270 356 C300 350 340 360 380 354 C398 351 412 356 430 353 L430 416 C400 422 360 412 320 418 C302 421 288 416 270 419 Z"
          fill="var(--ambar)"
        />
        {/* 3 · café espresso */}
        <path
          d="M270 266 C302 260 342 270 382 264 C400 261 414 266 430 263 L430 360 C398 366 358 356 318 362 C300 365 286 360 270 363 Z"
          fill="#4a3323"
        />
        {/* 4 · leche caliente */}
        <path
          d="M270 172 C300 166 340 176 380 170 C398 167 412 172 430 169 L430 270 C400 276 360 266 320 272 C302 275 288 270 270 273 Z"
          fill="#f3ddc0"
        />
        {/* 5 · espuma */}
        <rect x="270" y="100" width="180" height="76" fill="var(--crema)" />
        {/* glass shine */}
        <path
          d="M300 130 C297 230 297 330 306 440 L322 442 C312 330 312 230 316 128 Z"
          fill="#ffffff"
          opacity="0.28"
        />
      </g>

      {/* foam bumps above the rim */}
      <path
        d="M282 120 C286 104 302 100 312 110 C316 96 336 94 344 108 C350 94 370 94 376 108 C384 96 402 98 408 112 C414 104 420 108 418 118 C372 110 328 110 282 120 Z"
        fill="var(--crema)"
        className="cut"
      />

      {/* cinnamon flecks */}
      <g stroke="var(--terracota)" strokeWidth="3.5" strokeLinecap="round">
        <path d="M318 112 L326 110" />
        <path d="M344 104 L352 103" />
        <path d="M372 108 L379 110" />
        <path d="M336 118 L342 117" />
      </g>

      {/* lemon twist hooked on the rim */}
      <path
        d="M412 118 C434 122 446 138 442 156 C439 170 426 176 416 170 C410 165 410 156 416 152"
        fill="none"
        stroke="var(--mantequilla)"
        strokeWidth="9"
        strokeLinecap="round"
        className="cut"
      />

      {/* glass outline */}
      <path
        d="M284 116 C282 200 281 300 294 444 C297 462 314 470 350 471 C386 470 403 462 406 444 C419 300 418 200 416 116 C372 108 328 108 284 116 Z"
        fill="none"
        stroke="var(--espresso)"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />

      {/* ---- annotations · right ---- */}
      <Leader d="M406 140 C428 138 446 136 460 134" />
      <Chip x={482} y={130} fill="var(--crema)" ink="var(--espresso)" n="5" />
      <Label x={504} y={136} side="right" name="Espuma de leche" caption="la corona, siempre generosa" />

      <Leader d="M412 306 C432 304 448 302 460 301" />
      <Chip x={482} y={297} fill="#4a3323" ink="var(--crema)" n="3" />
      <Label x={504} y={303} side="right" name="Café espresso" caption="el corazón del vaso" />

      <Leader d="M406 440 C428 442 446 443 460 443" />
      <Chip x={482} y={439} fill="var(--crema)" ink="var(--espresso)" n="1" />
      <Label x={504} y={445} side="right" name="Leche condensada" caption="la base dulce" />

      {/* ---- annotations · left ---- */}
      <Leader d="M330 96 C300 84 276 78 258 76" />
      <Chip x={236} y={72} fill="var(--pistacho)" ink="var(--espresso)" n="6" />
      <Label x={214} y={78} side="left" name="Canela y limón" caption="el aroma que lo remata" />

      <Leader d="M288 218 C268 216 254 215 240 214" />
      <Chip x={218} y={210} fill="#f3ddc0" ink="var(--espresso)" n="4" />
      <Label x={196} y={216} side="left" name="Leche caliente" caption="suave, sin prisa" />

      <Leader d="M290 386 C270 386 256 385 242 384" />
      <Chip x={220} y={380} fill="var(--ambar)" ink="var(--espresso)" n="2" />
      <Label x={198} y={386} side="left" name="Licor 43" caption="el toque canario" />

      {/* steam */}
      <path
        className="steam-line"
        d="M334 78 C328 66 336 56 330 44"
        fill="none"
        stroke="var(--espresso-soft)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        className="steam-line steam-line-2"
        d="M368 74 C374 62 366 54 372 42"
        fill="none"
        stroke="var(--espresso-soft)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}
