"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar1Icon,
  LayoutIcon,
  ListIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LogoIcon } from "../logo-icon";

const customerSupportItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutIcon
  },
  {
    title: "Services",
    url: "/services",
    icon: ListIcon
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar1Icon
  }
];

export const DashboardSidebar = () => {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  return (
    <Sidebar className="group" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="p-4">
            <Link href="/" className="group-data-[collapsible=icon]:hidden!">
              <h1 className="flex items-center gap-2 text-xl font-bold">
                <LogoIcon className="size-8" />
                Subtrack
              </h1>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Customer Support */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-y-2">
              {customerSupportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={isActive(item.url)}
                    className={cn(
                      "hover:rounded-2xl p-0",
                      isActive(item.url) &&
                      "bg-primary-foreground rounded-2xl group-data-[collapsible=icon]:rounded-sm! group-data-[collapsible=icon]:pl-0!"
                    )}
                    size="lg"
                  >
                    <Link href={item.url} className="w-full h-full flex text-sm items-center font-semibold pl-6 group-data-[collapsible=icon]:pl-2!">
                      <item.icon className={cn("mr-4 h-8 w-8", isActive(item.url) && "text-primary")} />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
};
