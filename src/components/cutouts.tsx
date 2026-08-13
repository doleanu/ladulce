/**
 * Recortes — hand-cut paper shapes.
 * Every path is deliberately wobbly (no perfect circles), with a hard
 * drop-shadow applied via the .cut class to read as layered paper.
 */

type P = { className?: string };

export function OrangeSlice({ className = "" }: P) {
  return (
    <svg viewBox="0 0 110 62" className={`cut ${className}`} aria-hidden="true">
      <path
        d="M6 53 C3 27 25 5 54 4 C82 3 106 25 105 51 C72 57 38 58 6 53 Z"
        fill="var(--terracota)"
      />
      <path
        d="M14 49 C13 30 30 12 54 11 C77 10 96 29 96 47 C68 52 41 53 14 49 Z"
        fill="var(--melocoton)"
      />
      <g fill="var(--crema)">
        <path d="M53 46 L24 43 C25 34 29 27 36 21 Z" />
        <path d="M56 44 L44 17 C51 14 58 14 65 17 Z" />
        <path d="M58 46 L73 21 C80 26 84 34 85 42 Z" />
      </g>
    </svg>
  );
}

export function Croissant({ className = "" }: P) {
  return (
    <svg viewBox="0 0 130 76" className={`cut ${className}`} aria-hidden="true">
      {/* body: fat crescent with tapered horn tips */}
      <path
        d="M10 64 C2 52 6 40 18 34 C24 31 30 32 34 35 C36 22 48 12 65 11 C82 10 95 19 98 32 C102 29 108 28 114 31 C126 37 129 50 120 61 C114 68 105 68 100 63 C94 71 81 76 66 76 C51 76 38 71 32 63 C26 69 16 70 10 64 Z"
        fill="var(--mantequilla)"
      />
      <path
        d="M40 37 C45 46 48 55 48 65"
        stroke="var(--terracota)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M90 35 C86 45 84 55 84 64"
        stroke="var(--terracota)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function SteamCup({ className = "" }: P) {
  return (
    <svg viewBox="0 0 110 122" className={`cut ${className}`} aria-hidden="true">
      <path
        className="steam-line"
        d="M40 26 C34 20 40 13 36 6"
        stroke="var(--espresso-soft)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        className="steam-line steam-line-2"
        d="M60 24 C66 17 59 12 64 4"
        stroke="var(--espresso-soft)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M78 52 C92 50 100 58 97 68 C94 77 86 81 77 79"
        stroke="var(--terracota)"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M17 40 C15 68 22 96 50 98 C78 97 85 68 82 40 C61 34 38 35 17 40 Z"
        fill="var(--melocoton)"
      />
      <path
        d="M17 40 C39 46 61 46 82 40 C82 45 81 50 81 54 C60 60 39 60 18 54 C18 49 17 44 17 40 Z"
        fill="var(--crema)"
      />
      <path
        d="M22 108 C40 103 60 103 78 108 C60 114 40 114 22 108 Z"
        fill="var(--pistacho)"
      />
    </svg>
  );
}

export function FriedEgg({ className = "" }: P) {
  return (
    <svg viewBox="0 0 116 94" className={`cut ${className}`} aria-hidden="true">
      <path
        d="M15 46 C9 21 40 4 66 9 C92 13 111 32 106 55 C101 78 72 90 46 84 C22 79 20 63 15 46 Z"
        fill="var(--crema)"
      />
      <path
        d="M42 44 C41 33 51 26 61 28 C71 30 77 38 74 48 C71 57 60 61 51 57 C45 54 43 49 42 44 Z"
        fill="var(--mantequilla)"
      />
      <path
        d="M50 37 C53 34 58 34 60 36"
        stroke="var(--crema)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function AvocadoHalf({ className = "" }: P) {
  return (
    <svg viewBox="0 0 88 112" className={`cut ${className}`} aria-hidden="true">
      <path
        d="M44 4 C57 4 63 16 68 32 C74 51 84 62 82 80 C80 99 64 109 44 108 C24 109 8 99 6 80 C4 62 14 51 20 32 C25 16 31 4 44 4 Z"
        fill="var(--pistacho-deep)"
      />
      <path
        d="M44 13 C53 13 58 23 62 36 C67 52 75 62 73 77 C72 93 59 101 44 100 C29 101 16 93 15 77 C13 62 21 52 26 36 C30 23 35 13 44 13 Z"
        fill="var(--pistacho)"
      />
      <path
        d="M31 72 C30 62 37 55 45 56 C54 57 59 65 57 74 C55 82 46 86 39 82 C34 79 32 76 31 72 Z"
        fill="var(--terracota)"
      />
    </svg>
  );
}

export function LeafSprig({ className = "" }: P) {
  return (
    <svg viewBox="0 0 74 112" className={`cut ${className}`} aria-hidden="true">
      <path
        d="M38 106 C34 78 34 44 42 8"
        stroke="var(--pistacho-deep)"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      <g fill="var(--pistacho)">
        <path d="M40 16 C50 8 62 8 68 14 C64 25 52 30 42 27 C40 24 39 20 40 16 Z" />
        <path d="M36 40 C25 33 13 35 8 42 C13 52 25 55 35 51 C36 47 37 44 36 40 Z" />
        <path d="M36 62 C46 55 58 56 63 63 C58 73 46 76 37 71 C36 68 35 65 36 62 Z" />
        <path d="M35 84 C25 78 14 80 10 87 C15 96 26 98 35 93 C36 90 36 87 35 84 Z" />
      </g>
    </svg>
  );
}

export function Strawberry({ className = "" }: P) {
  return (
    <svg viewBox="0 0 84 96" className={`cut ${className}`} aria-hidden="true">
      <g fill="var(--pistacho)">
        <path d="M42 20 C36 12 27 9 19 12 C22 20 30 25 39 24 Z" />
        <path d="M44 20 C50 11 59 8 67 12 C63 20 54 25 46 24 Z" />
      </g>
      <path
        d="M42 90 C24 80 8 61 10 41 C12 26 26 18 42 25 C58 18 72 26 74 41 C76 61 60 80 42 90 Z"
        fill="var(--terracota)"
      />
      <g stroke="var(--mantequilla)" strokeWidth="3.5" strokeLinecap="round">
        <path d="M30 42 L30 46" />
        <path d="M46 38 L46 42" />
        <path d="M58 48 L58 52" />
        <path d="M36 60 L36 64" />
        <path d="M50 66 L50 70" />
      </g>
    </svg>
  );
}

export function Pancakes({ className = "" }: P) {
  return (
    <svg viewBox="0 0 118 104" className={`cut ${className}`} aria-hidden="true">
      <path
        d="M20 74 C18 84 36 91 59 91 C82 91 100 84 98 74 C97 66 80 61 59 61 C38 61 21 66 20 74 Z"
        fill="var(--ambar)"
      />
      <path
        d="M18 56 C16 66 35 73 59 73 C83 73 102 66 100 56 C99 48 81 43 59 43 C37 43 19 48 18 56 Z"
        fill="var(--mantequilla)"
      />
      <path
        d="M21 39 C19 49 37 56 59 56 C81 56 99 49 97 39 C96 31 79 26 59 26 C39 26 22 31 21 39 Z"
        fill="var(--ambar)"
      />
      <path
        d="M32 32 C33 39 41 43 52 44 C50 50 53 55 60 56 C66 55 68 50 66 45 C77 44 85 40 86 33 C77 28 68 26 59 26 C49 26 40 28 32 32 Z"
        fill="var(--terracota)"
      />
      <path
        d="M50 22 C50 17 55 14 60 15 C65 16 68 20 66 24 C61 27 54 26 50 22 Z"
        fill="var(--crema)"
      />
      <path
        d="M12 98 C40 92 78 92 106 98"
        stroke="var(--espresso-soft)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Benedict({ className = "" }: P) {
  return (
    <svg viewBox="0 0 110 96" className={`cut ${className}`} aria-hidden="true">
      <path
        d="M18 70 C16 80 33 87 55 87 C77 87 94 80 92 70 C91 62 75 57 55 57 C35 57 19 62 18 70 Z"
        fill="var(--ambar)"
      />
      <path
        d="M24 56 C21 42 34 30 54 29 C74 28 89 40 86 54 C84 65 70 71 54 70 C39 70 26 66 24 56 Z"
        fill="var(--crema)"
      />
      <path
        d="M36 42 C36 35 44 30 54 30 C64 31 71 37 70 44 C74 48 71 54 65 53 C63 58 55 60 50 56 C43 59 36 55 38 49 C34 48 34 45 36 42 Z"
        fill="var(--mantequilla)"
      />
      <g fill="var(--pistacho-deep)">
        <path d="M44 44 L49 42 L47 47 Z" />
        <path d="M58 40 L63 39 L61 44 Z" />
      </g>
    </svg>
  );
}

export function AvoToast({ className = "" }: P) {
  return (
    <svg viewBox="0 0 118 92" className={`cut ${className}`} aria-hidden="true">
      <path
        d="M14 34 C12 20 26 10 44 12 L96 24 C108 27 112 38 106 48 L92 76 C88 84 78 86 70 82 L24 60 C15 55 14 45 14 34 Z"
        fill="var(--ambar)"
      />
      <path
        d="M22 34 C21 25 30 18 42 20 L90 31 C98 33 101 40 97 47 L86 69 C83 75 76 76 70 73 L29 53 C23 50 22 42 22 34 Z"
        fill="var(--pistacho)"
      />
      <g fill="var(--crema)">
        <path d="M40 34 C43 31 47 32 48 35 C48 39 44 41 41 39 C39 38 39 36 40 34 Z" />
        <path d="M62 42 C65 39 69 40 70 44 C70 47 66 49 63 47 C61 46 61 44 62 42 Z" />
        <path d="M52 55 C55 52 59 53 60 56 C60 60 56 62 53 60 C51 59 51 57 52 55 Z" />
      </g>
    </svg>
  );
}

export function SmashBurger({ className = "" }: P) {
  return (
    <svg viewBox="0 0 112 100" className={`cut ${className}`} aria-hidden="true">
      <path
        d="M14 44 C12 22 32 8 56 8 C80 8 100 23 98 44 C70 49 42 49 14 44 Z"
        fill="var(--melocoton-deep)"
      />
      <g fill="var(--crema)">
        <path d="M36 24 C39 22 42 23 42 26 C41 29 37 29 36 27 Z" />
        <path d="M56 18 C59 16 62 17 62 20 C61 23 57 23 56 21 Z" />
        <path d="M74 26 C77 24 80 25 80 28 C79 31 75 31 74 29 Z" />
      </g>
      <path
        d="M12 46 L100 46 L92 58 L82 47 L72 59 L62 47 L52 59 L42 47 L32 58 L22 47 L12 46 Z"
        fill="var(--mantequilla)"
      />
      <path
        d="M14 60 C13 53 26 50 56 50 C86 50 99 53 98 60 C99 68 86 71 56 71 C26 71 13 68 14 60 Z"
        fill="var(--espresso-soft)"
      />
      <path
        d="M10 74 C24 66 42 71 56 68 C70 71 88 66 102 74 C90 79 68 77 56 79 C44 77 22 79 10 74 Z"
        fill="var(--pistacho)"
      />
      <path
        d="M16 82 C15 92 32 96 56 96 C80 96 97 92 96 82 C70 78 42 78 16 82 Z"
        fill="var(--melocoton-deep)"
      />
    </svg>
  );
}

export function Smoothie({ className = "" }: P) {
  return (
    <svg viewBox="0 0 78 116" className={`cut ${className}`} aria-hidden="true">
      <path
        d="M52 22 L66 4 L74 9 L60 27 Z"
        fill="var(--terracota)"
      />
      <path
        d="M16 28 C14 56 15 84 22 106 C24 112 32 114 39 114 C46 114 54 112 56 106 C63 84 64 56 62 28 C46 24 31 24 16 28 Z"
        fill="var(--crema)"
      />
      <path
        d="M19 42 C33 46 46 46 59 42 C60 64 58 86 53 104 C51 109 45 110 39 110 C33 110 27 109 25 104 C20 86 18 64 19 42 Z"
        fill="var(--melocoton)"
      />
      <path
        d="M23 54 C33 57 45 57 55 54"
        stroke="var(--crema)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M8 30 C8 24 14 20 20 22 C25 24 27 30 24 34 C19 38 11 36 8 30 Z"
        fill="var(--terracota)"
      />
    </svg>
  );
}

export function Cheesecake({ className = "" }: P) {
  return (
    <svg viewBox="0 0 112 96" className={`cut ${className}`} aria-hidden="true">
      <path
        d="M12 78 C13 84 18 87 25 87 L88 87 C95 87 100 83 100 77 L99 68 L14 66 Z"
        fill="var(--ambar)"
      />
      <path
        d="M14 66 L99 68 L58 14 C55 10 51 10 48 14 Z"
        fill="var(--crema)"
      />
      <path
        d="M46 40 C52 43 60 43 67 41 L78 55 C64 59 48 58 36 53 Z"
        fill="var(--melocoton)"
        opacity="0.55"
      />
      <path
        d="M53 16 C48 10 51 3 58 3 C64 3 68 9 64 15 C61 19 56 19 53 16 Z"
        fill="var(--terracota)"
      />
      <path d="M56 3 C55 0 58 -1 60 1 Z" fill="var(--pistacho-deep)" />
    </svg>
  );
}

export function Croquetas({ className = "" }: P) {
  return (
    <svg viewBox="0 0 118 74" className={`cut ${className}`} aria-hidden="true">
      <path
        d="M10 34 C8 24 18 16 34 16 C50 15 62 22 63 32 C64 42 53 49 38 50 C22 51 12 44 10 34 Z"
        fill="var(--ambar)"
      />
      <path
        d="M54 46 C52 36 63 28 79 28 C95 27 107 34 108 44 C109 54 98 61 83 62 C67 63 56 56 54 46 Z"
        fill="var(--mantequilla)"
      />
      <path
        d="M32 54 C30 46 39 39 52 39 C65 38 75 44 76 52 C77 61 68 67 55 68 C42 68 34 62 32 54 Z"
        fill="var(--ambar)"
      />
      <g stroke="var(--terracota)" strokeWidth="3" strokeLinecap="round">
        <path d="M28 30 L32 32" />
        <path d="M44 26 L48 28" />
        <path d="M80 40 L84 42" />
        <path d="M94 48 L98 50" />
        <path d="M50 54 L54 56" />
      </g>
    </svg>
  );
}

export function Sun({ className = "" }: P) {
  return (
    <svg viewBox="0 0 122 122" className={`cut ${className}`} aria-hidden="true">
      <g fill="var(--terracota)">
        <path d="M61 2 L69 20 L53 21 Z" />
        <path d="M104 16 L102 36 L88 27 Z" />
        <path d="M120 60 L102 69 L102 52 Z" />
        <path d="M105 105 L86 96 L98 84 Z" />
        <path d="M60 120 L52 102 L69 101 Z" />
        <path d="M17 104 L20 85 L34 95 Z" />
        <path d="M2 59 L20 52 L20 69 Z" />
        <path d="M18 17 L36 25 L24 36 Z" />
      </g>
      <path
        d="M31 57 C33 40 47 28 63 30 C79 32 92 45 90 62 C88 79 73 92 57 90 C41 88 29 74 31 57 Z"
        fill="var(--mantequilla)"
      />
    </svg>
  );
}
