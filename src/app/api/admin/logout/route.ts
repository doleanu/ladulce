import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "@/lib/adminAuth";

export async function POST() {
  const jar = await cookies();
  jar.delete({ name: ADMIN_SESSION_COOKIE, path: "/admin" });
  return NextResponse.json({ ok: true });
}
