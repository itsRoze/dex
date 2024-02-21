import { SSTConfig } from "sst";
import { API } from "./stacks/api";

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

    app.stack(API);
  },
} satisfies SSTConfig;
