import { Template } from "aws-cdk-lib/assertions";
import { App, getStack } from "@serverless-stack/resources";
import { StorageStack } from "../StorageStack";
import { test } from "vitest";

// Check that StorageStack creates a DynamoDB table and sets the billing mode 
// to PAY_PER_REQUEST
test("Test StorageStack", () => {
    const app = new App();

    // WHEN
    app.stack(StorageStack);
    // THEN
    const template = Template.fromStack(getStack(StorageStack));
    template.hasResourceProperties("AWS::DynamoDB::Table", {
        BillingMode: "PAY_PER_REQUEST",
    });
});