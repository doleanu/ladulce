import { createHash, createHmac, scryptSync, timingSafeEqual } from "node:crypto";

// Single hard-coded admin account (Manu). No user table, no database — the
// credentials live only as Vercel/`.env.local` environment variables, never
// in source control. Session is a short signed cookie value, not a DB row.

const SESSION_COOKIE = "ladulce_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12h

function envOrThrow(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var ${name}`);
  return v;
}

export function verifyCredentials(email: string, password: string): boolean {
  const expectedEmail = envOrThrow("ADMIN_EMAIL");
  if (email.trim().toLowerCase() !== expectedEmail.trim().toLowerCase()) return false;

  const salt = envOrThrow("ADMIN_PASSWORD_SALT");
  const expectedHash = envOrThrow("ADMIN_PASSWORD_HASH");
  const gotHash = scryptSync(password, salt, 64).toString("hex");

  const a = Buffer.from(gotHash, "hex");
  const b = Buffer.from(expectedHash, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

function sign(value: string): string {
  const secret = envOrThrow("ADMIN_SESSION_SECRET");
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function createSessionValue(): { value: string; maxAge: number } {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = `${expires}`;
  const sig = sign(payload);
  return { value: `${payload}.${sig}`, maxAge: Math.floor(SESSION_TTL_MS / 1000) };
}

export function isValidSession(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;
  const [payload, sig] = cookieValue.split(".");
  if (!payload || !sig) return false;
  const expected = sign(payload);
  const a = Buffer.from(sig, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  const expires = Number(payload);
  return Number.isFinite(expires) && Date.now() < expires;
}

export const ADMIN_SESSION_COOKIE = SESSION_COOKIE;

// Used only to fingerprint the current credentials in logs/debug, never to
// expose them — e.g. so we can tell "wrong password" from "env var missing"
// without ever printing the secret itself.
export function credentialsConfigured(): boolean {
  return Boolean(
    process.env.ADMIN_EMAIL &&
      process.env.ADMIN_PASSWORD_SALT &&
      process.env.ADMIN_PASSWORD_HASH &&
      process.env.ADMIN_SESSION_SECRET
  );
}

export function debugFingerprint(): string {
  const salt = process.env.ADMIN_PASSWORD_SALT ?? "";
  return createHash("sha256").update(salt).digest("hex").slice(0, 8);
}
