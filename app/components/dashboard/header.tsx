"use client";

import { Button } from "@/app/components/ui/button";
import { ModeToggle } from "@/app/components/mode-toggle";
import { UserNav } from "@/app/components/dashboard/user-nav";
import { Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/app/lib/utils";
import Link from "next/link";
import {
  Calendar,
  CreditCard,
  FileImage,
  Home,
  BarChart,
  Bell,
} from "lucide-react";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Media Gallery", href: "/dashboard/media", icon: FileImage },
  { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  { name: "Subscription", href: "/dashboard/subscription", icon: CreditCard },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
];

export function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle Menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <span className="font-semibold">Client Dashboard</span>
        </div>
        <div className="hidden md:block" />
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
      <div
        className={cn(
          "md:hidden border-b absolute w-full bg-background transition-all duration-200 ease-in-out",
          showMobileMenu ? "max-h-screen" : "max-h-0 invisible opacity-0 border-transparent"
        )}
      >
        <nav className="container py-2">
          <ul className="grid gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
