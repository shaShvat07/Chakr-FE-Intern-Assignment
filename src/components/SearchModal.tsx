// components/SearchModal.tsx
"use client";

import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { navItems } from '@/components/Sidebar'; // Import navItems from Sidebar

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const dummyProspects = [
  { name: 'Alice Johnson', photo: 'AJ' },
  { name: 'Bob Smith', photo: 'BS' },
  { name: 'Carol Williams', photo: 'CW' },
];

const dummyCompanies = [
  { name: 'Acme Corp', photo: 'AC' },
  { name: 'Beta Industries', photo: 'BI' },
  { name: 'Gamma Tech', photo: 'GT' },
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[50%] h-full">
        <div className="flex flex-col h-full">
          <Input placeholder="Search..." className="mb-4 mt-4" />
          <div className="flex-1 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-2">Pages</h2>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {navItems.map((item, index) => (
                <div key={index} className="p-2 bg-gray-100 rounded">
                  {item.name}
                </div>
              ))}
            </div>
            
            <h2 className="text-lg font-semibold mb-2">Prospects</h2>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {dummyProspects.map((prospect, index) => (
                <div key={index} className="flex items-center p-2 bg-gray-100 rounded">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback>{prospect.photo}</AvatarFallback>
                  </Avatar>
                  <span>{prospect.name}</span>
                </div>
              ))}
            </div>
            
            <h2 className="text-lg font-semibold mb-2">Companies</h2>
            <div className="grid grid-cols-2 gap-2">
              {dummyCompanies.map((company, index) => (
                <div key={index} className="flex items-center p-2 bg-gray-100 rounded">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback>{company.photo}</AvatarFallback>
                  </Avatar>
                  <span>{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}