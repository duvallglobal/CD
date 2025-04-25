"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";
import {
  Users,
  Calendar,
  CreditCard,
  FileImage,
  Home,
  BarChart,
  Bell,
  Settings,
  FolderOpen,
} from "lucide-react";

const links = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Clients", href: "/admin/clients", icon: Users },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
  { name: "Media", href: "/admin/media", icon: FileImage },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart },
  { name: "Notifications", href: "/admin/notifications", icon: Bell },
  { name: "Client Folders", href: "/admin/client-folders", icon: FolderOpen },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:bg-card md:border-r">
      <div className="flex flex-col h-full px-3 py-4">
        <div className="px-3 py-2">
          <h2 className="text-lg font-semibold tracking-tight">
            Admin Portal
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
