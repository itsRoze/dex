import { Api, StackContext, use } from "sst/constructs";
import { Secrets } from "./secrets";

export function API({ stack }: StackContext) {
  const secrets = use(Secrets);

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [...Object.values(secrets.database)],
      },
    },
    routes: {
      "GET /": "packages/go/example/example.go",
      "GET /list": "packages/go/list/list.go",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
  return api;
}
