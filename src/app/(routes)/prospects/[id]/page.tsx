// app/(routes)/prospects/[id].tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Prospect } from "@/lib/types";
import { initialProspects } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import TaskManager from "../TaskManager";

export default function ProspectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [prospect, setProspect] = useState<Prospect | null>(null);

  useEffect(() => {
    if (params.id) {
      const foundProspect = initialProspects.find((p) => p.id === params.id);
      setProspect(foundProspect || null);
    }
  }, [params.id]);

  if (!prospect) return <div>Loading...</div>;

  return (
    <div className="flex h-full">
      <Button onClick={() => router.back()} className="mt-6">
        Back
      </Button>
      <div className="w-1/2 p-6 border-r h-full bg-card text-card-foreground">
        <h2 className="text-3xl font-bold mb-6 text-primary">
          {prospect.firstName} {prospect.lastName}
        </h2>
        <div className="space-y-4">
          <p className="text-lg">
            <strong className="font-semibold text-muted-foreground">
              Email:
            </strong>{" "}
            <span className="text-muted-foreground">{prospect.email}</span>
          </p>
          <p className="text-lg">
            <strong className="font-semibold text-muted-foreground">
              Phone:
            </strong>{" "}
            <span className="text-muted-foreground">{prospect.phone}</span>
          </p>
          <p className="text-lg">
            <strong className="font-semibold text-muted-foreground">
              Company:
            </strong>{" "}
            <span className="text-muted-foreground">{prospect.company}</span>
          </p>
          <p className="text-lg">
            <strong className="font-semibold text-muted-foreground">
              Status:
            </strong>{" "}
            <span
              className={`text-lg ${
                prospect.status === "Won" ? "text-green-600" : "text-red-600"
              }`}
            >
              {prospect.status}
            </span>
          </p>
        </div>
      </div>
      <div className="w-1/2 p-4">
        <Tabs defaultValue="tasks">
          <TabsList>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="emails">Emails</TabsTrigger>
          </TabsList>
          <TabsContent value="tasks">
            <TaskManager prospectId={prospect.id} />
          </TabsContent>
          <TabsContent value="notes">
            {/* <NotesManager prospectId={prospect.id} /> */}
            Notes is under construction.
          </TabsContent>
          <TabsContent value="emails">
            {/* <EmailsManager prospectId={prospect.id} /> */}
            Emails is under construction.
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
