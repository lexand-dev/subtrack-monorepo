import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { Calendar1Icon, LayoutDashboardIcon, ListIcon, Wallet2Icon } from "lucide-react";

export const HomeSidebar = () => {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
    { to: "/services", label: "Services", icon: ListIcon },
    { to: "/calendar", label: "Calendar", icon: Calendar1Icon },
    { to: "/wallet", label: "Wallet", icon: Wallet2Icon },
  ] as const;

  return (
    <Sidebar className="pt-16 z-40 border-none group" collapsible="icon">
      <SidebarContent className="bg-background p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-y-2">
              {links.map((link) => (
                <SidebarMenuItem key={link.label}>
                  <SidebarMenuButton
                    size="lg"
                    tooltip={link.label}
                    isActive={isActive(link.to)}
                    className={cn(
                      "hover:border p-0",
                      isActive(link.to) &&
                      "bg-primary-foreground border"
                    )}>
                    <Link
                      href={link.to}
                      className="w-full h-full flex text-sm items-center font-semibold pl-2.5 group-data-[collapsible=icon]:pl-1.5! gap-4"
                    >
                      <link.icon className={cn("h-8 w-8", isActive(link.to) && "text-primary")} />
                      <span className="">{link.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
