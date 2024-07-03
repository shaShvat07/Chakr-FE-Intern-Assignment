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

export default function Sidebar({ onOpenSearch }: { onOpenSearch: () => void }) {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-100 text-gray-800 flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold">CRM Dashboard</h1>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <Button
          onClick={onOpenSearch}
          className="w-full justify-start mb-4 text-left bg-gray-100 text-gray-800 hover:bg-gray-200"
        >
          <Search className="mr-3 h-6 w-6" />
          Search
        </Button>
        {navItems.map((item, index) => (
          <div key={index} className="mb-4">
            {item.items ? (
              <>
                <h2 className="px-4 text-xs font-semibold uppercase text-gray-300">
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
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-500">ABC Corporation</p>
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
          ? "bg-gray-200 text-gray-900"
          : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
      )}
    >
      <item.icon className="mr-3 h-6 w-6" />
      {item.name}
    </Link>
  );
}
