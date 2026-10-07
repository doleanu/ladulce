# La Dulce: website

**Live:** https://ladulcelosabrigos.es

Website for La Dulce, a café and brunch spot in Los Abrigos, Tenerife, with its own illustrated visual identity.

## What it does

- **4 languages:** Spanish (default), English, French and German.
- **Digital menu** (`/carta`) in every language, with Menu structured data generated from the same menu data.
- **Bookings by WhatsApp:** the form builds a pre-filled WhatsApp message.
- **Chat widget:** rule-based (regex intent matching, no external API) for hours, menu and bookings.
- **Admin panel** (`/admin`) where the owner edits menu prices without touching code:
  - one language-agnostic price model, so a single edit updates the menu in all four languages;
  - prices are stored in a private Vercel Blob. The JSON in the repo is the fallback, so a failed read never takes the menu down;
  - single account with credentials only in environment variables, a scrypt-hashed password and an HMAC-signed session cookie (12 h).
- Legal pages (aviso legal, privacidad, cookies) in Spanish and English.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · Vercel Blob · Vercel

## Run locally

```bash
npm install
npm run dev
```

Environment variables for the admin panel: `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `ADMIN_PASSWORD_SALT`, `ADMIN_SESSION_SECRET`, plus `BLOB_READ_WRITE_TOKEN` for Vercel Blob. `scripts/` holds the one-off helpers that built the price model and seeded the Blob store.

Pushes to `main` deploy to production on Vercel.

---

Built and maintained by Bogdan & Petruța at [WebHosteleros](https://www.webhosteleros.es). The code is shared as a portfolio sample. The brand, illustrations, photos and texts belong to La Dulce.
