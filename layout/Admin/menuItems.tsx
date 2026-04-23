import { DashboardMenu } from "@/utils/dashboardMenu";
import {
  BringToFront,
  Calendar,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LayoutList,
  PackageOpen,
  Settings,
  UserCircle,
  Users,
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
    title: "Category Management",
    url: dashboardMenu.defineUrl("/category-management"),
    icon: BringToFront,
  },
  {
    title: "Courses Management",
    url: dashboardMenu.defineUrl("/course-management"),
    icon: GraduationCap,
  },
  {
    title: "Batch Management",
    url: dashboardMenu.defineUrl("/batch-management"),
    icon: LayoutList,
  },
  {
    title: "Published Course",
    url: dashboardMenu.defineUrl("/published-courses"),
    icon: FileText,
  },
  {
    title: "Draft Course",
    url: dashboardMenu.defineUrl("/draft-courses"),
    icon: PackageOpen,
  },
  {
    title: "Course Curriculmn",
    url: dashboardMenu.defineUrl("/records"),
    icon: FileText,
  },
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
