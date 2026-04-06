import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ROLE } from "@/utils/roleRoute";
import { ADMIN, INSTRUCTOR, USER } from "@/constants/role.constant";

export async function requireAuth(
  roles?: (typeof ADMIN | typeof INSTRUCTOR | typeof USER)[],
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (roles && !roles.includes(session?.user?.role as ROLE)) {
    redirect("/unauthorized");
  }

  return session;
}
