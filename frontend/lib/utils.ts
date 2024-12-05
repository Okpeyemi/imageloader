import { clsx, type ClassValue } from "clsx";
import { LayoutDashboard, User, Users } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type NavItem = {
  label: string;
  link: string;
  icon?: React.ComponentType;
  keyword: string;
};

export const navbar: NavItem[] = [
  {
    label: "Dashboard",
    link: "/dashboard",
    icon: LayoutDashboard,
    keyword: "d",
  },
  {
    label: "Profil",
    link: "/profil",
    icon: User,
    keyword: "p",
  },
  {
    label: "Utilisateurs",
    link: "/utilisateurs",
    icon: Users,
    keyword: "u",
  },
];
