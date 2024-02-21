import { defineConfig } from "drizzle-kit";

const authToken = process.env["SST_Secret_value_TURSO_AUTH_TOKEN"];
const url = process.env["SST_Secret_value_TURSO_URL"] as string;

export default defineConfig({
  schema: "./src/**/*.sql.ts",
  out: "./migrations/",
  driver: "turso",
  dbCredentials: {
    authToken,
    url,
  },
  verbose: true,
  strict: true,
});
