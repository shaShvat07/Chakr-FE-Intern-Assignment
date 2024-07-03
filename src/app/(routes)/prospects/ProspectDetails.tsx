// app/(routes)/prospects/ProspectDetails.tsx
import { useState } from "react";
import { Prospect } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ProspectDetailsProps = {
  prospect: Prospect;
};

export default function ProspectDetails({ prospect }: ProspectDetailsProps) {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        {prospect.firstName} {prospect.lastName}
      </h2>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="emails">Emails</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <div className="space-y-2">
            <p>
              <strong>Email:</strong> {prospect.email}
            </p>
            <p>
              <strong>Phone:</strong> {prospect.phone}
            </p>
            <p>
              <strong>Company:</strong> {prospect.company}
            </p>
            <p>
              <strong>Status:</strong> {prospect.status}
            </p>
          </div>
        </TabsContent>
        <TabsContent value="tasks">
          <p>Tasks will go here</p>
        </TabsContent>
        <TabsContent value="notes">
          <p>Notes will go here</p>
        </TabsContent>
        <TabsContent value="emails">
          <p>Emails will go here</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
