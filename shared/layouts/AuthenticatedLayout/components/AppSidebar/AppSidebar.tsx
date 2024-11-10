import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { LanguageSelector } from "@/shared/components/LanguageSelector";
import { Button } from "@/shared/components/shadui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/shadui/sidebar";
import { useSignOut } from "@/shared/hooks/useSignOut";

import { SIDEBAR_MENU_ITEMS } from "./AppSidebar.constants";

const AppSidebar = () => {
  const { signOut } = useSignOut();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_MENU_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-1 w-full">
          <LanguageSelector />
        </div>
        <Button variant="destructive" onClick={() => signOut({ shouldRedirect: false })}>
          Sign Out
          <ArrowRight />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
