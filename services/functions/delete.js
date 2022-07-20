import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

export const main = handler(async (event) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        // Define the partition key and sort key of the item to be removed.
        Key: {
            userId: "123",
            noteId: event.pathParameters.id,
        },
    };

    await dynamoDb.delete(params);

    return { status: true };
});