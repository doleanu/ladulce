import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_SESSION_COOKIE, isValidSession } from "@/lib/adminAuth";
import { saveMenuData } from "@/lib/menuData";

const MAX_BODY_BYTES = 800_000; // the whole carta is ~100 KB; anything much bigger is not from the editor

// Every public page that shows menu data. Refreshed on demand so the change is live in seconds
// (the pages themselves only re-read Blob once a day otherwise).
const PATHS = ["/", "/en", "/de", "/fr", "/carta", "/en/carta", "/de/carta", "/fr/carta", "/admin/menu"];

export async function POST(req: Request) {
  const jar = await cookies();
  if (!isValidSession(jar.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  }

  let body: { baseVersion?: unknown; data?: unknown };
  try {
    const text = await req.text();
    if (text.length > MAX_BODY_BYTES) return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }
  if (typeof body.baseVersion !== "number") {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const result = await saveMenuData(body.data, body.baseVersion);
  if (!result.ok) {
    const status = result.error === "conflict" ? 409 : result.error === "invalid" ? 400 : 500;
    return NextResponse.json({ ok: false, error: result.error, message: result.message }, { status });
  }

  for (const p of PATHS) revalidatePath(p);
  return NextResponse.json({ ok: true, version: result.version });
}
