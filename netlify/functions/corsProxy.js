export async function handler(event) {
  const url = event.queryStringParameters.url;

  if (!url) {
    return { statusCode: 400, body: "Missing 'url' query parameter" };
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const contentType = response.headers.get("content-type");

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // ✅ Allows frontend access
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": contentType || "application/json",
      },
      body: await response.text(),
    };
  } catch (error) {
    return { statusCode: 500, body: `Fetch error: ${error.message}` };
  }
}
