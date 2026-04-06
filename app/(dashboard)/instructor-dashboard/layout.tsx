import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/layout/Instructor/DashboardSidebar";
import { DashboardHeader } from "@/layout/Instructor/DashboardHeader";
import { requireAuth } from "@/lib/requireAuth";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-auto bg-background p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
