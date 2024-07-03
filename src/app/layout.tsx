// app/layout.tsx
"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { SearchModal } from "@/components/SearchModal";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

const Sidebar = dynamic(
  () => import("@/components/Sidebar").then((mod) => mod.default),
  { ssr: false }
);

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <html lang="en">
      <ThemeProvider>
        <body className={`${inter.className} bg-background text-foreground`}>
          <div className="flex flex-col">
            <Sidebar
              onOpenSearch={() => setIsSearchOpen(true)}
              isOpen={isSidebarOpen}
            />
            <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className="flex flex-1 flex-col">
              <main
                className={`flex-1 p-8 overflow-auto ${
                  isSidebarOpen ? "md:ml-64" : ""
                }`}
              >
                {children}
              </main>
              <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
              />
            </div>
          </div>
        </body>
      </ThemeProvider>
    </html>
  );
}
