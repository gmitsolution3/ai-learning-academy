"use client";

import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  LogOut,
  ClipboardList,
  UserCircle,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";

const baseDashboardUrl = "/admin-dashboard";
function defineUrl(url: string) {
  return url === "/" ? baseDashboardUrl : baseDashboardUrl.concat(url);
}

const mainMenuItems = [
  { title: "Dashboard", url: defineUrl("/"), icon: LayoutDashboard },
  {
    title: "Recent Activities",
    url: "/appointments",
    icon: Calendar,
  },
  { title: "Notifications", url: "/patients", icon: Users },
];

const courseManagement = [
  {
    title: "All Courses",
    url: defineUrl("/all-courses"),
    icon: LayoutDashboard,
  },
  {
    title: "All Category",
    url: defineUrl("/all-category"),
    icon: Calendar,
  },
  {
    title: "Create Category",
    url: defineUrl("/course/create-category"),
    icon: Calendar,
  },
  { title: "Published Course", url: "/patients", icon: Users },
  { title: "Draft Course Records", url: "/records", icon: FileText },
  { title: "Course Curriculmn", url: "/records", icon: FileText },
];

const userManagement = [
  {
    title: "Students",
    url: defineUrl("/all-courses"),
    icon: LayoutDashboard,
  },
  {
    title: "Instructors",
    url: defineUrl("/all-courses"),
    icon: LayoutDashboard,
  },
  {
    title: "Admin",
    url: defineUrl("/all-courses"),
    icon: LayoutDashboard,
  },
  {
    title: "Role Management",
    url: defineUrl("/all-courses"),
    icon: LayoutDashboard,
  },
];

const settingsItems = [
  { title: "Profile", url: "/profile", icon: UserCircle },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-sidebar-border"
    >
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Website logo"
              width={200}
              height={200}
              priority
              className="w-12"
            />

            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-lg font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  AI Learning
                </span>
                <span className="text-xs text-muted-foreground">
                  Academy
                </span>
              </div>
            )}
          </div>
        </Link>
      </SidebarHeader>

      {/* Dashboard */}
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {!isCollapsed && "Main Menu"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      href={item.url}
                      exact={item.url === "/admin-dashboard"}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Course Management */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {!isCollapsed && "Course Management"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {courseManagement.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      href={item.url}
                      exact={item.url === "/admin"}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Management */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {!isCollapsed && "User Management"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userManagement.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      href={item.url}
                      exact={item.url === "/admin"}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {!isCollapsed && "Settings"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      href={item.url}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              DR
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex flex-1 flex-col overflow-hidden">
              <span className="truncate text-sm font-medium text-sidebar-foreground">
                Dr. Sarah Wilson
              </span>
              <span className="truncate text-xs text-muted-foreground">
                Cardiologist
              </span>
            </div>
          )}
          {!isCollapsed && (
            <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
