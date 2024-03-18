import { createSelectSchema } from "drizzle-zod";
import { contact } from "./contact.sql";
import { type z } from "zod";

export const Info = createSelectSchema(contact, {
  id: (schema) => schema.id.min(1),
  name: (schema) => schema.name.min(1),
  email: (schema) => schema.email,
  phone: (schema) => schema.phone,
  place: (schema) => schema.place,
  twitter: (schema) => schema.twitter,
  linkedin: (schema) => schema.linkedin,
  bluesky: (schema) => schema.bluesky,
  notes: (schema) => schema.notes,
});

export type ContactInfo = z.infer<typeof Info>;
