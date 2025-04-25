"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";
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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:bg-card md:border-r">
      <div className="flex flex-col h-full px-3 py-4">
        <div className="px-3 py-2">
          <h2 className="text-lg font-semibold tracking-tight">
            Client Dashboard
          </h2>
        </div>
        <div className="space-y-1 mt-8">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                  pathname === link.href
                    ? "bg-muted text-primary font-medium"
                    : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
