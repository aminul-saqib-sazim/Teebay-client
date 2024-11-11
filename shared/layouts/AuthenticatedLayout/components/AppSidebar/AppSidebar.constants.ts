import { Calendar, Home, Inbox, Search, Settings, Users } from "lucide-react";

import { EUserRole } from "@/shared/typedefs/api";

const ADMIN_SIDEBAR_MENU_ITEMS = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const SUPER_USER_SIDEBAR_MENU_ITEMS = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export const getSidebarMenuItem = (signedInUserRole: EUserRole) => {
  switch (signedInUserRole) {
    case EUserRole.ADMIN:
      return ADMIN_SIDEBAR_MENU_ITEMS;
    case EUserRole.SUPER_USER:
      return SUPER_USER_SIDEBAR_MENU_ITEMS;

    default:
      return [];
  }
};
