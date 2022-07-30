import { Storage } from "aws-amplify";

// Uploads a file to the user's private folder in an s3 bucket.
export async function s3Upload(file) {
    // Generate a unique filename.
    const filename = `${Date.now()}-${file.name}`;

    const stored = await Storage.vault.put(filename, file, { contentType: file.type });

    return stored.key;
}