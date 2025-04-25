import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isAdmin(role?: string | null): boolean {
  return role === "admin";
}

export function isClient(role?: string | null): boolean {
  return role === "client";
}

export function getRedirectPathAfterLogin(role?: string | null): string {
  if (isAdmin(role)) {
    return "/protected/admin/dashboard";
  }
  if (isClient(role)) {
    return "/protected/client/dashboard";
  }
  return "/auth/login";
}
