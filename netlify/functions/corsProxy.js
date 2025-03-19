export async function handler(event) {
  const url = event.queryStringParameters.url;

  if (!url) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: "Missing 'url' query parameter",
    };
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const contentType = response.headers.get("content-type");
    const body = await response.text(); // Keep as text to avoid JSON parsing issues

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // ✅ Allows frontend access
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": contentType || "application/json",
      },
      body: body,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: error.toString() }),
    };
  }
}
