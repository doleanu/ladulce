import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, createSessionValue, verifyCredentials } from "@/lib/adminAuth";

export async function POST(req: Request) {
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  if (!verifyCredentials(email, password)) {
    return NextResponse.json({ ok: false, error: "invalid_credentials" }, { status: 401 });
  }

  const { value, maxAge } = createSessionValue();
  const jar = await cookies();
  jar.set(ADMIN_SESSION_COOKIE, value, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    // "/" (not "/admin") — the session cookie also has to reach
    // /api/admin/menu-prices, which isn't under the /admin path prefix.
    path: "/",
    maxAge,
  });

  return NextResponse.json({ ok: true });
}
