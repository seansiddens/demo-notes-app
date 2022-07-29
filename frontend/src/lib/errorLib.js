export function onError(error) {
    let message = error.toString();

    // Auth errors (Auth throws errors in a different format)
    if (!(error instanceof Error) && error.message) {
        message = error.message;
    }

    alert(message);
}