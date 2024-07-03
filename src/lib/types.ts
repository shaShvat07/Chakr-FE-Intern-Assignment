// lib/types.ts
import { z } from "zod";

export const ProspectSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  company: z.string(),
  status: z.enum(["New", "Contacted", "Qualified", "Lost", "Won"]),
  dateAdded: z.date(),
});

export type Prospect = z.infer<typeof ProspectSchema>;
