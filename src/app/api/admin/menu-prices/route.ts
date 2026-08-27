import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_SESSION_COOKIE, isValidSession } from "@/lib/adminAuth";
import { saveMenuPrices, type MenuPrices } from "@/lib/menuPrices";

export async function POST(req: Request) {
  const jar = await cookies();
  const session = jar.get(ADMIN_SESSION_COOKIE)?.value;
  if (!isValidSession(session)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let data: MenuPrices;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return NextResponse.json({ ok: false, error: "invalid_shape" }, { status: 400 });
  }

  await saveMenuPrices(data);

  for (const path of ["/carta", "/en/carta", "/de/carta", "/fr/carta", "/admin/menu"]) {
    revalidatePath(path);
  }

  return NextResponse.json({ ok: true });
}
