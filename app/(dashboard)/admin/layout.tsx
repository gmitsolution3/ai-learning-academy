export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white">
        Admin Sidebar
      </aside>

      <div className="flex-1">
        <header className="border-b p-4">Admin Header</header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}