import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { LanguageSelector } from "@/shared/components/LanguageSelector";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
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
import { useAuth } from "@/shared/providers/AuthProvider";

import { getSidebarMenuItem } from "./AppSidebar.constants";

const AppSidebar = () => {
  const { isLoading, user, activeOrganizationRole } = useAuth();
  const { signOut } = useSignOut();

  if (isLoading || !user) {
    return <LoadingSpinner />;
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {getSidebarMenuItem(activeOrganizationRole).map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
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
