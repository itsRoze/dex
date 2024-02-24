import { createSelectSchema } from "drizzle-zod";
import { contact } from "./contact.sql";
import { type z } from "zod";

export const Info = createSelectSchema(contact, {
  id: (schema) => schema.id.min(1),
  name: (schema) => schema.name.min(1),
  email: (schema) => schema.email.optional(),
  phone: (schema) => schema.phone.optional(),
  place: (schema) => schema.place.optional(),
  twitter: (schema) => schema.twitter.optional(),
  linkedin: (schema) => schema.linkedin.optional(),
  bluesky: (schema) => schema.bluesky.optional(),
  notes: (schema) => schema.notes.optional(),
});

export type ContactInfo = z.infer<typeof Info>;
