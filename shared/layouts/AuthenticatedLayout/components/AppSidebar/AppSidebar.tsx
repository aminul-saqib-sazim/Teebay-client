import Link from "next/link";
import { usePathname } from "next/navigation";

import { LogOut, Sparkles } from "lucide-react";

import { LanguageSelector } from "@/shared/components/LanguageSelector";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/shadui/avatar";
import { Button } from "@/shared/components/shadui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/shadui/sidebar";
import { useSignOut } from "@/shared/hooks/useSignOut";
import { useAuth } from "@/shared/providers/AuthProvider";

import { getSidebarMenuItem } from "./AppSidebar.constants";

const AppSidebar = () => {
  const pathname = usePathname();
  const { isLoading, user, activeOrganizationRole } = useAuth();
  const { signOut } = useSignOut();

  if (isLoading || !user) {
    return <LoadingSpinner />;
  }

  const menuItems = getSidebarMenuItem(activeOrganizationRole);

  return (
    <Sidebar className="border-r border-border/50 bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60">
      <SidebarHeader className="h-16 flex items-center px-6 border-b border-border/50">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="p-2 rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-3 shadow-sm group-hover:shadow-primary/20">
            <Sparkles size={22} className="transition-transform duration-500 group-hover:rotate-[360deg]" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Teebay
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/50 mb-2">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      className={`
                        relative group transition-all duration-200 rounded-lg px-4 py-2.5
                        ${isActive
                          ? "bg-primary/10 text-primary font-semibold shadow-sm"
                          : "hover:bg-secondary/80 text-muted-foreground hover:text-foreground"
                        }
                      `}
                      render={
                        <Link href={item.url} className="flex items-center gap-3.5 w-full">
                          <item.icon
                            size={18}
                            className={`transition-all duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                          />
                          <span className="text-sm tracking-wide">{item.title}</span>
                          {isActive && (
                            <div className="absolute left-0 w-1 h-5 bg-primary rounded-r-full shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                          )}
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50 bg-secondary/30">
        <div className="flex items-center gap-4 px-2 py-3 mb-3 bg-background/50 rounded-xl border border-border/50 shadow-sm backdrop-blur-sm">
          <Avatar className="h-10 w-10 border-2 border-primary/20 transition-transform duration-300 hover:scale-105">
            <AvatarImage src={user.image || ""} />
            <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold uppercase">
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold truncate leading-none mb-1">
              {user.firstName} {user.lastName}
            </span>
            <span className="text-[11px] text-muted-foreground truncate leading-none">
              {user.email}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="px-2">
            <LanguageSelector />
          </div>
          <Button
            variant="ghost"
            onClick={() => signOut({ shouldRedirect: false })}
            className="w-full justify-start gap-3.5 h-11 px-4 text-muted-foreground hover:text-destructive hover:bg-destructive/5 group rounded-lg transition-colors"
          >
            <div className="p-1.5 rounded-md bg-secondary transition-colors group-hover:bg-destructive/10">
              <LogOut size={16} className="transition-transform group-hover:-translate-x-0.5" />
            </div>
            <span className="text-sm font-medium tracking-wide">Sign Out</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
