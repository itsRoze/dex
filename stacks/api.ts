import { StackContext } from "sst/constructs/FunctionalStack";
import { Api } from "sst/constructs";

export function API({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "packages/go/get.go",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
  return api;
}
