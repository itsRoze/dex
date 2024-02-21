import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { Config } from "sst/node/config";

const client = createClient({
  url: Config.TURSO_URL,
  authToken: Config.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client);
