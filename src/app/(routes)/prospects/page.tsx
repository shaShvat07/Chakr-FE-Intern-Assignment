// app/(routes)/prospects/page.tsx
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Prospect } from "@/lib/types";
import { initialProspects } from "@/lib/data";
import ProspectTable from "./ProspectTable";

export default function ProspectsPage() {
  const [selectedProspectId, setSelectedProspectId] = useState<string | null>(null);

  const { data: prospects } = useQuery<Prospect[]>({
    queryKey: ["prospects"],
    queryFn: () => Promise.resolve(initialProspects),
  });

  const handleProspectClick = (prospect: Prospect) => {
    setSelectedProspectId(prospect.id);
  };

  const handleBackClick = () => {
    setSelectedProspectId(null);
  };

  return (
    <div className="flex h-full mt-6">
      <div className="w-full">
        <ProspectTable
          prospects={prospects || []}
          onProspectClick={handleProspectClick}
        />
      </div>
    </div>
  );
}