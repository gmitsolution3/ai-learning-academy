import { requireAuth } from "@/lib/requireAuth";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth(["user"]);

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white">
        User Sidebar
      </aside>

      <div className="flex-1">
        <header className="border-b p-4">User Header</header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
