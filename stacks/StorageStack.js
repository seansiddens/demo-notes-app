import { Table } from "@serverless-stack/resources";

export function StorageStack({ stack, app }) {
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
    };
}