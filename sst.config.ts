import { SSTConfig } from "sst";
import { API } from "./stacks/api";
import { Web } from "./stacks/web";
import { Secrets } from "./stacks/secrets";

export default {
  config(_input) {
    return {
      name: "dex",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      runtime: "go",
    });

    app.stack(Secrets).stack(API).stack(Web);
  },
} satisfies SSTConfig;
