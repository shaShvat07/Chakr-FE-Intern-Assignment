// app/(routes)/prospects/page.tsx
"use client";

// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Prospect } from "@/lib/types";
import ProspectTable from "./ProspectTable";

export default function ProspectsPage() {

  return (
    <div className="flex h-full mt-6">
      <div className="w-full">
        <ProspectTable />
      </div>
    </div>
  );
}