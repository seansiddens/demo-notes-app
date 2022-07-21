import * as iam from "aws-cdk-lib/aws-iam";
import { Auth, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";
import { ApiStack } from "./ApiStack";

export function AuthStack({ stack, app }) {
    const { bucket } = use(StorageStack);
    const { api } = use(ApiStack);

    // Create a Cognito User Pool and Identity Pool.
    const auth = new Auth(stack, "Auth", {
        // We want users to login with their email.
        login: ["email"],
    });

    // Specify the resources our authenticated users have access to.
    auth.attachPermissionsForAuthUsers(stack, [
        // Allow access to the API
        api,
        // Policy granting access to specific folder in the bucket.
        new iam.PolicyStatement({
            actions: ["s3:*"],
            effect: iam.Effect.ALLOW,
            resources: [
                // 'cognito-identity.amazonaws.com:sub' is the authenticated user’s federated identity id (their user id)
                bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*",
            ],
        }),
    ]);

    // Show the auth resources in the output.
    stack.addOutputs({
        Region: app.region,
        UserPoolId: auth.userPoolId,
        IdentityPoolId: auth.cognitoIdentityPoolId,
        UserPoolClientId: auth.userPoolClientId,
    });

    return {
        auth,
    };
}