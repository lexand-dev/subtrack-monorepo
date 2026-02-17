"use client"

import { SidebarProvider } from "@/components/ui/sidebar";
import { NavbarHome } from "../components/home-navbar";
import { SidebarHome } from "../components/home-sidebar";

export const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        {/* Navbar */}
        <NavbarHome />

        {/* Sidebar */}
        <div className="flex min-h-screen pt-16">
          <SidebarHome />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
