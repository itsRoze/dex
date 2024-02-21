import { Config, StackContext } from "sst/constructs";

export function Secrets(ctx: StackContext) {
  return {
    database: Config.Secret.create(ctx.stack, "TURSO_URL", "TURSO_AUTH_TOKEN"),
  };
}
