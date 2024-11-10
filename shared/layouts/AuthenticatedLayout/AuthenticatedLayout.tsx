import { PropsWithChildren } from "react";

import { SidebarProvider, SidebarTrigger } from "@/shared/components/shadui/sidebar";

import AppSidebar from "./components/AppSidebar";

const AuthenticatedLayout = ({ children }: PropsWithChildren) => (
  <SidebarProvider>
    <AppSidebar />
    <main className="w-full">
      <SidebarTrigger />
      {children}
    </main>
  </SidebarProvider>
);

export default AuthenticatedLayout;
