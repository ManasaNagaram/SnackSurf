export async function handler(event) {
    const targetURL = event.queryStringParameters.url;

    if (!targetURL) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing 'url' query parameter" }),
        };
    }

    try {
        const response = await fetch(targetURL, {
            headers: { 'Origin': '*' }, // Modify headers if needed
        });
        const data = await response.text();

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-Type': 'application/json',
            },
            body: data,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch data", details: error.message }),
        };
    }
}
