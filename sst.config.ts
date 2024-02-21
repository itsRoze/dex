import { SSTConfig } from "sst";
import { API } from "./stacks/api";
import { Web } from "./stacks/web";

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

    app.stack(API).stack(Web);
  },
} satisfies SSTConfig;
