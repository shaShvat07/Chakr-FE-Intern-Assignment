// components/SearchModal.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { navItems } from '@/components/Sidebar';
import { initialProspects } from '@/lib/data';
import { useRouter } from 'next/navigation';

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SearchItem = {
  name: string;
  href: string;
  type: 'page' | 'prospect' | 'company';
  icon?: React.ComponentType<{ className?: string }>;
  id?: string; // Add this for prospects
};

const flattenNavItems = (items: typeof navItems): SearchItem[] => {
  // @ts-ignore: Unreachable code error
  return items?.flatMap(item => {
    if ('items' in item) {
      return item?.items?.map(subItem => ({
        name: subItem.name,
        href: subItem.href,
        type: 'page' as const,
        icon: subItem.icon,
      }));
    }
    return {
      name: item.name,
      href: item.href,
      type: 'page' as const,
      icon: item.icon,
    };
  });
};

const searchItems: SearchItem[] = [
  ...flattenNavItems(navItems),
  ...initialProspects.map(prospect => ({
    name: `${prospect.firstName} ${prospect.lastName}`,
    href: `/prospects/${prospect.id}`,
    type: 'prospect' as const,
    id: prospect.id,
  })),
  ...Array.from(new Set(initialProspects.map(p => p.company))).map(company => ({
    name: company,
    href: `/companies/${company.toLowerCase().replace(/\s+/g, '-')}`,
    type: 'company' as const,
  })),
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<SearchItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = searchItems.filter(item => 
      item.name.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredItems(filtered);
  }, [searchTerm]);

  const handleItemClick = (item: SearchItem) => {
    if (item.type === 'prospect') {
      router.push(`/prospects/${item.id}`);
    } else {
      router.push(item.href);
    }
    onClose();
  };

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, SearchItem[]>);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[50%] h-[calc(100%-0.5rem)] bg-background text-foreground">
        <div className="flex flex-col h-full">
          <Input 
            placeholder="Search..." 
            className="mb-4 mt-4" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex-1 overflow-y-auto">
            {Object.entries(groupedItems).map(([type, items]) => (
              <div key={type}>
                <h2 className="text-lg font-semibold mb-2 text-foreground capitalize">{type}s</h2>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {items.slice(0, 4).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center p-2 bg-secondary text-secondary-foreground rounded cursor-pointer hover:bg-secondary/80"
                      onClick={() => handleItemClick(item)}
                    >
                      {item.icon && <item.icon className="h-5 w-5 mr-2" />}
                      {!item.icon && (
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback>{item.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                      )}
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {Object.keys(groupedItems).length === 0 && (
              <p className="text-center text-muted-foreground">No results found</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}