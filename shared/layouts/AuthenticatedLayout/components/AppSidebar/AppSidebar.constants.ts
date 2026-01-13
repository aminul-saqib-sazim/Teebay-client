import { Calendar, Home, Inbox, Search, Settings, Users } from "lucide-react";

import { EUserRole } from "@/shared/redux/rtk-apis/roles/roles.enums";

const DEFAULT_SIDEBAR_MENU_ITEMS = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

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

const OWNER_SIDEBAR_MENU_ITEMS = [
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

export const getSidebarMenuItem = (role: EUserRole | null) => {
  switch (role) {
    case EUserRole.OWNER:
      return OWNER_SIDEBAR_MENU_ITEMS;
    case EUserRole.ADMIN:
      return ADMIN_SIDEBAR_MENU_ITEMS;
    case EUserRole.MEMBER:
      return DEFAULT_SIDEBAR_MENU_ITEMS;
    default:
      return DEFAULT_SIDEBAR_MENU_ITEMS;
  }
};
