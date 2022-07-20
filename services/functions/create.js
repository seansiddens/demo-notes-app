import * as uuid from "uuid";
import handler from "../util/handler"; // Import first to init error handling when Lambda is first invoked.
import dynamoDb from "../util/dynamodb";


export const main = handler(async (event) => {
    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);

    const params = {
        // Get table name from environment variables.
        TableName: process.env.TABLE_NAME,
        Item: {
            // The attributes of the item to be created.
            userId: "123", // The ID of the author.
            noteId: uuid.v1(), // A unique UUID.
            content: data.content, // Parsed from request body.
            attachment: data.attachment, // Parsed from request body (filename of file uploaded to S3 bucket).
            createdAt: Date.now(), // Current Unix timestamp.
        },
    };

    await dynamoDb.put(params);

    return params.Item;
});