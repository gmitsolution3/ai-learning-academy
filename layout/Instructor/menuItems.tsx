import { DashboardMenu } from "@/utils/dashboardMenu";
import {
  BringToFront,
  Calendar,
  FileText,
  LayoutDashboard,
  LayoutList,
  Settings,
  UserCircle,
  Users,
  PackageOpen
} from "lucide-react";

const baseDashboardUrl = "/instructor-dashboard";
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
  {
    title: "Notifications",
    url: "/patients",
    icon: Users,
  },
];

export const courseManagement = [
  {
    title: "Courses Management",
    url: dashboardMenu.defineUrl("/course-management"),
    icon: LayoutList,
  },
  {
    title: "Category Management",
    url: dashboardMenu.defineUrl("/category-management"),
    icon: BringToFront,
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
    title: "Students",
    url: dashboardMenu.defineUrl("/all-courses"),
    icon: LayoutDashboard,
  },
  {
    title: "Instructors",
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
