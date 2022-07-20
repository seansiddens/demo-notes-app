import { Api, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }) {
    // Get reference to table resource.
    const { table } = use(StorageStack);

    // Create the API
    const api = new Api(stack, "Api", {
        defaults: {
            function: {
                // Give API permissions to access the table.
                permissions: [table],
                environment: {
                    // Pass name of DynamoDB table as an env variable for use
                    // in querying the table.
                    TABLE_NAME: table.tableName,
                }
            },
        },
        routes: {
            // Route used to create a note. 
            // Calls the function 'main' in 'functions/create.js'
            "POST /notes": "functions/create.main",
            // Route used to retrieve a note.
            "GET /notes/{id}": "functions/get.main",
            // List all notes for given user.
            "GET /notes": "functions/list.main",
            // Update a note.
            "PUT /notes/{id}": "functions/update.main",
            "GET /hello": "functions/hello.main",
        },
    });

    // Show the API endpoint in the output.
    stack.addOutputs({
        ApiEndpoint: api.url,
    });

    // Return the API resource.
    return {
        api,
    };
}
