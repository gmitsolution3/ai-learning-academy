import { DashboardMenu } from "@/utils/dashboardMenu";
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  UserCircle,
  Settings,
} from "lucide-react";

const baseDashboardUrl = "/admin-dashboard";
const dashboardMenu = new DashboardMenu(baseDashboardUrl);

export const mainMenuItems = [
  {
    title: "Dashboard",
    url: dashboardMenu.defineUrl("/"),
    icon: LayoutDashboard,
  },
  {
    title: "Recent Activities",
    url: "/appointments",
    icon: Calendar,
  },
  { title: "Notifications", url: "/patients", icon: Users },
];

export const courseManagement = [
  {
    title: "All Courses",
    url: dashboardMenu.defineUrl("/all-courses"),
    icon: LayoutDashboard,
  },
  {
    title: "All Category",
    url: dashboardMenu.defineUrl("/all-category"),
    icon: Calendar,
  },
  {
    title: "Create Category",
    url: dashboardMenu.defineUrl("/course/create-category"),
    icon: Calendar,
  },
  { title: "Published Course", url: "/patients", icon: Users },
  { title: "Draft Course Records", url: "/records", icon: FileText },
  { title: "Course Curriculmn", url: "/records", icon: FileText },
];

export const userManagement = [
  {
    title: "User Management",
    url: dashboardMenu.defineUrl("/user-management"),
    icon: LayoutDashboard,
  },
  {
    title: "Students",
    url: dashboardMenu.defineUrl("/all-courses"),
    icon: LayoutDashboard,
  },
  {
    title: "Instructors",
    url: dashboardMenu.defineUrl("/all-courses"),
    icon: LayoutDashboard,
  },
  {
    title: "Admin",
    url: dashboardMenu.defineUrl("/all-courses"),
    icon: LayoutDashboard,
  },
];

export const settingsItems = [
  {
    title: "Profile",
    url: dashboardMenu.defineUrl("/profile"),
    icon: UserCircle,
  },
  { title: "Settings", url: "/settings", icon: Settings },
];
