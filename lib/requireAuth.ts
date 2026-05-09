import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ROLE } from "@/utils/roleRoute";
import { ADMIN, INSTRUCTOR, USER } from "@/constants/role.constant";

export async function requireAuth(
  roles?: (typeof ADMIN | typeof INSTRUCTOR | typeof USER)[],
) {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
  
  const session = await auth.api.getSession({
    headers: headerList,
  });

  if (!session) {
    redirect(`/login?from=${pathname?.split("/")[1]}`);
  }

  if (roles && !roles.includes(session?.user?.role as ROLE)) {
    redirect("/unauthorized");
  }

  return session;
}
