// app/layout.tsx
"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { SearchModal } from "@/components/SearchModal";

const Sidebar = dynamic(() => import("@/components/Sidebar"), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <Sidebar onOpenSearch={() => setIsSearchOpen(true)} />
          <main className="flex-1 p-8 ml-64">{children}</main>
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
        </div>
      </body>
    </html>
  );
}
