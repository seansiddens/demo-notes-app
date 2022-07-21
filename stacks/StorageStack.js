import { Table, Bucket } from "@serverless-stack/resources";

export function StorageStack({ stack, app }) {
    // Create an S3 bucket.
    const bucket = new Bucket(stack, "Uploads", {
        cors: [
            {
                maxAge: "1 day",
                allowedOrigins: ["*"],
                allowedHeaders: ["*"],
                allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
            },
        ],
    });

    // Create a DynamoDB table
    const table = new Table(stack, "Notes", {
        fields: {
            userId: "string", // Id of the user that the notes belong to.
            noteId: "string", // Id of the note
        },
        primaryIndex: { partitionKey: "userId", sortKey: "noteId" },
    });

    return {
        table,
        bucket,
    };
}