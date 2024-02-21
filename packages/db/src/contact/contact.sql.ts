import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const contact = sqliteTable("contact", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  place: text("place"),
  twitter: text("twitter"),
  linkedin: text("linkedin"),
  bluesky: text("bluesky"),
  notes: text("notes"),
});
