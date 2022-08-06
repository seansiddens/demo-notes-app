import { RemovalPolicy } from "aws-cdk-lib";
import { App } from "@serverless-stack/resources";
import { ApiStack } from "./ApiStack";
import { AuthStack } from "./AuthStack";
import { StorageStack } from "./StorageStack"
import { FrontendStack } from "./FrontendStack";

/**
 * @param {App} app
 */
export default function (app) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });

  app.stack(StorageStack).stack(ApiStack).stack(AuthStack).stack(FrontendStack);

  // Remove all resources when non-prod stages are removed.
  if (app.stage !== "prod") {
    app.setDefaultRemovalPolicy(RemovalPolicy.DESTROY);
  }
}
