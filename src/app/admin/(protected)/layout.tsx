import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, isValidSession } from "@/lib/adminAuth";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  const session = jar.get(ADMIN_SESSION_COOKIE)?.value;

  if (!isValidSession(session)) {
    redirect("/admin/login");
  }

  return <>{children}</>;
}
