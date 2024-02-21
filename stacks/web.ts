import { StackContext, StaticSite, use } from "sst/constructs";
import { API } from "./api";

export function Web({ stack }: StackContext) {
  const api = use(API);

  const web = new StaticSite(stack, "web", {
    path: "packages/frontend",
    buildOutput: "dist",
    buildCommand: "pnpm build",
    environment: {
      VITE_API_URL: api.url,
    },
  });

  stack.addOutputs({
    SiteUrl: web.customDomainUrl || "http://localhost:3000",
  });
}
