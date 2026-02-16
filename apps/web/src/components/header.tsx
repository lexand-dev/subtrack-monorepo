"use client";
import Link from "next/link";

import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";
import { LogoIcon } from "./logo-icon";

export default function Header() {
  const links = [
    { to: "/", label: "Features" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/ai", label: "AI Chat" },
    { to: "/#pricing", label: "Pricing" },
  ] as const;

  return (
    <div className="max-w-280 px-8 py-4 mx-auto">
      <div className="flex flex-row items-center justify-between px-2 py-1">
        <Link href="/">
          <h1 className="flex items-center gap-2 text-xl font-bold">
            <LogoIcon className="size-8" />
            Subtrack
          </h1>
        </Link>
        <nav className="hidden md:flex gap-4 text-lg">
          {links.map(({ to, label }) => {
            return (
              <Link key={to} href={to} className="text-foreground text-sm font-semibold">
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserMenu />
        </div>
      </div>
    </div>
  );
}
