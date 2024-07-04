// components/Sidebar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Search,
  Bell,
  CheckSquare,
  Users,
  Building,
  Settings,
  FileText,
  BarChart,
  Calendar,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const navItems = [
  //   { name: "Search", icon: Search, href: "/search" },
  { name: "Notifications", icon: Bell, href: "/notifications" },
  { name: "Tasks", icon: CheckSquare, href: "/tasks" },
  {
    name: "Sales",
    items: [
      { name: "Prospects", icon: Users, href: "/prospects" },
      { name: "Companies", icon: Building, href: "/companies" },
    ],
  },
  {
    name: "Management",
    items: [
      { name: "Deals", icon: FileText, href: "/deals" },
      { name: "Reports", icon: BarChart, href: "/reports" },
      { name: "Calendar", icon: Calendar, href: "/calendar" },
    ],
  },
  { name: "Settings", icon: Settings, href: "/settings" },
];

type SidebarProps = {
  onOpenSearch: () => void;
  isOpen: boolean;
};

export default function Sidebar({ onOpenSearch, isOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed left-0 h-[calc(100vh-4rem)] w-64 bg-background border-r transition-transform duration-200 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0"
      )}
    >
      <nav className="flex-1 overflow-y-auto">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-foreground">CRM Dashboard</h1>
        </div>
        <Button
          onClick={onOpenSearch}
          className="w-full justify-start mb-3 text-left text-muted-foreground"
          variant="ghost"
        >
          <Search className="mr-3 h-6 w-6" />
          Search
        </Button>
        {navItems.map((item, index) => (
          <div key={index} className="mb-3">
            {item.items ? (
              <>
                <h2 className="px-4 text-xs font-semibold uppercase text-muted-foreground">
                  {item.name}
                </h2>
                {item.items.map((subItem) => (
                  <NavItem
                    key={subItem.name}
                    item={subItem}
                    isActive={pathname === subItem.href}
                  />
                ))}
              </>
            ) : (
              <NavItem item={item} isActive={pathname === item.href} />
            )}
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-r border-border">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="text-sm font-medium text-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground">ABC Corporation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ item, isActive }: { item: any; isActive: boolean }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center px-4 py-2 text-sm font-medium rounded-md",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
      )}
    >
      <item.icon className="mr-3 h-6 w-6" />
      {item.name}
    </Link>
  );
}
