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
      "GET /contacts": "packages/go/list/list.go",
      "GET /contacts/{id}": "packages/go/get/get.go",
      "POST /contacts": "packages/go/create/create.go",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
  return api;
}
