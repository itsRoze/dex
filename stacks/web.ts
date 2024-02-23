import { StackContext, StaticSite, use } from "sst/constructs";
import { API } from "./api";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";

export function Web({ stack }: StackContext) {
  const api = use(API);

  const web = new StaticSite(stack, "web", {
    path: "packages/frontend",
    buildOutput: "dist",
    buildCommand: "pnpm build",
    environment: {
      VITE_API_URL: api.url,
    },
    customDomain:
      stack.stage === "production"
        ? {
            domainName: "dex.roze.dev",
            isExternalDomain: true,
            cdk: {
              certificate: Certificate.fromCertificateArn(
                stack,
                "DexRozeDev",
                "arn:aws:acm:us-east-1:849356115576:certificate/f683b53d-ccb9-44a4-9b21-c1da66d9a441",
              ),
            },
          }
        : undefined,
  });

  stack.addOutputs({
    SiteUrl: web.customDomainUrl || "http://localhost:3000",
  });
}
